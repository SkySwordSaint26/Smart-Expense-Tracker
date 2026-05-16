import { db } from "../config/db.js";
import { and, eq } from "drizzle-orm";
import { Users, Categories, Transactions } from "../db/schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add a transaction
export const addTransaction = asyncHandler(async (req, res)=>{
    const {categoryId, amount, description, type, note} = req.body;

    const userId = req.user.userId;

    const transaction = await db.insert(Transactions).values({
        userId,
        categoryId,
        amount,
        description,
        type,
        note,
    }).returning({
        transactionId: Transactions.transactionId
    });

    res.status(201).json({
            message: "Transaction added",
    });
});

// Get all transactions
export const getTransaction = asyncHandler(async (req, res)=>{

    const userId = req.user.userId;

    const allTransactions = await db.select().from(Transactions)
        .where(
            and(
                
                eq(Transactions.userId, userId),
                eq(Transactions.isDeleted, false)
            )
        )

    return res.json({allTransactions});
});

// Get transaction by id
export const getTransactionById = asyncHandler(async (req, res)=>{
    const userId = req.user.userId;
    const {transactionId} = req.params;

    const transaction = await db.select().from(Transactions)
        .where(
            and(
                eq(Transactions.transactionId, transactionId),
                eq(Transactions.userId, userId),
                eq(Transactions.isDeleted, false)
            ),
    );

    return res.json({transaction});
});

export const updateTransaction = asyncHandler(async (req, res)=>{
    const userId = req.user.userId;
    const {transactionId} = req.params;

    const { categoryId, amount, description, type, note } = req.body;

    const updateData = {};

    // Handling partial updates
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (amount !== undefined) updateData.amount = amount;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (note !== undefined) updateData.note = note;

    if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No fields provided for update"
            });
        }


    const updatedTransaction = await db.update(Transactions)
        .set(updateData)
        .where(
            and(
                eq(Transactions.transactionId,transactionId),
                eq(Transactions.userId, userId)
            )
        ).returning()

    return res.json({
        message: "Transaction updated",
        updatedTransaction
    });
});

export const deleteTransaction = asyncHandler(async (req, res)=>{
    const userId = req.user.userId;
    const {transactionId} = req.params;

    const deletedTransaction = await db.update(Transactions)
        .set({isDeleted: true})
        .where(
            and(
                eq(Transactions.transactionId,transactionId),
                eq(Transactions.userId, userId)
            )
        ).returning()
    
    return res.json({
        message: "Transaction deleted",
        deletedTransaction
    });
});