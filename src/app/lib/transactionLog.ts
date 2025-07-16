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
            currency: 'USDT',
            category: 'spot'
        })
        const data = result.result;
        //console.log('Bybit Transaction Log Data:', data);
        return data
    } catch (error: any) {
        console.error('Bybit API Error:', error);
        throw new Error('Failed to fetch transaction log from Bybit');
        
    }
}