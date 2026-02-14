import { MarketDatum } from "@/types/marketData";
import React from "react";
import { useMarketData } from "@/hooks/useMarketData";

export const getAssetPrice = (asset: string) : number => {
    const { data: liveData, loading, error } = useMarketData();
    const marketData : MarketDatum[] = liveData.length > 0 ? liveData : [];
    const assetData = marketData.find((data:MarketDatum) => data.symbol.toLowerCase() === asset.toLowerCase());
    return assetData ? Number(assetData.quote.USD.price) : 0;
}