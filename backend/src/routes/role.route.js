import * as RoleController from "../controllers/role.js"
import express from "express"
export const router = express.Router()
router.get("/getAllRoles", RoleController.getAllRoles)