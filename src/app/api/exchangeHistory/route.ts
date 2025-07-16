import { fetchExchangeRecords } from "@/app/lib/exchangeHistory";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const exchangeHistory = await fetchExchangeRecords();
        if(!exchangeHistory) {
            return NextResponse.json({ error: 'No exchange history found' }, { status: 404 });
        }
        const data = JSON.parse(JSON.stringify(exchangeHistory));
        console.log('exchange history Data:', data);
        return NextResponse.json(data)
    } catch (error: any) {
        console.error('Trade History Data fetch failed:', error);
        return NextResponse.json({ error: 'Failed to fetch exchange history data' }, { status: 500 });
    }
} 