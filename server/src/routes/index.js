import express from "express";
import authRoutes from "./auth.routes.js";
import transactionRoutes from "./transaction.route.js";
import dashboardRoutes from "./dashboard.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/transactions", transactionRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;