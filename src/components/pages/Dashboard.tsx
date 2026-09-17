"use client";
import { useState, useEffect, useContext } from "react";
import LiveMarketData from "../ui/liveMarketData";
import PortfolioOverview from "../ui/portfolioOverview";
import AssetBarChart from "../ui/assetBarChart";
import ConversionHistory from "../ui/conversionHistory";
import PortfolioDistribution from "../ui/portfolioDistribution";
import AssetLineChart from "../ui/assetLineChart";
import { Skeleton } from "@mui/material";
import { SidebarContext } from "@/context/sidebarContext";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { useExchangeHistory } from "@/hooks/useExchangeHistory";
import { usePortfolioHistory } from "@/hooks/usePortfolioHistory";

type Balance = {
  accountType?: string;
  balance?: string ;
  totalAssets?: number | string;
  asset?: {
    coin: string;
    usdValue: string;
    walletBalance: string;
    cumRealisedPnl: string ;
  }[];
};

type MarketDatum = {
  symbol: string;
  latestPrice: number;
  percIncr: number;
  volume?: number; 
};

type ExchangeHistoryData = {
  fromCoin: string,
  toCoin: string,
  fromAmount: string,
  toAmount: string,
  exchangeTime: string,
  exchangeRate: string,
}

type user = {
  name?: string;
  email?: string;
  _id?: string;
}

type Props = { 
  user?: user | null 
};

export default function Home({ user }: Props) {
  const { showSidebar } = useContext(SidebarContext);
  const {balance:balance, loading, error} = useWalletBalance();
  const {exchangeHistory: exchangeHistoryData, loading: exchangeHistoryLoading, error: exchangeHistoryError} = useExchangeHistory();

  const accountType: string = balance?.accountType || 'N/A';
  const assets = balance?.asset || [];
  const validAssets = assets.filter((asset) => asset.usdValue && parseFloat(asset.usdValue) >= 1);
  const sortedAssets = validAssets.sort((a, b) => parseFloat(b.usdValue) - parseFloat(a.usdValue));
  const topAssets = sortedAssets.slice(0, 10);
  const balExists = balance && Object.keys(balance).length > 0 && validAssets.length > 0;
  const labels = balExists ? validAssets.map((item: any) => item.coin) : [];
  const labelValue: string[] = balExists ? validAssets.map((item: typeof validAssets[number]) => item.usdValue) : [];
  console.log('labelvalue', labelValue);
  const cumRealisedPnl: string = balExists && validAssets.reduce((acc: number, item: Asset) => acc + parseFloat(item.cumRealisedPnl || '0'), 0).toFixed(2) || '0';
  interface Asset {
    coin: string;
    usdValue: string;
    walletBalance: string;
    cumRealisedPnl: string;
  }

  interface Balance {
    accountType?: string;
    balance?: string;
    totalAssets?: number | string;
    asset?: Asset[];
  }

  interface MarketDatum {
    symbol: string;
    latestPrice: number;
    percIncr: number;
    volume?: number;
  }

  interface ExchangeHistoryData {
    fromCoin: string;
    toCoin: string;
    fromAmount: string;
    toAmount: string;
    exchangeTime: string;
    exchangeRate: string;
  }

  interface User {
    name: string;
    email: string;
  }

  interface DashboardProps {
    user?: User | null;
  }
  const totalBalance = balExists ? assets.reduce((acc: number, item: any) => acc + parseFloat(item.usdValue || '0'), 0).toFixed(2) : 0;

  const filterAssets: ExchangeHistoryData[] = exchangeHistoryData && exchangeHistoryData.length > 0 ? exchangeHistoryData.filter(
  (asset: ExchangeHistoryData, index: number, self: ExchangeHistoryData[]) =>
    index === self.findIndex((t: ExchangeHistoryData) => t.fromCoin === asset.fromCoin)
  ) : [];

  return (
    <div className={`xl:ms-[237px] transition-all duration-300 min-h-screen bg-[var(--bg-canvas)] p-8`}>
      {/* page header */}
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-1">
          <h2 className="text-(--text-primary) font-semibold text-[22px] leading-7 tracking-[-0.012em]">Dashboard</h2>
          {balExists &&
            <p className="text-[var(--text-secondary)] font-medium text-[13px] leading-[19px]">
            Hey, <span className="text-[var(--text-primary)]">{user ? user.name : <Skeleton variant="text" width={100} />} —</span>
              <span className="mx-2 hidden sm:inline capitalize">
                {
                  `${accountType.toLowerCase()} account.` 
                }
              </span>
            </p>}
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[1440px] mx-auto">
        {
          !balExists ? (
            <div className=" mt-[42px] flex flex-col gap-4 w-full h-full items-center justify-center">
              <h1 className="text-(--text-secondary) text-[16px]/[16px] font-medium">
                Loading your dashboard...  
              </h1>
            </div>
          ) : 
          <div className="mt-8 flex flex-col gap-5">
            <AssetLineChart             /> 
            <div className="grid grid-cols-2 gap-5">
              <PortfolioDistribution labels={labels} labelValue={labelValue} />

            </div>
            {/* <ConversionHistory filterAssets={filterAssets} exchangeHistory={exchangeHistoryData} loading={exchangeHistoryLoading} error={exchangeHistoryError} /> */}
          </div>
        }
      </div>
    </div>
  );
}
