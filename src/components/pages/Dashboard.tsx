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
  name: string;
  email: string;
}

type Props = { 
  user?: user | null 
};

export default function Home({ user }: Props) {
  const [balance, setBalance] = useState<Balance>({});
  const [liveData, setLiveData] = useState<MarketDatum[]>([]);
  const [exchangeHistory, setExchangeHistory] = useState<ExchangeHistoryData[]>([]);
  const { showSidebar } = useContext(SidebarContext);

  useEffect(() => {

    async function loadMarketData() {
      const res = await fetch('/api/liveMarketData');
      const marketData = await res.json();
      setLiveData(marketData || []); 
      //console.log('Market data loaded:', marketData || null);
    }    
    loadMarketData()
    
    async function loadUnifiedWalletBalance() {
      const res = await fetch('/api/unifiedBalance');
      const balanceData = await res.json();

      setBalance(balanceData || []); 
      console.log('Balance data set:', balanceData );
    }
    loadUnifiedWalletBalance()

    async function loadExchangeHistory() {
      const res = await fetch('/api/exchangeHistory');
      const data = await res.json();

      setExchangeHistory(data || []);
      //console.log('exchange History Log:', data);
    } 
    loadExchangeHistory();

    // async function loadFundWalletBalance() {
    //   const res = await fetch('/api/fundWalletBalance');
    //   const balanceData = await res.json();

    //   setBalance(balanceData || null); 
    //   //console.log('Balance data set:', balanceData );
    // }
    // loadFundWalletBalance()
  }, []);
  const accountType = balance?.accountType || 'N/A';
  const assets = balance?.asset || [];
  const balExists = balance && Object.keys(balance).length > 0 && assets.length > 0;
  const labels = balExists ? assets.map((item: any) => item.coin) : [];
  const labelValue = balExists ? assets.map((item) => item.usdValue) : [];
  const cumRealisedPnl = balExists && assets.reduce((acc, item) => acc + parseFloat(item.cumRealisedPnl || '0'), 0).toFixed(2) || '0';
  const totalBalance = balExists ? assets.reduce((acc: number, item: any) => acc + parseFloat(item.usdValue || '0'), 0).toFixed(2) : 0;

  const filterAssets = exchangeHistory && exchangeHistory.length > 0 ? exchangeHistory.filter(
  (asset, index, self) =>
    index === self.findIndex((t) => t.fromCoin === asset.fromCoin)
  ) : [];

  return (
    <div className={`lg:ms-[237px] transition-all duration-300`}>
      <div className="flex flex-col">
        {/* live market data marquee */}
        <LiveMarketData />
        {/* page header */}
        <div className="border-b border-[#374151] bg-[#161B22] p-2 xl:p-5 w-full mt-[50px] xl:mt-[72px] flex items-center justify-between">
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
        {/* check if there is data from the api first */}
        {
          !balExists ? (
            <div className="px-3 xl:px-5 mt-[42px] flex flex-col gap-4 w-full h-full items-center justify-center">
              <h1 className="text-white text-[16px]/[16px] font-medium">
                Loading your dashboard...  
              </h1>
            </div>
          ) : 
          <div className="px-3 xl:px-5 mt-[42px] flex flex-col gap-4">
            <div className="flex flex-col gap-4 xl:grid xl:grid-cols-6 xl:gap-5 w-full h-fit 2xl:h-[600px]">
              {/* Portfolio Overview */}
              <div className="  xl:col-span-2  xl:row-span-1">
                <PortfolioOverview balanceValue={totalBalance} accountType={accountType} pnl={cumRealisedPnl} />
              </div>
              {/* portfolio distribution doughnut chart */}
              <div className=" xl:col-span-2   xl:row-span-3">
                <PortfolioDistribution labels={labels} labelValue={labelValue} />
              </div>
              {/* portfolio distribution line chart */}
              {/* <div className="  xl:col-span-2  xl:row-span-2">
                <AssetLineChart  label={labels} labelValue={labelValue} />
              </div> */}
              {/* individual assets bar chart */}
              <div className=" xl:col-span-2   xl:row-span-2">
                <AssetBarChart labels={labels} labelValue={labelValue}/>
              </div>
            </div>
            {/* Asset trade information table */}
            <ConversionHistory filterAssets={filterAssets} liveData={liveData} exchangeHistory={exchangeHistory} />
          </div>
        }
      </div>
    </div>
  );
}
