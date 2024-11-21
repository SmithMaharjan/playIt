import * as RoleService from "../services/role.js"
export const getAllRoles = async (req, res) => {

    try {
        const response = await RoleService.getAllRoles()
        return res.status(200).json({ message: "all roles", roles: response })
    } catch (error) {
        console.log(error)
    }
}