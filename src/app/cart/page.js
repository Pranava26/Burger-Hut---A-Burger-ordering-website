"use client";
import { CartContext } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import CartProduct from "@/components/menu/CartProduct";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter();
    const { status } = useSession();
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (profileData?.city) {
            const { phone, address, city, postalCode, state, country } = profileData;
            const addressFromProfile = { phone, address, city, postalCode, state, country };
            setAddress(addressFromProfile);
        }
    }, [profileData])

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += p.basePrice;
    }

    function handleAddressChange(propName, val) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: val }))
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();
        if (status === 'authenticated') {
            const promise = new Promise((resolve, reject) => {
                fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        address, cartProducts
                    })
                }).then(async (response) => {
                    if (response.ok) {
                        resolve();
                        router.push('/orders')
                        // window.location = await response.json();
                    } else {
                        reject();
                    }
                });
            });
            await toast.promise(promise, {
                loading: 'Preparing your order...',
                success: 'Order placed',
                error: 'Something went wrong, please try again later'
            })
        }
        else if(status === 'unauthenticated'){
            toast.error("Please login to continue.");
        }
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart" />
                <p className="mt-4">Your cart is empty!</p>
                <p className="mt-4">Add items to your cart.</p>
            </section>
        )
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader='Cart' />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your cart.</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct key={index} product={product} index={index} onRemove={removeCartProduct} />
                    ))}
                    <div className="py-2 pr-16 flex justify-end items-center">
                        <div className="text-gray-500">Subtotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="font-semibold pl-2 text-right">₹{subtotal}<br />
                            ₹30<br />
                            ₹{subtotal + 30}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs addressProps={address} setAddressProp={handleAddressChange} />
                        <button type="submit">Pay ₹{subtotal + 30}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}