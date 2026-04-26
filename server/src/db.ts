import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || '';
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || '');
        console.log(`[ ✅ SUCCESS ]: MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error('[ ❌ DB CONNECTION ERROR ]: Error connecting to MongoDB.');
        // STOP THE APP IF THERE IS NO DB
        process.exit(1);
    }
};

export default connectDB;