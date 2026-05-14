import express from "express"
import cors from "cors"
import { db } from "./config/db.js"
import { Users } from "./db/schema.js"
import routes from "./routes/index.js";
import {protect} from "./middleware/auth.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();

app.use(cors());
app.use(express.json());

// Use routes in routes/index.js
app.use("/api", routes);


// Testing for auth
app.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});

app.get("/health", (req,res)=>{
    res.json({
        message: "Server is running",
    })
});

app.get("/users", async (req,res)=>{
    const users = await db.select().from(Users);
    res.json(users)
});

app.use(errorHandler);



export default app;