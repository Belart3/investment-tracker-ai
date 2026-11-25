"use server"
import { after } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import Asset from "@/models/Asset";
import mongoose from "mongoose";
import { logUserActivity } from "@/lib/activityLogger";

export async function addAsset (symbol: string, quantity: number, purchasePrice: number, transactionDate: Date) {
    await connectDB();

    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return null;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return null;
    }
    if (decoded) {
    }

    const newAsset = new Asset({
        userId: new mongoose.Types.ObjectId(decoded.userId),
        symbol,
        quantity,
        purchasePrice,
        transactionDate
    });
    await newAsset.save();

    let assetCreationSucceeded = false;

    after(() => {
        if (!assetCreationSucceeded) {
            return;
        }

        return logUserActivity({
            userId: decoded.userId,
            actionType: "ASSET_CREATED",
            description: `Added ${newAsset.symbol} to portfolio`,
            metadata: {
                assetId: newAsset._id.toString(),
                symbol: newAsset.symbol,
                quantity: newAsset.quantity,
                purchasePrice: newAsset.purchasePrice,
                transactionDate: newAsset.transactionDate.toISOString(),
            },
        });
    });

    assetCreationSucceeded = true;
    return newAsset;
}