import { db } from "../config/db.js";
import { and, desc, eq, sum } from "drizzle-orm";
import { Users, Transactions, Categories, Insights, Budgets } from "../db/schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const summary = asyncHandler(async (req, res)=>{
    const userId = req.user.userId;

    const incomeResult = await db.select({
        totalIncome: sum(Transactions.amount)
    })
    .from(Transactions)
    .where(
        and(
            eq(Transactions.type,"income"),
            eq(Transactions.userId, userId),
            eq(Transactions.isDeleted, false)
        )
    );

    const expenseResult = await db.select({
        totalExpense: sum(Transactions.amount)
    })
    .from(Transactions)
    .where(
        and(
            eq(Transactions.type,"expense"),
            eq(Transactions.userId, userId),
            eq(Transactions.isDeleted, false)
        )
    );

    // Extract from json and convert into number as json returns in string
    const totalIncome = Number(incomeResult[0].totalIncome || 0);
    const totalExpense = Number(expenseResult[0].totalExpense || 0);

    return res.json({
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
    });
});

export const recent = asyncHandler(async (req,res)=>{
    const userId = req.user.userId;

    const transactions = await db.select()
        .from(Transactions)
        .where(
            and(
                eq(Transactions.userId, userId),
                eq(Transactions.isDeleted, false),
            )
        )
        .orderBy(desc(Transactions.createdAt))
        .limit(5)

    res.json({transactions});
});

export const categories = asyncHandler(async (req,res)=>{
    const userId = req.user.userId;

    const result = await db.select({
        category: Categories.name,
        total: sum(Transactions.amount)
    })
    .from(Transactions)
    .innerJoin(
        Categories,
        eq(Transactions.categoryId, Categories.categoryId)
    )
    .where(
        and(
                eq(Transactions.userId, userId),
                eq(Transactions.type, "expense"),
                eq(Transactions.isDeleted, false)
            )
    )
    .groupBy(Categories.name);

    return res.json({result});
});