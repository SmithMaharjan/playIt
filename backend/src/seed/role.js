import mongoose from "mongoose"
import { connectDB } from "../config/database.js"
import { data } from "../data/data.js"
import RoleModel from "../models/role.js"

export const seeding = async () => {
    try {
        await connectDB()
        console.log("connect to db")

        await RoleModel.deleteMany({})
        console.log("Roles cleared")

        const roles = await Promise.all(
            data.map(role => RoleModel.create({ name: role.name }))
        );

        console.log("Roles seeded:", roles)
    } catch (error) {
        console.error("Error seeding roles:", error)
    }
}
