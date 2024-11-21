import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
const UserSchema = new Schema({
    profileImage: { type: String, default: "" },
    email: { type: String },
    password: { type: String },
    role: { type: Schema.Types.ObjectId, ref: "Role" }
})
const UserInfoSchema = new Schema({
    username: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

UserSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret, next) => {
        const { password, _id, __v, ...rest } = ret
        return rest

    }
})

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

UserSchema.statics.findByCredential = async function (email, password) {
    const user = await UserModel.findOne({ email: email }).populate("role")
    if (!user) {
        throw new Error("cannot find the user")
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return;
    }
    console.log(user.role.name, "userrrrrrrrrrrr")
    return user



}
export const UserInfoModel = mongoose.model("UserInfo", UserInfoSchema)
const UserModel = mongoose.model("User", UserSchema)
export default UserModel