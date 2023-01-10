import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
	name:{
		type:String,
        required:true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
});

// Hash users password
UserSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) return next();
		this.password = await bcrypt.hash(this.password, 12);
	} catch (e) {
		next(e);
	}
});

// Match users password
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
