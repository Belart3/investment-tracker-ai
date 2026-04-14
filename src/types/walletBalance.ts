export type WalletBalance = {
    asset: BybitAsset[];
    balance: string;
    accountType: string;
    balExists: boolean;
    assetDetails: { coin: string; usdValue: string }[];
    cumRealisedPnl: string;
    loading: boolean;
    error: string | null;
}

export type BybitWalletResponse = {
    asset: BybitAsset[];
    balance: string;
    accountType: string;
};

export type BybitAsset = {
    spotBorrow: string;
    availableToBorrow: string;
    bonus: string;
    accruedInterest: string;
    availableToWithdraw: string;
    totalOrderIM: string;
    equity: string;
    totalPositionMM: string;
    usdValue: string;
    unrealisedPnl: string;
    collateralSwitch: boolean;
    spotHedgingQty: string;
    borrowAmount: string;
    totalPositionIM: string;
    walletBalance: string;
    cumRealisedPnl: string;
    locked: string;
    marginCollateral: boolean;
    coin: string;
};