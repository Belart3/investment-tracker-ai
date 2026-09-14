import { useEffect, useState } from "react";

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
        try {
            const response = await fetch(`/api/portfolioSnapshots?days=${days}`);
            if (!response.ok) {
            throw new Error("Failed to load portfolio history");
            }

            const history = (await response.json()) as PortfolioHistoryPoint[];
            if (!cancelled) {
            setData(history);
            }
        } catch (requestError) {
            if (!cancelled) {
            setError(requestError as Error);
            }
        } finally {
            if (!cancelled) {
            setLoading(false);
            }
        }
        }

        loadHistory();

        return () => {
        cancelled = true;
        };
    }, [days]);

    return { data, loading, error };
}
