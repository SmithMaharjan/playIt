import RoleModel from "../models/role.js"
import * as UserService from "../services/user.js"
export const register = async (req, res) => {
    const { email, password, role } = req.body
    const localFile = req.file.path
    console.log(req.file, "theeeee fileeeeeee")
    try {

        const response = await UserService.register(email, password, role, localFile)

        return res.status(200).json({ message: "new user created", user: response })
    }
    catch (error) {
        console.log(error.message)
        return res.status(400).json({ message: error.message })
    }


}

export const getAllUsers = async (req, res) => {
    try {
        const response = await UserService.getAllUsers()
        return res.status(200).json({ message: "all users", users: response })

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const response = await UserService.login(email, password)



        return res.status(200).json({ sucess: true, message: 'logged in', refrshToken: response["refreshToken"], accessToken: response["accessToken"], user: response["user"] })


    }
    catch (error) {

        return res.status(400).json({ sucess: false, message: error.message })

    }
}
export const logout = async (req, res) => {
    const { id } = req.body
    try {
        const response = await UserService.logout(id)
        return res.status(200).json({ message: "logged out" })

    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

export const createProfile = async (req, res) => {
    const { name, userId } = req.body
    try {
        const response = await UserService.createProfile(name, userId)
        return res.status(200).json({ message: "profile created" })
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}