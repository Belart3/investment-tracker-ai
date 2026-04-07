import { MarketDatum } from "@/types/marketData";

export const getAssetPrice = (asset: string, marketData: MarketDatum[]) : number => {
    const assetData = marketData.find(
        (data:MarketDatum) => data.symbol.toLowerCase() === asset.toLowerCase()
    );
    return assetData ? Number(assetData.quote.USD.price) : 0;
}