import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const signupController = async (req, res, next) => {
  try {
    let { email, password, passwordConfirm, name } = req.body;

    const foundUser = await User.findOne({ email });
    // 2. if a user is already registered with the same email address we will throw an error
    if (foundUser) {
      const error = new Error("The user does already exist");
      error.status = "failed";
      error.statusCode = 409;
      throw error;
    }
    // For security: Only allow fields we need
    const savedUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    const token = signToken(savedUser._id);
    res.status(200).json({
      status: "success",
      token,
      message: "user registered",
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const currentUser = await User.findOne({ email });
    if (
      !currentUser ||
      !(await bcrypt.compare(password, currentUser.password))
    ) {
      const error = new Error("Invalid credentials!");
      error.status = "failed";
      error.statusCode = 409;
      throw error;
    }
    const token = signToken(currentUser._id);

    res.status(200).json({
      status: "success",
      data: { token, email: currentUser.email, name: currentUser.name },
    });
  } catch (error) {
    next(error);
  }
};
