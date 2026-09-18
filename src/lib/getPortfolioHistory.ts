export type PortfolioHistoryPoint = {
    date: string;
    value: number;
};
export async function getPortfolioHistory(days = 30) {
    try {
        const res = await fetch(`/api/portfolioSnapshots?days=${days}`);
        if (!res.ok) {
            throw new Error('Failed to fetch portfolio history');
        }
        const balanceData = await res.json() as PortfolioHistoryPoint[];
        console.log('balanceData', balanceData);
        return balanceData;
    } catch (error) {
        console.error('Error fetching portfolio history:', error);
        throw new Error('Failed to fetch portfolio history');
    }
}
