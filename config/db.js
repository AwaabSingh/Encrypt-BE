import mongoose from 'mongoose';

mongoose.set('strictQuery', true)
export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};


