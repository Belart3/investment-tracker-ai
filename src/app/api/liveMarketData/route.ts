// import { fetchLiveMarketData } from "@/app/utils/bybit/liveMarketData";
// import { NextResponse } from "next/server";

// export async function GET () {
//     try {
//         const marketData = await fetchLiveMarketData();
//         if(!marketData) {
//             return NextResponse.json({ error: 'No market data found' }, { status: 404 });
//         }
//         const data = JSON.parse(JSON.stringify(marketData));
//         //console.log('Live Market Data:', data);
//         return NextResponse.json(data)
//     } catch (error: any) {
//         console.error('Live Market Data fetch failed:', error);
//         return NextResponse.json({ error: 'Failed to fetch live market data' }, { status: 500 });
//     }
// }


// app/api/coinmarketcap/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {
            headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY!,
            },
            cache: 'no-store',
        }
        );

        if (!res.ok) {
        const errorText = await res.text();
        return NextResponse.json(
            { error: errorText },
            { status: res.status }
        );
        }

        const data = await res.json();
        console.log('CoinMarketCap data fetched successfully:', data);

        return NextResponse.json(data.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
        { error: 'Failed to fetch CoinMarketCap data' },
        { status: 500 }
        );
    }
}
