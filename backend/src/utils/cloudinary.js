import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
dotenv.config()
import fs from "fs"
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
export const uploadToCloudinary = async (localFile) => {
    try {
        if (!localFile) {
            return null
        }

        const response = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto"
        })
        console.log(response)
        fs.unlinkSync(localFile)

        return response
    }
    catch (error) {
        fs.unlinkSync(localFile)

        console.log(error)
        return null

    }

}