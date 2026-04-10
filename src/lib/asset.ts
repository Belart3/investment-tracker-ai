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
    const assets = await Asset.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 }).lean();
    return assets.map((asset: any) => ({
        id: asset._id.toString(),
        symbol: asset.assetSymbol,
        quantity: asset.quantity,
        purchasePrice: asset.purchasePrice,
        transactionDate: asset.transactionDate,
        notes: asset.notes,
        createdAt: asset.createdAt,
        updatedAt: asset.updatedAt,
    }));
}

export async function deleteAssetById (assetId: string) {
    await connectDB();
    const result = await Asset.deleteOne({ _id: new mongoose.Types.ObjectId(assetId) });
    return result.deletedCount === 1;
}