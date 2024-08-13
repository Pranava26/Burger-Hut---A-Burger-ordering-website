import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { MenuItem } from "@/models/MenuItem";
import { connect } from "@/libs/mongoConnect";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
    await connect();
    const { cartProducts, address } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail, ...address, cartProducts, paid: false
    });

    const stripeLineItems = [];
    for (const cartProduct of cartProducts) {
        const productInfo = await MenuItem.findById(cartProduct._id)
        const productPrice = productInfo.basePrice;
        const productName = cartProduct.name;

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'INR',
                product_data: {
                    name: productName
                },
                unit_amount: productPrice * 100
            }
        });
    }

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?cancelled=1',
        metadata: { orderId: orderDoc._id.toString() },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: { amount: 3000, currency: 'INR' },
                }
            }
        ]
    });

    return Response.json(stripeSession.url);
}