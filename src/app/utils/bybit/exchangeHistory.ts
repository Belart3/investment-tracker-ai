import { RestClientV5 } from "bybit-api";

export const client = new RestClientV5({
    key: process.env.BYBIT_API_KEY!,
    secret: process.env.BYBIT_API_SECRET!,
    testnet: false,
})

export async function fetchExchangeRecords () {
    try {
        const result = await client.getCoinExchangeRecords({
            
        })
        const data = result.result.orderBody;

        const res = [];
        for (const item of data) {
            res.push({
                fromCoin: item.fromCoin,
                toCoin: item.toCoin,
                fromAmount: item.fromAmount,
                toAmount: item.toAmount,
                exchangeTime: item.createdTime,
                exchangeRate: item.exchangeRate
            })
        }
        return res;
    } catch (error) {
        console.error('Bybit API Error:', error);
    }
} 