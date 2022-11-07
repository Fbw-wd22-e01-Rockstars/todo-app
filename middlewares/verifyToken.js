import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(401).json({message: "Not Authorized"})
        }

        const authorized = jwt.verify(token, process.env.JWT_SECRET)

         // we will call next only if its a valid token
        if (authorized) {
            next()
        } else {
            res.status(401).json({message: "Not Authorized"})
        }

    } catch(err) {
        res.status(401).json({
            message: err.message
        })
    }

    // if token is not valid, we will simply send a bad request response back to the client
}