import { db } from "../src/db/index.js"
import { Users, Categories} from "../src/db/schema.js"

const users = [
    {
        name: "User1",
        password: "1234",
        email: "test@test.com",
    },
    {
        name: "Admin",
        password: "Admin1234",
        email: "test1@test.com",
        role: "admin"
    },
]

await db.insert(Users).values(users)