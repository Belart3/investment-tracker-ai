export async function getMarketData(){
    const res = await fetch('api/liveMarketData', {cache: 'no-store'});
    if (!res.ok) {
        throw new Error('Failed to fetch market data');
    }
    const marketData = res.json();
    return marketData;
}