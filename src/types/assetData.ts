
export type AssetData = {
    id: string;
    symbol: string;
    quantity: number;
    purchasePrice: number;
    transactionDate: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export type AssetDataWithMarket = AssetData & {
    currentPrice: number;
    pnl: number;
    roi: number;
}