import "dotenv/config"
import { db } from "../src/db/index.js"
import { Users, Categories, Transactions, Budgets, Insights } from "../src/db/schema.js"
import { userRelations, categoryRelations, transactionRealtions, budgetRelations, insightsRelations } from "../src/db/relations.js"
import { error } from "node:console"
import { eq, ne, gt, gte } from "drizzle-orm";


async function main(){
    const transactions = await db.select().from(Transactions).where(gt(Transactions.amount,1000))
    console.log(transactions)
}

main()