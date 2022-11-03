import mongoose from "mongoose";
import validator from "validator"

const userSchema = mongoose.Schema({
    name:{type: String, required : true},
    email: {
        type: String,
        required: [true, "A user must have an email"],
        validate: [validator.isEmail, "Email is not valid"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password : {type: String, required : true}
})

export default mongoose.model("UserModel", userSchema)