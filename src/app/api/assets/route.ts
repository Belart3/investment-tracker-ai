import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import Asset from "@/models/Asset";
import mongoose from "mongoose";

export async function GET() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();
        const assets = await Asset.find({
            userId: new mongoose.Types.ObjectId(decoded.userId),
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