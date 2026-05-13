import { relations } from "drizzle-orm";

import {
  Users,
  Categories,
  Transactions,
  Budgets,
  Insights,
} from "./schema.js";

// User Realtions
export const userRelations = relations(Users, ({many})=>({
    transactions: many(Transactions),
    budgets: many(Budgets),
    insights: many(Insights),
}))

export const categoryRelations = relations(
    Categories, ({many}) => ({
        transactions: many(Transactions),
        budgets: many(Budgets),
    })
);


// one-to-one relation
export const transactionRealtions = relations(
    Transactions, 
    ({one}) => ({
        user: one(Users, {
            fields: [Transactions.userId],
            references: [Users.userId],
        }),

        category: one(Categories, {
            fields: [Transactions.categoryId],
            references: [Categories.categoryId],
        }),
    })
);

export const budgetRelations = relations(
    Budgets,
    ({one}) => ({
        user: one(Users,{
            fields: [Budgets.userId],
            references: [Users.userId],
        }),

        category: one(Categories, {
            fields: [Budgets.categoryId],
            references: [Categories.categoryId],
        }),
    })
);

export const insightsRelations = relations(
  Insights,
  ({ one }) => ({
    user: one(Users, {
      fields: [Insights.userId],
      references: [Users.userId],
    }),
  })
);