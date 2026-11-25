import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireUser } from "@/lib/requireUser";
import PortfolioSnapshot from "@/models/PortfolioSnapshot";
import { savePortfolioSnapshot } from "@/lib/savePortfolioSnapshot";

export async function POST() {
    const auth = await requireUser();
    if (!auth.ok) return auth.response;
    const { userId } = auth;

    try {
        const snapshot = await savePortfolioSnapshot(userId);

        return NextResponse.json(snapshot);
    } catch (error) {
        console.error("Failed to save portfolio snapshot", error);
        return NextResponse.json(
        { error: "Failed to save portfolio snapshot" },
        { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    const auth = await requireUser();
    if (!auth.ok) return auth.response;
    const { userId } = auth;

    const { searchParams } = new URL(request.url);
    const requestedDays = Number(searchParams.get("days") ?? 30);
    const days = Number.isFinite(requestedDays)
        ? Math.min(Math.max(Math.floor(requestedDays), 1), 365)
        : 30;

    try {
        await connectDB();

        const fromDate = new Date();
        fromDate.setUTCDate(fromDate.getUTCDate() - (days - 1));
        fromDate.setUTCHours(0, 0, 0, 0);

        const snapshots = await PortfolioSnapshot.find({
        userId,
        date: { $gte: fromDate },
        })
        .sort({ date: 1 })
        .select("date totalValue")
        .lean();

        return NextResponse.json(
        snapshots.map((snapshot) => ({
            date: snapshot.date.toISOString().slice(0, 10),
            value: snapshot.totalValue,
        }))
        );
    } catch (error) {
        console.error("Failed to load portfolio snapshots", error);
        return NextResponse.json(
        { error: "Failed to load portfolio snapshots" },
        { status: 500 }
        );
    }
}
