//7. Add JWTs to the backend and respond with them every time a user registers or logs in.

import jwt  from "jsonwebtoken";

export default (req, res, next)=>{
    const token = req.header("auth-token")
    if(!token) return res.status(401).json({message: "Access Denied"})
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(err){
        res.status(400).json({message: "Invalid Token"})
    }
}








