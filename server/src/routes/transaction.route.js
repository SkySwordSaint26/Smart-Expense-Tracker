import express from "express";
import { addTransaction, getTransaction, getTransactionById, updateTransaction, deleteTransaction } from "../controllers/transactions.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, addTransaction);
router.get("/", protect, getTransaction);
router.get("/:transactionId", protect, getTransactionById);
router.patch("/:transactionId", protect, updateTransaction);
router.delete("/:transactionId", protect, deleteTransaction);

export default router;