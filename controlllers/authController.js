import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { errorCreator } from '../utils/middlewares/error/errorCreator.js'
import jwt from 'jsonwebtoken'
import baseConfig from '../configs/baseConfig.js'

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        const user = await User.findOne({ email })
        if (user) {
            return next(
                errorCreator(400, 'User With this email already exist.!')
            )
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({ username, password: hash, email })
        const { password: pass, ...other } = newUser._doc
        return res.status(200).json({ success: true, message: "User Created Successfully :)" })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return next(errorCreator(404, 'Invalid Credentials'))
        }

        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
            return next(errorCreator(401, 'Invalid Credentials'))
        }

        const token = jwt.sign({id: user._id}, baseConfig.jwtSecret)

        const { password: pass, isAdmin, ...other } = user._doc

        return res
            .status(200)
            .json({ success: true, data: { ...other }, token })
    } catch (error) {
        next(error)
    }
}

export { registerUser, loginUser }
