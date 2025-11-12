import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
    throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
}

let isConnected = false;

export async function connectDB() {

    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI as string);
        isConnected = db.connections[0].readyState === 1;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}