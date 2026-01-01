export async function getExchangeHistory(){
    const res = await fetch('/api/exchangeHistory');
    if (!res.ok) {
        throw new Error('Failed to fetch exchange history');
    }
    const historyData = await res.json();
    return historyData;
}