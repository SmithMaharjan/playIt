import app from "./app.js"
import dotenv from "dotenv"
import { PORT } from "./src/config/config.js"
import { connectDB } from "./src/config/database.js"
import { seeding } from "./src/seed/role.js"
dotenv.config()

const startServer = async () => {
    try {
        await seeding()
        app.listen(PORT, () => {
            console.log(`the server is running at port ${PORT}`)
        })
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}
startServer()
