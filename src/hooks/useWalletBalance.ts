import { useState, useEffect } from "react";
import { getWalletBalance } from "@/lib/getWalletBalance";
import type { ExchangeId } from "@/lib/supportedExchanges";

export type WalletAsset = {
    coin: string;
    usdValue: string;
    walletBalance: string;
    cumRealisedPnl: string;
};

export type WalletBalance = {
    accountType?: string;
    balance?: string;
    totalEquity?: string;
    totalAssets?: number | string;
    asset?: WalletAsset[];
    connected?: boolean;
    exchange?: ExchangeId;
};

export function useWalletBalance() {
    const [balance, setBalance] = useState<WalletBalance | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const balanceData = await getWalletBalance();
                setBalance(balanceData);
            }
            catch (err) {
                setError(err as Error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }
    , []);

    return { balance, loading, error };
}