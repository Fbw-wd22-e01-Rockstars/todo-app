import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRouter from "./routes/authRouter.js"
import mongoose from "mongoose"
import userRouter from "./routes/userRoutes.js"

dotenv.config()
const app = express();
app.use(cors())
app.use(express.json())

const PORT= process.env.PORT || 4000

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

app.use("/auth", authRouter)
app.use("/user", userRouter)

app.post("*", (req,res)=>{
    res.status(200).json({message: "Reached"})
})
mongoose.connect(DB)
    .then(()=>app.listen(PORT,()=>{
        console.log("Backend running at port :", PORT)
    }))
    .catch(err => console.log(err))
