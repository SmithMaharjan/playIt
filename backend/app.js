import express from "express"
import dotenv from "dotenv"
import { router as RoleRouter } from "./src/routes/role.route.js"
import { router as UserRouter } from "./src/routes/user.route.js"
import { router as MusicRouter } from "./src/routes/music.route.js"
import { router as AlbumRouter } from "./src/routes/album.route.js"
const app = express()
dotenv.config()
app.use(express.json())

import cors from "cors"
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use("/api", RoleRouter)
app.use("/api", UserRouter)
app.use("/api", MusicRouter)
app.use("/api", AlbumRouter)

export default app
