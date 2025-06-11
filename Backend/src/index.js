// require('dotenv').config({path: './env'}) //using the dotenv library to load environment variables from a file named env 
import connectDB from "./db/index.js";

import {app} from './app.js'
import dotenv from "dotenv"
dotenv.config({
    path: '../.env'
})

connectDB() // async method returns promises
.then(() => {
    app.on("errror", (error) => {  //app object (an instance of an Express.js server) is listening for "error" events.
        console.log("ERRR: ", error);
        throw error
    })
    app.listen(process.env.PORT || 7000, () => { // listen to start server
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})