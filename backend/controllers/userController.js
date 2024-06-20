import User from "../models/userModel.js"

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
    const userLogin = await User.login(email, password)
    if (userLogin) res.status(200).json(userLogin)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const registered = await User.register(name, email, password)
        
        if (registered) {
            res.status(200).json(registered)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}
const controllers = { loginUser, registerUser }
export default controllers