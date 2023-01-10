import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { genToken } from '../utilies/genJwt.js';
/**
 * @desc Register  a user
 * @route POST
 * @route /api/v1/users
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	// Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Create user
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			message: 'User registered successfully',
			name: user.name,
			email: user.email,
			token: genToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});
/**
 * @desc login  a user
 * @route POST
 * @route /api/v1/users/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	// check if user exists
	if (!user) {
		res.status(400);
		throw new Error(`User not found`);
	}

	// match passwords
	const isMatched = await user.matchPassword(password);

	if (isMatched) {
		res.status(200).json({
			message: 'User logged in successfully',
			name: user.name,
			email: user.email,
			token: genToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error(`Invalid Credentials`);
	}
});

/**
 * @desc login  a user
 * @route POST
 * @route /api/v1/users/login
 * @access Public
 */
export const getMe = asyncHandler(async (req, res) => {
	return res.status(200).json(req.user);
});
