"use server";

const COINMARKETCAP_API_URL = "https://pro-api.coinmarketcap.com/v2";

type CoinMarketCapQuote = {
    quote?: {
        USD?: {
            price?: number;
        };
    };
};

type CoinMarketCapQuoteResponse = {
    data?: Record<string, CoinMarketCapQuote[]>;
};

export async function fetchAssetLivePrice(asset: string): Promise<number> {
    const symbol = asset.trim().toUpperCase();

    if (!symbol) {
        throw new Error("An asset symbol is required");
    }

    const response = await fetch(
        `${COINMARKETCAP_API_URL}/cryptocurrency/quotes/latest?symbol=${encodeURIComponent(symbol)}&convert=USD`,
        {
            headers: {
                "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY ?? "",
            },
            next: { revalidate: 30 },
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`CoinMarketCap price request failed (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as CoinMarketCapQuoteResponse;
    const price = data.data?.[symbol]?.[0]?.quote?.USD?.price;

    if (typeof price !== "number" || !Number.isFinite(price)) {
        throw new Error(`No USD price was found for asset symbol: ${symbol}`);
    }

    return price;
}