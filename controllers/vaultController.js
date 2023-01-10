import asyncHandler from 'express-async-handler';
import Vault from '../models/Vault.js';
import { encrypt, decrypt } from '../utilies/encryptionHandler.js';

/**
 * @desc add password
 * @route POST
 * @route /api/v1/vault/add-password
 * @access Private
 */
export const AddPassword = asyncHandler(async (req, res) => {
	const { title, password } = req.body;

	if (!title || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	const encryptedPassword = encrypt(password.toString());
	const newPassword = await Vault.create({
		title,
		password: encryptedPassword.password,
		iv: encryptedPassword.iv,
		user: req.user,
	});

	res.status(201).json({
		message: 'Password added successfully',
		title: newPassword.title,
		password: newPassword.password,
		iv: newPassword.iv,
	});
});

/**
 * @desc get all password
 * @route POST
 * @route /api/v1/vaults
 * @access Private
 */
export const getVaults = asyncHandler(async (req, res) => {
	const vaults = await Vault.find({ user: req.user.id });

	res.status(200).json(vaults);
});

/**
 * @desc Delete a password
 * @route DELETE
 * @route /api/v1/vaults
 * @access Private
 */
export const deleteVault = asyncHandler(async (req, res) => {
	const vault = await Vault.findById(req.params.id);

	if (!vault) {
		res.status(400);
		throw new Error('Vault not found');
	}

	// Check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// Make sure the logged in user matches the goal user
	if (vault.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await vault.remove();

	res.status(200).json({
		message: 'Vault successfully removed',
		id: req.params.id,
	});
});

/**
 * @desc decrypt pasword
 * @route DELETE
 * @route /api/v1/vaults
 * @access Private
 */
export const decryptPassword = asyncHandler(async (req, res) => {
	const plainPassword = decrypt(req.body);

	res.status(200).json(plainPassword);
});
