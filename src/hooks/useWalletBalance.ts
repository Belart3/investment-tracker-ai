import { useState, useEffect } from "react";
import { getWalletBalance } from "@/lib/getWalletBalance";
import { BybitWalletResponse } from "@/types/walletBalance";

export function useWalletBalance() {
    const [balance, setBalance] = useState<BybitWalletResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchBalance = async () => {
        try {
            const balanceData = await getWalletBalance();
            if (isMounted) {
            setBalance(balanceData);
            }
        } catch (err) {
            if (isMounted) {
            setError(err as Error);
            }
        } finally {
            if (isMounted) {
            setLoading(false);
            }
        }
        };

        fetchBalance();

        return () => {
        isMounted = false;
        };
    }, []);

    return { balance, loading, error };
}