import * as UserController from "../controllers/user.js"
import express from "express"
import { authenticationJWT } from "../middleware/auth.js"
import { upload } from "../multer/multer.js"
export const router = express.Router()
router.post("/register", upload.single("profile"), UserController.register)
router.post("/login", UserController.login)
router.get("/users", UserController.getAllUsers)
router.delete("/logout", UserController.logout)
router.post("/createProfile", UserController.createProfile)
