import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { savePortfolioSnapshot } from "@/lib/savePortfolioSnapshot";
import User from "@/models/User";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const authorization = request.headers.get("authorization");
  return authorization === `Bearer ${process.env.CRON_SECRET}`;
}

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET || !isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const users = await User.find({}).select("_id").lean();

    const snapshots = await Promise.all(
      users.map((user) => savePortfolioSnapshot(String(user._id)))
    );

    return NextResponse.json({ saved: snapshots.length });
  } catch (error) {
    console.error("Failed to save scheduled portfolio snapshots", error);
    return NextResponse.json(
      { error: "Failed to save scheduled portfolio snapshots" },
      { status: 500 }
    );
  }
}