import { getAssetPrice } from "@/lib/getAssetPrice";
import { AssetData } from "@/types/assetData";
import { AssetDataWithMarket } from "@/types/assetData";

export function getAssetData(userAssets: AssetData[], data: any[]): AssetDataWithMarket[] {

    const assetData = userAssets.map( asset => {
        const id = asset.id;
        const symbol = asset.symbol;
        const quantity = asset.quantity;
        const purchasePrice = asset.purchasePrice;
        const currentPrice = getAssetPrice(asset.symbol, data || []);
        const pnl = (currentPrice - asset.purchasePrice) * asset.quantity;
        const roi = asset.purchasePrice > 0 ? (pnl / (asset.purchasePrice * asset.quantity)) * 100 : 0;
        return {
            id,
            symbol,
            quantity,
            purchasePrice,
            currentPrice,
            pnl,
            roi,
            transactionDate: asset.transactionDate,
            createdAt: asset.createdAt,
            updatedAt: asset.updatedAt,
        }
    })
    return assetData;
}