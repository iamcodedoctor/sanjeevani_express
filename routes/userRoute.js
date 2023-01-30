import express from 'express'
import UserController from '../controlllers/userController.js'
import { verifyLogin } from '../middlewares/verification.js'
import { createNotifications } from '../services/tempService.js'
const userCotroller = new UserController()

const router = express.Router()

router.get('/me', verifyLogin, userCotroller.me)

router.post('/applyForDoctor', verifyLogin, userCotroller.applyForDoctor)

router.get(
    '/unseenNotifications',
    verifyLogin,
    userCotroller.getUnseenNotifications
)

router.get(
    '/seenNotifications',
    verifyLogin,
    userCotroller.getSeenNotifications
)

// temp routes
router.post('/createNotifications', createNotifications)

export default router
