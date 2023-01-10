import express from 'express';
import { protect } from '../middleware/auth.js';
import {
	AddPassword,
	deleteVault,
	getVaults,
	decryptPassword,
} from '../controllers/vaultController.js';

const router = express.Router();

router.post('/add-password', protect, AddPassword);
router.get('/', protect, getVaults);
router.delete('/:id', protect, deleteVault);
router.post('/decrypt-password', protect, decryptPassword);

export default router;
