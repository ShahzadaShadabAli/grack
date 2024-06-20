import { Router } from "express";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import controllers from "../controllers/userController.js"

const router = Router()

router.post('/login', controllers.loginUser)

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

router.post('/register', controllers.registerUser)

export default router;