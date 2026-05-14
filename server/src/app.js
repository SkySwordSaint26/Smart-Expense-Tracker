import express from "express"
import cors from "cors"
import { db } from "../src/db/index.js"
import { Users } from "./db/schema.js"
import authRoutes from "./routes/auth.routes.js";
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/health", (req,res)=>{
    res.json({
        message: "Server is running",
    })
})

app.get("/users", async (req,res)=>{
    const users = await db.select().from(Users);
    res.json(users)
})



export default app