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

        return NextResponse.json(data.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
        { error: 'Failed to fetch CoinMarketCap data' },
        { status: 500 }
        );
    }
}
