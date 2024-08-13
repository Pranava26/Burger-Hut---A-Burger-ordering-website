import mongoose from "mongoose";

// export async function connect(){
//     try {
//         mongoose.connect(process.env.MONGO_URI);
//         const connection = mongoose.connection;

//         connection.on('connected', () => {
//             console.log("MongoDB connected successfully");
//         })

//         connection.on('error', () => {
//             console.log("MongoDB connection error. Please make sure MongoDB is running." + err);
//             process.exit();
//         })
//     } catch (error) {
//         console.log("Something went wrong!");
//         console.log(error);
//     }
// }

const MONGODB_URI = process.env.MONGODB_URI;

let cached = mongoose || {conn: null, promise: null};

export const connect = async () => {
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error('MongoDb Uri is missing');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        bufferCommands: false
    })

    cached.conn = await cached.promise;

    return cached.conn;
}