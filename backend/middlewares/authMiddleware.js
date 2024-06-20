import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const authMiddleware = async (req, res, next) => {
    const {authorization} = req.headers  
    if (!authorization) {
        return req.status(401).json({message: "Authorization Token required"})
    }   

    const token = authorization.split(' ')[1]
    try {
        const user = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id: user.id}).select('_id')
       next()
    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message})     
    }
}

export default authMiddleware;