import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import validator from "validator";
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    const token = jwt.sign({id}, process.env.SECRET, { expiresIn: '10s' })
    return token
}



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.statics.register = async function (username, email, password) {
    try {

        if (!username || !email || !password) {
            throw Error("Kindly fill all the credentials")
        }
        if (!validator.isEmail(email)) {
            throw Error("Email is not valid")
        }



        const exists = await this.findOne({email})
        
    if (exists) {
        throw Error('Email Already In Use')
    } else {
        const createUser = await this.create({
            name: username,
            email: email,
            password: bcrypt.hashSync(password, 10)
        })
        if (createUser) {
            const token = generateToken(createUser._id)
             const user = {
                name: createUser.name,
                id: createUser._id,
                token
            }
            return user
        }
    }
    } catch (error) {
        throw Error(error.message)
    }
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("Kindly fill all the credentials")
    }
    const exists = await this.findOne({email})
    if (exists) {
        if (bcrypt.compareSync(password, exists.password)) {
            const token = generateToken(exists._id)
            const user = {
                name: exists.name,
                id: exists._id,
                token
            }
            return user
        } else {
            throw Error("Credentials not matched")
            return false
        }
    } else {
        throw Error("Credentials not matched")
        return false
    }
}

const User = mongoose.model('User', userSchema)
export default User;