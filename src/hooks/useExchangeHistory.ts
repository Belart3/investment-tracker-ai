import { useState, useEffect } from "react";
import { getExchangeHistory } from "@/lib/getExchangeHistory";

export function useExchangeHistory () {
    const [exchangeHistory, setExchangeHistory] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchExchangeHistory = async () => {
            try {
                const historyData = await getExchangeHistory();
                setExchangeHistory(historyData);
            }
            catch (err) {
                setError(err as Error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchExchangeHistory();
    }
    , []);

    return { exchangeHistory, loading, error };
}