import express from "express"
import { createTodo } from "../controllers/todoController.js"



const router = express.Router()

router.post("/dashboard/create-todo", createTodo)


export default router