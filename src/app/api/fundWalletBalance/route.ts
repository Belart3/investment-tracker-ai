// /app/api/fundWalletBalance/route.ts
import { NextResponse } from "next/server";
import { getFundingWalletBalance } from "@/app/utils/bybit/fundWalletBalance";

export async function GET() {
    try {
        const balanceData = await getFundingWalletBalance();
        if (!balanceData || !balanceData.length) {
        return NextResponse.json({ error: 'No balance data found' }, { status: 404 });
        }
        return NextResponse.json(balanceData);
    } catch (err: any) {
        return NextResponse.json(
        { error: "Failed to fetch Bybit balance data" },
        { status: 500 }
        );
    }
}
