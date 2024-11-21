import jwt from "jsonwebtoken"
export const authenticationJWT = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]
        if (!token) {
            console.log("token required")
        }
        const decode = jwt.verify(token, process.env.SECRET_ACCESS_KEY)
        console.log(decode, "decodeddddddd")
        req.user = decode
        next()
    }
    catch (error) {
        console.log(error);
    }
}