import { RestClientV5 } from "bybit-api";

const client = new RestClientV5({
    key: process.env.BYBIT_API_KEY!,
    secret: process.env.BYBIT_API_SECRET!,
    testnet: false,
})

export async function getTransactionLog () {
    try {
        const result = await client.getTransactionLog({
            accountType: 'UNIFIED',
            startTime: Date.now() - 30 * 24 * 60 * 60 * 1000, // Last 30 days
        })
        const data = result.result.list;
        //console.log('Bybit Transaction Log Data:', data);
        return data
    } catch (error: any) {
        console.error('Bybit API Error:', error);
        throw new Error('Failed to fetch transaction log from Bybit');
        
    }
}