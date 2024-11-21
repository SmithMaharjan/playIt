import mongoose, { Schema } from "mongoose";
const RoleSchema = new Schema({
    name: { type: String }
})
const RoleModel = mongoose.model("Role", RoleSchema)
export default RoleModel