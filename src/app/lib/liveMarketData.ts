import { RestClientV5 } from "bybit-api";

export const client = new RestClientV5({
    key: process.env.BYBIT_API_KEY!,
    secret: process.env.BYBIT_API_SECRET!,
    testnet: false,
})


export async function fetchLiveMarketData () {
    try {
        const result = await client.getTickers({
            category: 'spot',
        })
        const data = result.result.list;
        //console.log('Bybit Market Data:', data);

        const res = [];
        for (const item of data) {
            res.push({
                symbol: item.symbol,
                latestPrice: item.lastPrice,
                percIncr: item.price24hPcnt,
                volume: item.volume24h,
            })
        }
        //console.log('live market data:', res)
        return res;
    } catch (error) {
        console.error('Bybit API Error:', error);
    }
}