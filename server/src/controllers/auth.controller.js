import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { Users } from "../db/schema.js";

export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await db.insert(Users).values({
            name,
            email,
            password: hashedPassword,
        }).returning();

        res.status(201).json({
            message: "User registered"
        })
    } catch(error){
        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })
    }
}