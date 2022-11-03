import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const signupController = async (req, res) => {
    
    // 1. I will search my DB either user is already registered

   const {email, password, name} = req.body

   const foundUser = await User.findOne({email})
   
   // 2. if a user is already registered with the same email address we will throw an error

    if (foundUser)
        return res
            .status(401)
            .json({ status: "failed", message: "email already registered" })
   
    
    // 3. if user is not registered we will hash the password and save the user in DB

   const saltRound = 10
   const salt = await bcrypt.genSalt(saltRound)
   const hashedPassword = await bcrypt.hash(password, salt)

   req.body.password = hashedPassword
   const user = new User(req.body)
   const savedUser = await user.save()
   res.status(200).json({status: "success", message :"user registered"})

}

//4. I will create a web token and send it to the client

export const signinController = async (req, res) => {
    const { email, password } = req.body
    const foundUser = await User.findOne({ email })
    if (!foundUser)
        return res
            .status(401)
            .json({ status: "failed", message: "email not registered" })
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (!isPasswordCorrect)
        return res
            .status(401)
            .json({ status: "failed", message: "password is incorrect" })
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
    res.status(200).json({ status: "success", token })
}

//5. I will create a middleware to protect my routes

export const protectRoute = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const foundUser = await User.findById(decodedToken.id)
    if (!foundUser)
        return res
            .status(401)
            .json({ status: "failed", message: "user not found" })
    req.user = foundUser
    next()
}

