import User from "../models/userModel.js"
import bcrypt from "bcrypt"

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