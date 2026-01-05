export async function getWalletBalance(){
    const res = await fetch('/api/unifiedBalance');
    if (!res.ok) {
        throw new Error('Failed to fetch wallet balance');
    }
    const balanceData = await res.json();
    return balanceData;
}