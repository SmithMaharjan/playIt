import RoleModel from "../models/role.js";
export const getAllRoles = async () => {
    const role = await RoleModel.find()
    return role
}