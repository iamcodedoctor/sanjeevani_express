import express from 'express'
import { verifyAdmin } from '../middlewares/verification.js';
import AdminController from '../controlllers/adminController.js';
const adminController = new AdminController();

const router = express.Router();

router.get('/users', verifyAdmin, adminController.listUsers);

export default router;