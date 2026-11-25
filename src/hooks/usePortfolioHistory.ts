import { useEffect, useState } from "react";
import { getPortfolioHistory } from "@/lib/getPortfolioHistory";

export type PortfolioHistoryPoint = {
    date: string;
    value: number;
};

export function usePortfolioHistory(days = 30) {
    const [data, setData] = useState<PortfolioHistoryPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadHistory() {
            const data = await getPortfolioHistory(days);
            if (!cancelled) {
                setData(data);
                setLoading(false);
            }
        }

        loadHistory();

        return () => {
            cancelled = true;
        };
    }, [days]);

    return { data, loading, error };
}
