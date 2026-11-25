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

export type AssetLivePrice = {
    symbol: string;
    price: number;
};

export async function fetchAssetLivePrice(
    assets: string | string[]
): Promise<number | AssetLivePrice[]> {
    const isArray = Array.isArray(assets);
    const symbols = (isArray ? assets : [assets])
        .map((asset) => asset.trim().toUpperCase())
        .filter(Boolean);

    if (symbols.length === 0) {
        throw new Error("At least one asset symbol is required");
    }

    const response = await fetch(
        `${COINMARKETCAP_API_URL}/cryptocurrency/quotes/latest?symbol=${encodeURIComponent(symbols.join(","))}&convert=USD`,
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
    const prices = symbols.map((symbol) => {
        const price = Number(data.data?.[symbol]?.[0]?.quote?.USD?.price);

        if (!Number.isFinite(price)) {
            throw new Error(`No USD price was found for asset symbol: ${symbol}`);
        }

        return {symbol, price};
    });

    console.log("live prices", Object.fromEntries(symbols.map((symbol, index) => [symbol, prices[index]])));

    return isArray ? prices : prices[0].price;
}