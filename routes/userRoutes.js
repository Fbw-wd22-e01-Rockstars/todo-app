import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js"


const router = express.Router()

router.get("/", getAllUsers)
router.post("/", createUser)

router
.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser)


export default router