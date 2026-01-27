
export type MarketDatum = {
    symbol: string;
    name: string;
    last_updated: string;
    quote: {
        USD: {
            price: number;
            percent_change_1h: number;
            percent_change_7d: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_60d: number;
            percent_change_90d: number;
        };
        latestPrice: number;
        percIncr: number;
        volume?: number; 
    },
}
