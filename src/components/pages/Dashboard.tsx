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
  const [balance, setBalance] = useState<Balance >({});
  const [liveData, setLiveData] = useState<MarketDatum[]>([]);
  const [transactionLog, setTransactionLog] = useState<any>(null);
  const [exchangeHistory, setExchangeHistory] = useState<ExchangeHistoryData[]>([]);
  const { showSidebar } = useContext(SidebarContext);

  useEffect(() => {
    async function loadTransactionLog() {
      const res = await fetch('/api/transactionLog');
      const transactionLog = await res.json();

      setTransactionLog(transactionLog || null);
      //console.log('Transaction Log:', transactionLog);
    }

    async function loadExchangeHistory() {
      const res = await fetch('/api/exchangeHistory');
      const data = await res.json();

      setExchangeHistory(data || []);
      //console.log('exchange History Log:', data);
    }
    
    async function loadBalance() {
      const res = await fetch('/api/balance');
      const data = await res.json();

      setBalance(data || null); 
      console.log('Balance data set:', data );
    }

    loadBalance()

    loadTransactionLog(); 
    loadExchangeHistory();
  }, []);
  
  //wallet balance variables
  //const cumRealisedPnl = balance?.asset?.[0]?.cumRealisedPnl || 0;
  const labels = balance && balance.asset ? balance.asset.map((item: any) => item.coin) : [];
  const labelValue = balance && balance.asset ? balance.asset.map((item) => item.usdValue) : [];
  //const totalBalance = balance ? balance.asset?.reduce((acc: number, item: any) => acc + parseFloat(item.usdValue || '0'), 0).toFixed(2) : 0;

  //data for the liveMarket data
  //const marketData = liveData 

  const filterAssets = exchangeHistory && exchangeHistory.length > 0 ? exchangeHistory.filter(
  (asset, index, self) =>
    index === self.findIndex((t) => t.fromCoin === asset.fromCoin)
  ) : [];

  return (
    <div className={`${showSidebar ? 'ms' : 'ms-4'} transition-all duration-300`}>
      <div className="flex flex-col">
        {/* live market data marquee */}
        <LiveMarketData />
        {/* page header */}
        <div className="border-b border-[#374151] bg-[#161B22] p-2 xl:p-5 w-full mt-[50px] xl:mt-[72px] flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm lg:text-[27px]/[27px] tracking-[-1.62px]">Dashboard</h2>
          <p className="text-white font-normal text-sm xl:text-[16px]/[16px] tracking-[-1.62px]">
            Hey, {user ? user.name : <Skeleton variant="text" width={100} />}
          </p>
        </div>
        <div className="px-3 xl:px-5 mt-[42px] flex flex-col gap-4">
          <div className="flex flex-col gap-4 xl:grid xl:grid-cols-6 xl:gap-5 w-full h-fit 2xl:h-[600px]">
            {/* Portfolio Overview */}
            <div className="  xl:col-span-2  xl:row-span-1">
              <PortfolioOverview />
            </div>
            {/* portfolio distribution doughnut chart */}
            <div className=" xl:col-span-2   xl:row-span-3">
              <PortfolioDistribution labels={labels} labelValue={labelValue} />
            </div>
            {/* portfolio distribution line chart */}
            <div className="  xl:col-span-2  xl:row-span-2">
              <AssetLineChart  label={labels} labelValue={labelValue} />
            </div>
            {/* individual assets bar chart */}
            <div className=" xl:col-span-2   xl:row-span-2">
              <AssetBarChart labels={labels} labelValue={labelValue}/>
            </div>
          </div>
          {/* Asset trade information table */}
          <ConversionHistory filterAssets={filterAssets} liveData={liveData} exchangeHistory={exchangeHistory} />
        </div>
      </div>
    </div>
  );
}
