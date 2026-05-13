import { sql } from "drizzle-orm"
import { decimal } from "drizzle-orm/pg-core"
import { text } from "drizzle-orm/pg-core"
import { integer } from "drizzle-orm/pg-core"
import { pgTable,pgEnum, serial, varchar, timestamp , check, date, boolean} from "drizzle-orm/pg-core"

export const Role = pgEnum("roles", ["user", "admin"])

export const Users = pgTable('Users', {
    userId: serial("user_id").primaryKey(),
    name: varchar("name", {length: 100}).notNull(),
    password: varchar("password", {length:255}).notNull(),
    email: varchar("email", {length: 150}).unique().notNull(),
    role: Role("roles").default("user"),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow(),
})

export const Categories = pgTable("Categories", {
    categoryId: serial("category_id").primaryKey(),
    name: varchar("name", {length: 100}).unique().notNull(),
    type: varchar("type", {length: 50}),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow(),
})

export const Transactions = pgTable("Transactions", {
    transactionId: serial("transaction_id").primaryKey(),

    userId: integer("user_id").references(()=>Users.userId, {onDelete: 'cascade'}).notNull(),
    categoryId: integer("category_id").references(()=>Categories.categoryId, {onDelete:'set null'}),

    amount: decimal("amount", {precision: 10, scale: 2}).notNull(),
    description: text("description").notNull(),
    type: varchar("type").notNull(),
    transactionDate: date("transaction_date").defaultNow(),
    isAutoCategorized: boolean("is_auto_categorized").default(false),    
    note: text("note"),

    isDeleted: boolean("is_deleted").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),

}, (table)=>({
    typeCheck: check("type_check", sql`${table.type} IN ('income', 'expense')`)
}))

export const Budgets = pgTable("Budgets",{
    budgetId: serial("budget_id").primaryKey(),

    userId: integer("user_id").references(()=>Users.userId, {onDelete: 'cascade'}).notNull(),
    categoryId: integer("category_id").references(()=>Categories.categoryId, {onDelete:'set null'}),
    amountLimit: decimal("amount", {precision: 10, scale: 2}).notNull(),
    month: date("month").notNull(),

    createdAt: timestamp("created_at").defaultNow(),
})

export const Insights = pgTable("Insights",{
    insightId: serial("insight_id").primaryKey(),
    userId: integer("user_id").references(()=>Users.userId, {onDelete: 'cascade'}).notNull(),

    month: date("month"),
    totalSpend: decimal("total_spend", {precision: 10, scale: 2}).default(0),
    topCategory: varchar("top_category", {length: 100,}),
    savingSuggestion: text("saving_suggestion"),
})