import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { connect } from "@/libs/mongoConnect";

export async function GET(req) {
    await connect();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    let admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id')
    if(_id){
        return Response.json(await Order.findById(_id));
    }

    if(admin){
        return Response.json(await Order.find());
    }

    if(userEmail){
        return Response.json(await Order.find({userEmail}))
    }
}