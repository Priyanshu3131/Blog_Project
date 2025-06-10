import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //connectionInstance is an object with 53 properties which are 
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`); // right host
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB