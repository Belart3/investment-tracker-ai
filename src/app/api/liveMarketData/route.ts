import { fetchLiveMarketData } from "@/app/lib/liveMarketData";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const marketData = await fetchLiveMarketData();
        if(!marketData) {
            return NextResponse.json({ error: 'No market data found' }, { status: 404 });
        }
        const data = JSON.parse(JSON.stringify(marketData));
        console.log('Live Market Data:', data);
        return NextResponse.json(data)
    } catch (error: any) {
        console.error('Live Market Data fetch failed:', error);
        return NextResponse.json({ error: 'Failed to fetch live market data' }, { status: 500 });
        
    }
}