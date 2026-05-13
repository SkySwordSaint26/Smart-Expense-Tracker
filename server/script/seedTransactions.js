import "dotenv/config"
import { db } from "../src/db/index.js"
import { Transactions } from "../src/db/schema.js"

const transactions = [
  {
    "userId": 1,
    "categoryId": 1,
    "amount": "50000.00",
    "description": "Monthly salary credited",
    "type": "income",
    "transactionDate": "2025-08-01",
    "note": "August salary"
  },
  {
    "userId": 1,
    "categoryId": 5,
    "amount": "450.00",
    "description": "Dinner at restaurant",
    "type": "expense",
    "transactionDate": "2025-08-02",
    "note": "Weekend outing"
  },
  {
    "userId": 1,
    "categoryId": 6,
    "amount": "1200.00",
    "description": "Fuel refill",
    "type": "expense",
    "transactionDate": "2025-08-03",
    "note": "Petrol"
  },
  {
    "userId": 1,
    "categoryId": 7,
    "amount": "15000.00",
    "description": "Monthly house rent",
    "type": "expense",
    "transactionDate": "2025-08-04",
    "note": "Paid via bank transfer"
  },
  {
    "userId": 1,
    "categoryId": 8,
    "amount": "2500.00",
    "description": "Electricity and internet bill",
    "type": "expense",
    "transactionDate": "2025-08-05",
    "note": "Utility payment"
  },
  {
    "userId": 1,
    "categoryId": 9,
    "amount": "799.00",
    "description": "Netflix yearly subscription",
    "type": "expense",
    "transactionDate": "2025-08-06",
    "note": "Entertainment subscription"
  },
  {
    "userId": 1,
    "categoryId": 10,
    "amount": "3200.00",
    "description": "Bought new headphones",
    "type": "expense",
    "transactionDate": "2025-08-07",
    "note": "Electronics shopping"
  },
  {
    "userId": 1,
    "categoryId": 11,
    "amount": "950.00",
    "description": "Doctor consultation",
    "type": "expense",
    "transactionDate": "2025-08-08",
    "note": "Health checkup"
  },
  {
    "userId": 1,
    "categoryId": 12,
    "amount": "4999.00",
    "description": "Purchased online course",
    "type": "expense",
    "transactionDate": "2025-08-09",
    "note": "Backend development course"
  },
  {
    "userId": 1,
    "categoryId": 13,
    "amount": "600.00",
    "description": "Miscellaneous expenses",
    "type": "expense",
    "transactionDate": "2025-08-10",
    "note": "Unexpected expense"
  },
  {
    "userId": 1,
    "categoryId": 2,
    "amount": "12000.00",
    "description": "Freelance project payment",
    "type": "income",
    "transactionDate": "2025-08-11",
    "note": "Client payment"
  },
  {
    "userId": 1,
    "categoryId": 3,
    "amount": "18000.00",
    "description": "Business revenue",
    "type": "income",
    "transactionDate": "2025-08-12",
    "note": "Monthly sales"
  },
  {
    "userId": 1,
    "categoryId": 4,
    "amount": "3500.00",
    "description": "Stock market profit",
    "type": "income",
    "transactionDate": "2025-08-13",
    "note": "Investment return"
  },
  {
    "userId": 1,
    "categoryId": 5,
    "amount": "850.00",
    "description": "Groceries shopping",
    "type": "expense",
    "transactionDate": "2025-08-14",
    "note": "Weekly groceries"
  },
  {
    "userId": 1,
    "categoryId": 6,
    "amount": "300.00",
    "description": "Metro card recharge",
    "type": "expense",
    "transactionDate": "2025-08-15",
    "note": "Public transport"
  },
  {
    "userId": 1,
    "categoryId": 9,
    "amount": "1500.00",
    "description": "Movie and dinner",
    "type": "expense",
    "transactionDate": "2025-08-16",
    "note": "Friends meetup"
  },
  {
    "userId": 1,
    "categoryId": 10,
    "amount": "2200.00",
    "description": "Purchased clothes",
    "type": "expense",
    "transactionDate": "2025-08-17",
    "note": "Festival shopping"
  },
  {
    "userId": 1,
    "categoryId": 8,
    "amount": "1800.00",
    "description": "Water and gas bill",
    "type": "expense",
    "transactionDate": "2025-08-18",
    "note": "Monthly utilities"
  },
  {
    "userId": 1,
    "categoryId": 11,
    "amount": "700.00",
    "description": "Medicine purchase",
    "type": "expense",
    "transactionDate": "2025-08-19",
    "note": "Pharmacy"
  },
  {
    "userId": 1,
    "categoryId": 13,
    "amount": "400.00",
    "description": "Stationery purchase",
    "type": "expense",
    "transactionDate": "2025-08-20",
    "note": "Office supplies"
  }
]

await db.insert(Transactions).values(transactions)