import { fetchBybitBalance } from "@/app/utils/fetchBalance";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const balanceData = await fetchBybitBalance();
        if (!balanceData || Object.keys(balanceData).length === 0) {
            return NextResponse.json({ error: 'No balance data found' }, { status: 404 });
        }
        return NextResponse.json(balanceData) 
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to fetch Bybit balance data" },
            { status: 500 }
        )
    }
}