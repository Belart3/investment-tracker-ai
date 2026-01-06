"use server"
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import Asset from "@/models/Assets";
import mongoose from "mongoose";

export async function addAsset (assetSymbol: string, quantity: number, purchasePrice: number, transactionDate: string, notes?: string) {
    await connectDB();

    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return null;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return null;
    }

    const newAsset = new Asset({
        userId: new mongoose.Types.ObjectId(decoded.userId),
        assetSymbol,
        quantity,
        purchasePrice,
        transactionDate,
        notes
    });
    await newAsset.save();
    return newAsset;
}

export async function getAssetsByUserId (userId: string) {
    await connectDB();
    const assets = await Asset.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
    return assets;
}