import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


///////signup//////////
export const signupController = async (req, res) => {
  // 1. I will search my DB either user is already registered
  console.log(req.body);
  const { email, password, name } = req.body;

  const foundUser = await User.findOne({ email });

  // 2. if a user is already registered with the same email address we will throw an error

  if (foundUser)
    return res
      .status(401)
      .json({ status: "failed", message: "email already registered" });

  // Hash the password before saving on database

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);

  req.body.password = hashedPassword;
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      status: "success",
      message: "user created successfully",
      token,
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};


//////////signin/////////////

export const signinController = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const currentUser = await User.findOne({ email });
  if (!currentUser)
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid Credentials" });

  const verified = await bcrypt.compare(password, currentUser.password);

  if (!verified)
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid Credentials" })
      else{
        const user = await currentUser;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
      
        res.status(200).json({user, token});
      }
};
