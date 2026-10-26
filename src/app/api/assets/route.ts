import { NextResponse } from "next/server";
import { requireUser } from "@/lib/requireUser";
import { connectDB } from "@/lib/mongodb";
import Asset from "@/models/Asset";
import mongoose from "mongoose";

export async function GET() {
    const auth = await requireUser();
    if (!auth.ok) return auth.response;

    try {
        await connectDB();
        const assets = await Asset.find({
            userId: new mongoose.Types.ObjectId(auth.userId),
        })
            .sort({ createdAt: -1 })
            .lean();

        const serializedAssets = assets.map((asset) => ({
            ...asset,
            _id: String(asset._id),
            userId: String(asset.userId),
            transactionDate: asset.transactionDate.toISOString(),
            createdAt: asset.createdAt.toISOString(),
            updatedAt: asset.updatedAt.toISOString(),
        }));

        return NextResponse.json(serializedAssets);
    } catch (error) {
        console.error("Failed to fetch assets:", error);
        return NextResponse.json(
            { error: "Failed to fetch assets" },
            { status: 500 }
        );
    }
}