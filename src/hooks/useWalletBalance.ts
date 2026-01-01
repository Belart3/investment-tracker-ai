import { useState, useEffect } from "react";
import { getWalletBalance } from "@/lib/getWalletBalance";

export function useWalletBalance() {
    const [balance, setBalance] = useState<any>(null);
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