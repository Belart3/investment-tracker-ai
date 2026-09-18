import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected = false;

export async function connectDB() {

    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI as string, {
            dbName: process.env.MONGODB_DB_NAME ?? 'InvestmentTracker',
        });
        isConnected = db.connections[0].readyState === 1;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}