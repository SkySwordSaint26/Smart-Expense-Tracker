import { db } from "../src/db/index.js"
import { Users, Categories} from "../src/db/schema.js"

const categories = [
  { "name": "Salary", "type": "income" },
  { "name": "Freelance", "type": "income" },
  { "name": "Business", "type": "income" },
  { "name": "Investments", "type": "income" },

  { "name": "Food", "type": "expense" },
  { "name": "Transport", "type": "expense" },
  { "name": "Rent", "type": "expense" },
  { "name": "Utilities", "type": "expense" },
  { "name": "Entertainment", "type": "expense" },
  { "name": "Shopping", "type": "expense" },
  { "name": "Health", "type": "expense" },
  { "name": "Education", "type": "expense" },
  { "name": "Miscellaneous", "type": "expense" }
]

await db.insert(Categories).values(categories)