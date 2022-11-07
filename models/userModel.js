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

// INSTANCE METHOD: 
// available on all Documents of a certain Collection.
// checks if password is correct
// userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
//     return  await bcrypt.compare(candidatePassword, userPassword) // this.password is not available in the output due to select: false in the model. bcrypt.compare() returns true if passwords are the same or false if not.
//   }


export default mongoose.model("UserModel", userSchema)