import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { savePortfolioSnapshot } from "@/lib/savePortfolioSnapshot";
import User from "@/models/User";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "fra1";

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

    const results = await Promise.allSettled(
      users.map((user) => savePortfolioSnapshot(String(user._id)))
    );
    const saved = results.filter((result) => result.status === "fulfilled").length;
    const failed = results.length - saved;

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`Failed to save portfolio snapshot for user ${String(users[index]._id)}`, result.reason);
      }
    });

    return NextResponse.json({ saved, failed, total: results.length });
  } catch (error) {
    console.error("Failed to save scheduled portfolio snapshots", error);
    return NextResponse.json(
      { error: "Failed to save scheduled portfolio snapshots" },
      { status: 500 }
    );
  }
}