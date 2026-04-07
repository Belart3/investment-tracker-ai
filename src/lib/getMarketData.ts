export async function getMarketData(){
    const res = await fetch('/api/liveMarketData', {cache: 'no-store'});
    if (!res.ok) {
        console.error('Failed to fetch market data:', res.statusText);
        throw new Error('Failed to fetch market data');
    }
    const marketData = await res.json();
    return marketData;
}