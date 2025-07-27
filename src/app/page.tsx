"use client";
import { useState, useEffect } from "react";
import LiveMarketData from "./components/liveMarketData";
import TimeFilter from "./components/timeFilter";
import PortfolioOverview from "./components/portfolioOverview";
import AssetBarChart from "./components/assetBarChart";
import ConversionHistory from "./components/conversionHistory";
import DoughnutChart from "./components/doughnutChart";
import AssetLineChart from "./components/assetLineChart";

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

export default function Home() {
  const [balance, setBalance] = useState<Balance >({});
  const [liveData, setLiveData] = useState<MarketDatum[]>([]);
  const [transactionLog, setTransactionLog] = useState<any>(null);
  const [exchangeHistory, setExchangeHistory] = useState<ExchangeHistoryData[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [showConversionFilter, setShowConversionFilter] = useState(false);

  useEffect(() => {
    async function loadBalance() {
      const res = await fetch('/api/balance');
      const data = await res.json();

      setBalance(data || null); 
      console.log('Balance data set:', data );
    }

    async function loadMarketData() {
      const res = await fetch('/api/liveMarketData');
      const marketData = await res.json();

      setLiveData(marketData || null); 
      console.log('Market data loaded:', marketData || null);
    }

    async function loadTransactionLog() {
      const res = await fetch('/api/transactionLog');
      const transactionLog = await res.json();

      setTransactionLog(transactionLog || null);
      console.log('Transaction Log:', transactionLog);
    }

    async function loadExchangeHistory() {
      const res = await fetch('/api/exchangeHistory');
      const data = await res.json();

      setExchangeHistory(data || []);
      console.log('exchange History Log:', data);
    }

    loadBalance();
    loadMarketData();
    loadTransactionLog(); 
    loadExchangeHistory();
  }, []);
  
  //wallet balance variables
  const cumRealisedPnl = balance?.asset?.[0]?.cumRealisedPnl || 0;
  const labels = balance ? balance.asset?.map((item: any) => item.coin) : []
  const labelValue = balance ? balance.asset?.map((item) => item.usdValue) : []
  const totalBalance = balance ? balance.asset?.reduce((acc: number, item: any) => acc + parseFloat(item.usdValue || '0'), 0).toFixed(2) : 0;

  //data for the liveMarket data
  const marketData = liveData 

  const filterAssets = exchangeHistory.filter(
  (asset, index, self) =>
    index === self.findIndex((t) => t.fromCoin === asset.fromCoin)
  );
  

  return (
    <div className="ms-[237px] mb-20">
      <div className="flex flex-col">
        {/* live market data marquee */}
        <LiveMarketData marketData={marketData} />
        {/* page header */}
        <div className="border-b border-[#374151] bg-[#161B22] p-5 w-full mt-[62px]">
          <h2 className="text-white font-semibold text-[27px]/[27px] tracking-[-1.62px]">Dashboard</h2>
        </div>
        <div className="px-5 mt-[42px] gap-5">
          <div className="grid grid-cols-6 gap-5 w-full h-fit 2xl:h-[600px]">
            {/* Portfolio Overview */}
            <PortfolioOverview balance={balance} totalBalance={totalBalance} cumRealisedPnl={cumRealisedPnl} />
            {/* portfolio distribution doughnut chart */}
            <div className="col-span-2 bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] row-span-3 order-2 ">
              <div className="p-5 border-b border-[#374151] flex items-center justify-between">
                <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Distribution</h3>
                <TimeFilter />
              </div>
              <DoughnutChart labels={labels} labelValue={labelValue} />
            </div>
            {/* portfolio distribution line chart */}
            <AssetLineChart  labels={labels} labelValue={labelValue} />
            {/* individual assets bar chart */}
            <AssetBarChart labels={labels} labelValue={labelValue}/>
            {/* Asset trade information table */}
            <ConversionHistory filterAssets={filterAssets} liveData={liveData} exchangeHistory={exchangeHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
