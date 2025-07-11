// src/app/lib/bybit.ts
import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
    key: process.env.BYBIT_API_KEY!,
    secret: process.env.BYBIT_API_SECRET!,
    testnet: false,
});

export async function fetchBybitBalance() {
    try {
        const result = await client.getWalletBalance({
            accountType: 'UNIFIED',
        })
        const data = result.result.list;
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
