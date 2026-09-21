import { RestClientV5 } from 'bybit-api';

const client = new RestClientV5({
    key: process.env.BYBIT_API_KEY!,
    secret: process.env.BYBIT_API_SECRET!,
    testnet: false,
});

export async function unifiedWalletBalance() {
    try {
        const result = await client.getWalletBalance({
            accountType: 'UNIFIED',
        })
        const data = result?.result?.list ?? [];

        if (!data.length) {
            throw new Error('No UNIFIED balance data found');
        }

        const c = []
        for (const item of data) {
            c.push({
                asset: item.coin,
                balance: item.totalWalletBalance,
                totalEquity: item.totalEquity,
                accountType: item.accountType,
            })
        }
        return c[0];
    } catch (error) {
        const apiError = error as {
            code?: number;
            message?: string;
            body?: unknown;
            response?: {
                status?: number;
                data?: unknown;
            };
        };

        console.error('Bybit API Error:', {
            code: apiError.code,
            message: apiError.message,
            body: apiError.body,
            status: apiError.response?.status,
            response: apiError.response?.data,
        });
        throw new Error('Failed to fetch UNIFIED balance data from Bybit');
    }
}
