import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
    key: process.env.BYBIT_API_KEY!,
    secret: process.env.BYBIT_API_SECRET!,
    testnet: false,
});

export async function fetchCurrentHoldings() {
    try {
        const result = await client.getTransactionLog({
            accountType: 'UNIFIED',
        })
        const data = result?.result?.list ?? [];

        if (!data.length) {
            throw new Error('No balance data found');
        }
        //console.log('Bybit Balance Data:', data);

        const c = []
        for (const item of data) {
            c.push({
                asset: item.coin,
                balance: item.totalWalletBalance,
                accountType: item.accountType,
            })
        }
        //console.log('Processed Bybit Balance Data:', c[0]);
        return c[0];
    } catch (error) {
        console.error('Bybit API Error:', error);
        throw new Error('Failed to fetch balance data from Bybit');
    }
}
