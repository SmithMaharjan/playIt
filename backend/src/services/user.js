import { response } from "express"
import RoleModel from "../models/role.js"
import TokenModel from "../models/token.js"
import UserModel, { UserInfoModel } from "../models/user.js"
import jwt from "jsonwebtoken"
import { uploadToCloudinary } from "../utils/cloudinary.js"

export const register = async (email, password, roleName, localFile) => {
    try {
        console.log(roleName, "rolename")
        const registered = await UserModel.findOne({ email: email })
        if (registered) {
            throw new Error("already registered")
        }
        const validateRole = await RoleModel.findOne({ name: roleName })
        if (!validateRole) {
            throw new Error("invalid role")
        }
        const cloudinaryResponse = await uploadToCloudinary(localFile)
        console.log(cloudinaryResponse, "cloudddddddddd aaaaaaaaayoooooooo")
        const secured_url = cloudinaryResponse.secure_url


        const user = new UserModel({
            email: email,
            password: password,
            role: validateRole._id,
            profileImage: secured_url

        })
        await user.save()
        return user

    }
    catch (error) {
        console.log(error)
    }


}
export const createProfile = async (name, userId) => {
    const validateUserId = await UserModel.findOne({ _id: userId })
    if (!validateUserId) {
        throw new Error("cannot find the user")
    }
    const user = new UserInfoModel({
        username: name,
        user: userId
    })
    await user.save()

}

export const getAllUsers = async () => {
    const user = await UserModel.find().populate("role")
    const response = await Promise.all(
        user.map(async (data) => {

            const userInfo = await UserInfoModel.findOne({ user: data._id })


            const newResponse = {
                ...data.toObject(),
                profile: userInfo && userInfo.username
            }
            return newResponse

        })
    )
    if (!response) {
        throw new Error("something went wrong")
    }
    return response

}

export const generateAccessToken = async (id, email, role) => {
    const accessToken = jwt.sign({
        id: id,
        email: email,
        role: role
    }, process.env.SECRET_ACCESS_KEY, {
        expiresIn: process.env.ACCESS_EXPIRY
    })
    return accessToken



}
export const generateRefreshToken = async (id, email, role) => {
    const refreshToken = jwt.sign({
        id: id,
        email: email,
        role: role
    }, process.env.SECRET_REFRESH_KEY, {
        expiresIn: process.env.REFRESH_EXPIRY
    })
    return refreshToken



}

export const login = async (email, password) => {
    const user = await UserModel.findByCredential(email, password)
    if (!user) {
        throw new Error("password isnt matching")
    }
    const token = await TokenModel.findOne({ user: user._id })
    if (token) {
        throw new Error("user already logged in")
    }
    const accessToken = await generateAccessToken(user._id, user.email, user.role)
    const refreshToken = await generateRefreshToken(user._id, user.email, user.role)
    const storeToken = new TokenModel({
        user: user._id,
        token: refreshToken
    })
    await storeToken.save()

    const response = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user
    }
    return response

}

export const logout = async (id) => {
    const token = await TokenModel.findOneAndDelete({ user: id })
    if (!token) {
        throw new Error("token not found")
    }
    else {
        return token

    }

}
