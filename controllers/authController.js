import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const signToken = id => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN // we add an object as the option, that the JWT expires after 90 days
    })
}

const createSendToken = (user, res) => {
    const token = signToken(user._id) 

    // CREATING COOKIE --> res.cookie("cookieName", cookieValue, {options})
    // is a small piece of text which a server sends to clients. When client receives the cookie it will automatically be stored and send back along with all future requests to the same server.
    // const cookieOptions = {
    //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), // converting to milliseconds
    //     // secure: true, // cookie will only send on encrypted connection (https)
    //     httpOnly: true // cookie can not be accessed or modified in any way by the browser (Cross-Site scripting attacks)
    // }

    // // if (process.env.NODE_ENV === "production") cookieOptions.secure = true // we just want to set this option in production mode to be able to send the cookie in dev mode.

    // res.cookie("jwt", token, cookieOptions) // this sends the cookie as respond to client
    // // console.log(cookieOptions);
    // console.log(res.cookie);
    
    user.password = undefined // we dont want to see the password on the client site
    user.__v = undefined

    return token
}

export const signupController = async (req, res) =>{
    
    // 1. I will search my DB either user is already registered
console.log(req.body)
   const {email, password, name} = req.body

   const foundUser = await User.findOne({email})
   
   // 2. if a user is already registered with the same email address we will throw an error

   if(foundUser) return res.status(401).json({
    status:"failed", 
    message:"email already registered"
    })
   
   // Hash the password before saving on database

   const saltRound = 10
   const salt = await bcrypt.genSalt(saltRound)
   const hashedPassword = await bcrypt.hash(password, salt)

   req.body.password = hashedPassword
   const newUser = await User.create(req.body)

   const token = createSendToken(newUser, res)
   console.log(token);
   
   res.status(200).json({
    status: "success",
    token,
    data: {
        newUser
    }
})
}

export const signinController = async (req, res) =>{

    console.log(req.body)
    const  {email, password} = req.body
    
    const currentUser = await User.findOne({email})
    if(!currentUser) return res.status(400).json({status: "failed", message: "Invalid Credentials"})

    const verified = await bcrypt.compare(password, currentUser.password)

    if(!verified) return res.status(400).json({status: "failed", message: "Invalid Credentials"})
    res.status(200).json({status: "success", data: {email : currentUser.email, name: currentUser.name}})
}