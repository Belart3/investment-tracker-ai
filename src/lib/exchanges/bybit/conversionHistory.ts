import 'server-only';
import { RestClientV5 } from 'bybit-api';
import type { Credentials } from '@/lib/exchanges/credentials';

// The shape conversionHistory.tsx expects
export type ConversionRecord = {
    fromCoin: string;
    toCoin: string;
    fromAmount: string;
    toAmount: string;
    exchangeTime: string;
    exchangeRate: string;
};

// Coin conversions ("Convert" in Bybit) for whoever's key is passed in.
// Never log the raw error from bybit-api: it contains the key and secret.
export async function getConversionHistory(credentials: Credentials): Promise<ConversionRecord[]> {
    const client = new RestClientV5({
        key: credentials.apiKey,
        secret: credentials.apiSecret,
        testnet: false,
    });

    let response;
    try {
        response = await client.getCoinExchangeRecords();
    } catch (error) {
        const { code, body } = (error ?? {}) as { code?: number; body?: { retCode?: number; retMsg?: string } };
        console.error('Bybit conversion history request failed:', { httpStatus: code, retCode: body?.retCode, retMsg: body?.retMsg });
        throw new Error('Failed to fetch conversion history from Bybit');
    }

    if (response.retCode !== 0) {
        console.error('Bybit conversion history rejected:', { retCode: response.retCode, retMsg: response.retMsg });
        throw new Error('Failed to fetch conversion history from Bybit');
    }

    return (response.result.orderBody ?? []).map((item) => ({
        fromCoin: item.fromCoin,
        toCoin: item.toCoin,
        fromAmount: item.fromAmount,
        toAmount: item.toAmount,
        exchangeTime: item.createdTime,
        exchangeRate: item.exchangeRate,
    }));
}
