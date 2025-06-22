import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
//app.use(cors)
app.use(cors({ // corsOption-cors settings(optional)
    origin:"http://localhost:5173",
    credentials: true,
}))

app.use(express.json({limit: "16kb"})) // Parse incoming JSON data from HTTP requests & Limit the size of that JSON data to 16 kilobytes

app.use(express.urlencoded({extended: true, limit: "16kb"})) //This middleware parses URL-encoded form data (like from HTML <form> submissions).
app.use(express.static("public")) // This serves static files like: html,css,js,images ...from a folder called public. /If you have a file: public/styles.css, Then visiting http://localhost:3000/styles.css will serve that file directly.
app.use(cookieParser()) //This middleware parses cookies from incoming HTTP requests and makes them available in req.cookies.

//routes import
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter) // activate router through middleware as it's in separate file
// /api/v1 is standard practise 
app.use("/api/v1/posts", postRouter)
export { app }
