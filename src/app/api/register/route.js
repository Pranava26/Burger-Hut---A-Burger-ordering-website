import { connect } from "@/libs/mongoConnect";
import { User } from "../../../models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    await connect();
    const pass = body.password;
    if(!pass?.length || pass.length < 5){
        new Error('Password must be atleast 5 characters.');
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    const createdUser = await User.create(body);
    return Response.json(createdUser);
}