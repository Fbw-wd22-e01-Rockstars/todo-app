import todoModel from "../models/todoModel.js";


export const createTodo = async (req, res, next) => {
    // const {title, description, image} = req.body


    const newTodo = await todoModel.create(req.body)

//    const token = createSendToken(newUser, res)
//    console.log(token);
   
   res.status(200).json({
    status: "success",
    // token,
    data: {
        newTodo
    }
})
}