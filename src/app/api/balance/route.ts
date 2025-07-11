import { fetchBybitBalance } from "@/app/lib/fetchBalance";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const balanceData = await fetchBybitBalance();
        if (!balanceData){
            return NextResponse.json({ error: 'No balance data found' }, { status: 404 });
        }
        const safeData = JSON.parse(JSON.stringify(balanceData))
        //console.log('Bybit Balance Data:', safeData);
        return NextResponse.json(safeData) 
    } catch (error: any) {
        console.log('Bybit Balance Data fetch failed:', error);
    }
}