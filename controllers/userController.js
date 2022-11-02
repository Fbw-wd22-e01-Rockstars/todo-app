import User from "../models/userModel.js"

export const createUser = async (req, res, next) => {
    const newUser = await User.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
    },
    })
};

export const getAllUsers = async (req, res, next) => {
    
    const users = await User.find()

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length, // just do this if you read an array with multiple objects inside.
      data: {
        data: users
      },
    });
}

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({
    status: 'success',
    data: {
      user
    },
  });
};

export const updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: {
        user: user
      },
    });
};

export const deleteUser = async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null,
    });
};