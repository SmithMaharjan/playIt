export const authenticatedRole = (roles) => {
    return (req, res, next) => {
        try {
            const { role } = req.user
            if (!roles.includes(role.name)) {
                console.log("permisson denied")
                return res.status(401).json({ message: "permisson denied" })
            }
            next()
        }
        catch (error) {
            console.log(error);

        }
    }
}