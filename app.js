require("dotenv").config({path: "/home/bestin/Desktop/learn/learned/E-commerce-API/.env"})
require("express-async-errors")
// importing express 
const express = require("express")
const app = express()
const authRouter = require("./routes/auth-route")
const usersRouter = require("./routes/users-route")
const productRouter = require("./routes/product-route")
const reviewRouter = require("./routes/review-route")

const cookieParser = require("cookie-parser")

//other modules
const morgon = require("morgan")


//middleware
// const auth = require()
const errorHandlerMiddleware = require("./middleware/errorHandleMiddleware") // every new throw error is sent to this middleware
const NotFound = require("./middleware/404")

//express modules
app.use(express.json())
app.use(cookieParser())
app.use(morgon("tiny"))

//routes
app.get("/", (req,res) => {
    console.log(req.cookies)
    res.send("homepage")
})

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/users",usersRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/review",reviewRouter)

//using the NotFound page
app.use(NotFound)

//enabling the custom error handle middleware {should do be declared last}
app.use(errorHandlerMiddleware)

//db connection settings
const port = process.env.PORT || 5000
const connect = require("./db/connection-to-db")


//main function
const main = async () => {

    try {
        await connect(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log("Server listening on port 5000...")
        })

    } catch (error) {
        console.log(error)
    }
}

main()

















