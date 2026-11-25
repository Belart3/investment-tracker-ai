import { NextResponse } from "next/server";
import { requireUser } from "@/lib/requireUser";
import { getCredentials } from "@/lib/exchanges/credentials";
import { getWalletBalance } from "@/lib/exchanges/bybit/walletBalance";

export async function GET() {
    const auth = await requireUser();
    if (!auth.ok) return auth.response;

    try {
        // The logged-in user's own Bybit key
        const credentials = await getCredentials(auth.userId, 'bybit');

        // Not connected yet: an empty wallet, not an error
        if (!credentials) {
            return NextResponse.json({ exchange: 'bybit', connected: false, asset: [], balance: '0', totalEquity: '0', accountType: null });
        }

        const balanceData = await getWalletBalance(credentials);
        return NextResponse.json({ exchange: 'bybit', connected: true, ...balanceData });
    } catch (error) {
        console.error('Failed to fetch Bybit balance:', error instanceof Error ? error.message : 'unknown error');
        return NextResponse.json(
            { error: "Failed to fetch Bybit balance data" },
            { status: 500 }
        )
    }
}
