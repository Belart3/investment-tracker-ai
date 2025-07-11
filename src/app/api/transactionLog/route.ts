import { getTransactionLog } from "@/app/lib/transactionLog";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const transactionLog = await getTransactionLog();
        if (!transactionLog) {
            return NextResponse.json({ error: 'No transaction log found' }, { status: 404 });
        }
        const data = JSON.parse(JSON.stringify(transactionLog));
        console.log('Transaction Log Data:', data);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Transaction Log fetch failed:', error);
        return NextResponse.json({ error: 'Failed to fetch transaction log' }, { status: 500 });
        
    }
}