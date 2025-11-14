import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Database connection error:", err);
    }
};

export default connectDB;
