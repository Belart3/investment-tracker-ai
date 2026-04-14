import { useWalletBalance } from "@/hooks/useWalletBalance";
import { BybitAsset, WalletBalance } from "@/types/walletBalance";

export const getWalletBalanceData: () => WalletBalance = () => {
    const { balance, loading, error } = useWalletBalance();
    const accountType = balance?.accountType || 'N/A';
    const assets: BybitAsset[] = balance?.asset || [];
    const balExists = !!(balance && Object.keys(balance).length > 0 && assets.length > 0);
    const assetDetails = balExists ? assets.map((item: BybitAsset) => ({
        coin: item.coin,
        usdValue: item.usdValue
    })) : [];
    const cumRealisedPnl = balExists && assets.reduce((acc: number, item: BybitAsset) => acc + parseFloat(item.cumRealisedPnl || '0'), 0).toFixed(2) || '0';
    const totalBalance = assets.reduce((acc: number, item: BybitAsset) => acc + parseFloat(item.usdValue || '0'), 0).toFixed(2);
    return { 
        asset: assets,
        balance: totalBalance,
        accountType: accountType,
        balExists,
        assetDetails,
        cumRealisedPnl,
        loading,
        error: error ? error.message : null
    };
}