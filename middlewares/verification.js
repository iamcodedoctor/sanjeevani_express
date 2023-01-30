import jwt from 'jsonwebtoken'
import baseConfig from '../configs/baseConfig.js'
import User from '../models/User.js'
import { errorCreator } from '../utils/middlewares/error/errorCreator.js'

const verifyToken = (req) => {
    const token = req.headers['authorization'].split(' ')[1]
    if (!token) {
        return errorCreator(401, 'You are not authenticated')
    }

    const user = jwt.verify(token, baseConfig.jwtSecret)

    if (!user) {
        return errorCreator(403, 'Invalid Token')
    }
    req.user = user
    return req
}

const verifyLogin = (req, res, next) => {
    verifyToken(req)
    if (req.user) {
        next()
    } else {
        return next(errorCreator(403, 'Unauthorised..!!'))
    }
}

const verifyUser = (req, res, next) => {
    verifyToken(req)
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next()
    } else {
        return next(errorCreator(403, 'Unauthorised..!!'))
    }
}

const verifyAdmin = async (req, res, next) => {
    verifyToken(req)
    const user = await User.findOne({ _id: req.user.id })
    if (user.role === 'admin') {
        next()
    } else {
        return next(errorCreator(403, 'Unauthorised..!!'))
    }
}

const verifyDoctor = async (req, res, next) => {
    verifyToken(req)
    const user = await User.findOne({ _id: req.user.id })
    if (user.role === 'doctor') {
        next()
    } else {
        return next(errorCreator(403, 'Unauthorised..!!'))
    }
}

export { verifyUser, verifyLogin, verifyAdmin, verifyDoctor }
