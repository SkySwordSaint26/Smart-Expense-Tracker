import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { Users } from "../db/schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
        const {name, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        const existingUser = await db
            .select()
            .from(Users)
            .where(eq(Users.email, email));

        if(existingUser.length > 0){
            return res.status(409).json({
                message: "User already exists",
            })
        }

        const user = await db.insert(Users).values({
            name,
            email,
            password: hashedPassword,
        }).returning({
            userId: Users.userId,
            name: Users.name,
            email: Users.email,
            role: Users.role,
        });

        res.status(201).json({
            message: "User registered"
        })
})

export const loginUser = asyncHandler(async(req, res)=>{
        const {email, password} = req.body;

        const user = await db.select().from(Users).where(eq(Users.email,email));

        if(user.length === 0) {
            return res.status(404).json({
                message: "User not found!",
            });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if(!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                userId: user[0].userId,
                email: user[0].email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.json({
            message: "Login successful",
            token,
        });
})