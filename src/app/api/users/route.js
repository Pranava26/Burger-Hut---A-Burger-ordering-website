import { User } from "@/models/User";
import { isAdmin } from "../auth/[...nextauth]/route";
import { connect } from "@/libs/mongoConnect";

export async function GET() {
    await connect();
    if(await isAdmin()){
        const users = await User.find();
    return Response.json(users);
    } else {
        return Response.json([]);
    }
}