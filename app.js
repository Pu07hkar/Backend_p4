import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./routes/user.route.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
app.use(cookieParser())

app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.use("/api/users",router)

export {app}