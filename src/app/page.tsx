"use client";
import { LuLayoutDashboard } from "react-icons/lu";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState, useEffect } from "react";
import LiveMarketData from "./components/liveMarketData";

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, Title, Filler, Tooltip, Legend);

type Balance = {
  accountType?: string;
  balance?: string ;
  totalAssets?: number | string;
  asset?: {
    coin: string;
    walletBalance: string;
    cumRealisedPnl: string ;
  }[];
};

export default function Home() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [liveData, setLiveData] = useState<any>(null);

  useEffect(() => {
    async function loadBalance() {
      const res = await fetch('/api/balance');
      const data = await res.json();

      setBalance(data || null); 
      console.log('Balance data set:', data || null);
    }

    async function loadMarketData() {
      const res = await fetch('/api/liveMarketData');
      const marketData = await res.json();

      setLiveData(marketData || null); 
      console.log('Market data loaded:', marketData || null);
      console.log('Live symbol:', liveData);
    }

    loadBalance();
    loadMarketData();
  }, []);
  
  //wallet balance
  const cumRealisedPnl = balance?.asset?.[0]?.cumRealisedPnl || 0;
  const labels = balance ? balance.asset?.map((item: any) => item.coin) : []
  const labelValue = balance ? balance.asset?.map((item: any) => item.walletBalance) : []

  // live market data
  // const marketData = {
  //   symbol: liveData ? liveData.map((item: any) => item.symbol) : [],
  //   latestPrice: liveData ? liveData.map((item: any) => item.latestPrice) : [],
  //   percIncr: liveData ? liveData.map((item: any) => item.percIncr) : [],
  // }
  const marketData = liveData 

  return (
    <div className="">
      <div className="fixed left-0 top-0 h-screen w-[237px] border-r border-[#374151] p-5 flex flex-col gap-8 bg-[#161B22]">
        <h1 className="">Investment Tracker AI</h1>
        <div className="flex flex-col gap-2">
          <h2 className="">Menu</h2>
          <div className="flex flex-col">
            <a href="">
              <div className="flex items-center gap-[10px] rounded-[12px] py-2 px-3 bg-[#28C76F] text-white hover:bg-[#22A85C] transition-colors">
                <LuLayoutDashboard size={24} />
                <span className="text-[14px]/[21px] font-semibold">Dashboard</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col ms-[237px]">
        <div className="border-b border-[#374151] bg-[#161B22] p-5 w-full">
          <LiveMarketData marketData={marketData} />
        </div>
        <div className="border-b border-[#374151] bg-[#161B22] p-5 w-full">
          <h2 className="text-white">Dashboard</h2>
        </div>
        <div className="px-5 mt-[42px] gap-5">
          <div className="grid grid-cols-6 grid-rows-3 gap-5 w-full h-fit 2xl:h-[600px]">
            <div className=" bg-[#161B22] rounded-[16px] flex flex-col justify-center col-span-4 row-span-1 border border-[#374151] order-1">
              <div className="flex items-center justify-between p-5">
                <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Overview</h3>
                <div className="flex p-1.5 rounded-[8px] bg-[#161B22] border border-[#374151]">
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    7d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    14d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    30d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    60d
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-5 border-t border-[#374151]">
                <div className="flex flex-col gap-2">
                  <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                    Account Type
                  </h4>
                  <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                  {
                    balance ? balance.accountType : 'Loading...'
                  }
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                    Total Balance
                  </h4>
                  <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                    { 
                      (balance ? '$' + parseFloat(Number(balance.balance).toFixed(2)) : 'Loading...')
                    }
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                    Realized PnL
                  </h4>
                  <p className={`text-[27px]/[27px] tracking-[-1.62px] font-semibold ${Number(cumRealisedPnl) >= 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                    {
                      balance ? parseFloat(Number(cumRealisedPnl).toFixed(2)) + '%' : 'Loading...'
                    }
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                    {
                      balance ? balance.totalAssets : 'Loading...'
                    }
                  </h4>
                  <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                    {
                      balance ? balance.totalAssets : 'Loading...'
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] row-span-3 order-2">
              <div className="p-5 border-b border-[#374151]">
                <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Distribution</h3>
              </div>
              <div className="h-[500px] flex items-center justify-center">
                <Doughnut
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: labelValue,
                        backgroundColor: ["#28C76F", "#FF9F43", "#7367F0", "#EA5455"],
                        hoverBackgroundColor: ["#22A85C", "#FF8C2D", "#6B5CE9", "#E94A4A"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                  }}
                />
              </div>
            </div>
            <div className="col-span-2 bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] row-span-2 order-3 space-y-5">
              <div className="p-5 border-b border-[#374151] flex items-center justify-between">
                <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Distribution</h3>
                <div className="flex p-1.5 rounded-[8px] bg-[#161B22] border border-[#374151]">
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    7d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    14d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    30d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    60d
                  </button>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <Line
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: '',
                        data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 90, 100, 120],
                        fill: true,
                        backgroundColor: "rgba(40, 199, 111, 0.2)",
                        borderColor: "#28C76F",
                        borderWidth: 1,
                        tension: 0.4,
                        pointRadius: 2,
                        pointHoverRadius: 5,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: '#374151',
                        },
                        ticks: {
                          color: '#D1D5DB',
                          stepSize: 50,
                        },
                      },
                    },        
                  }}
                />
              </div>
            </div>
            <div className="col-span-2 bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] row-span-2 order-3 space-y-5">
              <div className="p-5 border-b border-[#374151] flex items-center justify-between">
                <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Distribution</h3>
                <div className="flex p-1.5 rounded-[8px] bg-[#161B22] border border-[#374151]">
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    7d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    14d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    30d
                  </button>
                  <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                    60d
                  </button>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <Line
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: '',
                        data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 90, 100, 120],
                        fill: true,
                        backgroundColor: "rgba(40, 199, 111, 0.2)",
                        borderColor: "#28C76F",
                        borderWidth: 1,
                        tension: 0.4,
                        pointRadius: 2,
                        pointHoverRadius: 5,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: '#374151',
                        },
                        ticks: {
                          color: '#D1D5DB',
                          stepSize: 50,
                        },
                      },
                    },        
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
