import express from 'express'
import UserController from '../controlllers/userController.js';
import { verifyLogin } from '../middlewares/verification.js';
const userCotroller = new UserController();

const router = express.Router();

router.get('/me', verifyLogin, userCotroller.me);



export default router;