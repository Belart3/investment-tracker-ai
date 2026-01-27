"use client";
import { useContext } from "react";
import PortfolioOverview from "../ui/portfolioOverview";
import AssetBarChart from "../ui/assetBarChart";
import ConversionHistory from "../ui/conversionHistory";
import PortfolioDistribution from "../ui/portfolioDistribution";
import { Skeleton } from "@mui/material";
import { SidebarContext } from "@/context/sidebarContext";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { useExchangeHistory } from "@/hooks/useExchangeHistory";
import { ExchangeHistory } from "@/types/exchangeHistory";

type user = {
  name: string;
  email: string;
}

type Props = { 
  user?: user | null 
};

export default function Home({ user }: Props) {
  const {balance:balance, loading, error} = useWalletBalance();
  const {exchangeHistory: exchangeHistoryData, loading: exchangeHistoryLoading, error: exchangeHistoryError} = useExchangeHistory();

  const accountType = balance?.accountType || 'N/A';
  const assets = balance?.asset || [];
  const balExists = balance && Object.keys(balance).length > 0 && assets.length > 0;
  const labels = balExists ? assets.map((item: any) => item.coin) : [];
  const labelValue: string[] = balExists ? assets.map((item: typeof assets[number]) => item.usdValue) : [];
  const cumRealisedPnl: string = balExists && assets.reduce((acc: number, item: Asset) => acc + parseFloat(item.cumRealisedPnl || '0'), 0).toFixed(2) || '0';

  interface Asset {
    coin: string;
    usdValue: string;
    walletBalance: string;
    cumRealisedPnl: string;
  }

  interface User {
    name: string;
    email: string;
  }

  const totalBalance = balExists ? assets.reduce((acc: number, item: any) => acc + parseFloat(item.usdValue || '0'), 0).toFixed(2) : 0;

  const filterAssets: ExchangeHistory[] = exchangeHistoryData && exchangeHistoryData.length > 0 ? exchangeHistoryData.filter(
  (asset: ExchangeHistory, index: number, self: ExchangeHistory[]) =>
    index === self.findIndex((t: ExchangeHistory) => t.fromCoin === asset.fromCoin)
  ) : [];

  return (
    <div className={`xl:ms-[237px] transition-all duration-300`}>
      {/* page header */}
      <div className="border-b border-[#374151] bg-[#161B22] p-2 xl:p-5 w-full ">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-3 xl:px-5">
          <h2 className="text-white font-semibold text-sm lg:text-[27px]/[27px] tracking-[-1.62px]">Dashboard</h2>
          {
            balExists &&
            <p className="text-white font-normal text-sm xl:text-[16px]/[16px] tracking-[-1.62px]">
            Hey, {user ? user.name : <Skeleton variant="text" width={100} />} 
              <span className="mx-2">
                {
                  `You are viewing your ${balance.accountType} account.` 
                }
              </span>
            </p>
          }
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[1440px] mx-auto px-3 xl:px-5">
        {/* check if there is data from the api first */}
        {
          !balExists ? (
            <div className=" mt-[42px] flex flex-col gap-4 w-full h-full items-center justify-center">
              <h1 className="text-white text-[16px]/[16px] font-medium">
                Loading your dashboard...  
              </h1>
            </div>
          ) : 
          <div className="mt-[42px] flex flex-col gap-4">
            <div className="gap-4 grid md:grid-cols-2 xl:gap-5 w-full h-fit 2xl:h-fit">
              <div className="flex flex-col gap-4">
                {/* Portfolio Overview */}
                <div className="col-span-1  xl:row-span-1">
                  <PortfolioOverview balanceValue={totalBalance} accountType={accountType} pnl={cumRealisedPnl} />
                </div>
                {/* individual assets bar chart */}
                <div className="col-span-1 row-span-2 grow">
                  <AssetBarChart labels={labels} labelValue={labelValue}/>
                </div>
              </div>
              {/* portfolio distribution doughnut chart */}
              <div className="col-span-1">
                <PortfolioDistribution labels={labels} labelValue={labelValue} />
              </div>
            </div>
            {/* Asset trade information table */}
            <ConversionHistory filterAssets={filterAssets} exchangeHistory={exchangeHistoryData} loading={exchangeHistoryLoading} error={exchangeHistoryError} />
          </div>
        }
      </div>
    </div>
  );
}
