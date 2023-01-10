import express from 'express';
import {
	getMe,
	loginUser,
	registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
export default router;
