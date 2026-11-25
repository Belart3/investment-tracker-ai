import 'server-only';
import { RestClientV5, type WalletBalanceV5, type WalletBalanceV5Coin } from 'bybit-api';
import type { Credentials } from '@/lib/exchanges/credentials';

// The shape the dashboard (useWalletBalance) expects
export type WalletBalance = {
    asset: WalletBalanceV5Coin[];
    balance: WalletBalanceV5['totalWalletBalance'];
    totalEquity: WalletBalanceV5['totalEquity'];
    accountType: WalletBalanceV5['accountType'];
};

// Asks Bybit for the unified wallet of whoever's key is passed in.
// Never log the raw error from bybit-api: it contains the key and secret.
export async function getWalletBalance(credentials: Credentials): Promise<WalletBalance> {
    const client = new RestClientV5({
        key: credentials.apiKey,
        secret: credentials.apiSecret,
        testnet: false,
    });

    let response;
    try {
        response = await client.getWalletBalance({ accountType: 'UNIFIED' });
    } catch (error) {
        const { code, body } = (error ?? {}) as { code?: number; body?: { retCode?: number; retMsg?: string } };
        console.error('Bybit wallet balance request failed:', { httpStatus: code, retCode: body?.retCode, retMsg: body?.retMsg });
        throw new Error('Failed to fetch UNIFIED balance data from Bybit');
    }

    if (response.retCode !== 0) {
        console.error('Bybit wallet balance rejected:', { retCode: response.retCode, retMsg: response.retMsg });
        throw new Error('Failed to fetch UNIFIED balance data from Bybit');
    }

    const wallet = response.result.list[0];
    if (!wallet) {
        throw new Error('No UNIFIED balance data found');
    }

    return {
        asset: wallet.coin,
        balance: wallet.totalWalletBalance,
        totalEquity: wallet.totalEquity,
        accountType: wallet.accountType,
    };
}
