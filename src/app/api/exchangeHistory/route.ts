import { NextResponse } from "next/server";
import { requireUser } from "@/lib/requireUser";
import { getCredentials } from "@/lib/exchanges/credentials";
import { getConversionHistory } from "@/lib/exchanges/bybit/conversionHistory";

export async function GET () {
    const auth = await requireUser();
    if (!auth.ok) return auth.response;

    try {
        // The logged-in user's own Bybit key; not connected = no conversions
        const credentials = await getCredentials(auth.userId, 'bybit');
        if (!credentials) {
            return NextResponse.json([]);
        }

        const history = await getConversionHistory(credentials);
        return NextResponse.json(history);
    } catch (error) {
        console.error('Conversion history fetch failed:', error instanceof Error ? error.message : 'unknown error');
        return NextResponse.json({ error: 'Failed to fetch exchange history data' }, { status: 500 });
    }
}
