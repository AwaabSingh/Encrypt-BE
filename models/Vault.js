import mongoose from 'mongoose';

const VaultModel = new mongoose.Schema({
	password: {
		type: String,
		required: true,
		trim: true,
	},
	iv: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Vault = mongoose.model('Vault', VaultModel);

export default Vault;
