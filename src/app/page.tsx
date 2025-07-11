"use client";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  LogarithmicScale
} from 'chart.js';
import { useState, useEffect } from "react";
import LiveMarketData from "./components/liveMarketData";

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, BarElement, LogarithmicScale, Title, Filler, Tooltip, Legend);

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
  const [transactionLog, setTransactionLog] = useState<any>(null);

  useEffect(() => {
    async function loadBalance() {
      const res = await fetch('/api/balance');
      const data = await res.json();

      setBalance(data || null); 
      //console.log('Balance data set:', data || null);
    }

    async function loadMarketData() {
      const res = await fetch('/api/liveMarketData');
      const marketData = await res.json();

      setLiveData(marketData || null); 
      //console.log('Market data loaded:', marketData || null);
     // console.log('Live symbol:', liveData);
    }

    async function loadTransactionLog() {
      const res = await fetch('/api/transactionLog');
      const transactionLog = await res.json();

      setTransactionLog(transactionLog || null);
      //console.log('Transaction Log:', transactionLog);
    }

    loadBalance();
    loadMarketData();
    loadTransactionLog(); 
  }, []);
  
  //wallet balance
  const cumRealisedPnl = balance?.asset?.[0]?.cumRealisedPnl || 0;
  const labels = balance ? balance.asset?.map((item: any) => item.coin) : []
  const labelValue = balance ? balance.asset?.map((item: any) => item.usdValue) : []
  const totalBalance = balance ? balance.asset?.reduce((acc: number, item: any) => acc + parseFloat(item.usdValue || '0'), 0).toFixed(2) : 0;

  const marketData = liveData 

  return (
    <div className="ms-[237px] ">
      <div className="flex flex-col">
        <div className="border-b border-[#374151] bg-[#161B22] p-5 w-full flex items-center">
          <LiveMarketData marketData={marketData} />
        </div>
        <div className="border-b border-[#374151] bg-[#161B22] p-5 w-full">
          <h2 className="text-white font-semibold text-[27px]/[27px] tracking-[-1.62px]">Dashboard</h2>
        </div>
        <div className="px-5 mt-[42px] gap-5">
          <div className="grid grid-cols-6 grid-rows-3 gap-5 w-full h-fit 2xl:h-[600px]">
            <div className=" bg-[#161B22] rounded-[16px] flex flex-col justify-center col-span-2 row-span-1 border border-[#374151] ">
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
                      '$' + totalBalance
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
            <div className="col-span-2 bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] row-span-3 order-2 ">
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
                        backgroundColor: ['#FF638420','#36A2EB20','#FFCE5620','#4BC0C020','#9966FF20','#FF9F4020','#C9CBCE20','#00CD5620','#7848D420','#EC706320'],
                        hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                  }}
                />
              </div>
            </div>
            <div className="col-span-2 bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] row-span-2 space-y-2 order-3">
              <div className="p-4 border-b border-[#374151] flex items-center justify-between">
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
              <div className="h-[300px] w-full px-4">
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
            <div className="col-span-2 bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] row-span-2 space-y-2 order-4">
              <div className="p-4 border-b border-[#374151] flex items-center justify-between">
                <h3 className="text-white text-[16px]/[16px] font-medium">Individual Asset Value ($)</h3>
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
              <div className="h-[300px] w-full px-4">
                <Bar 
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        label: 'USD Value',
                        data: labelValue,
                        backgroundColor: ['#FF638420','#36A2EB20','#FFCE5620','#4BC0C020','#9966FF20','#FF9F4020','#C9CBCE20','#00CD5620','#7848D420','#EC706320'],
                        hoverBackgroundColor: ['#FF638480','#36A2EB80','#FFCE5680','#4BC0C080','#9966FF80','#FF9F4080','#C9CBCE80','#00CD5680','#7848D480','#EC706380'],
                        borderColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                        borderWidth: 1,
                        borderRadius: 100,
                        borderSkipped: false,
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
                        ticks: {
                          color: '#9E9E9E',
                          font: {
                            size: 12,
                          }
                        },
                      },
                      y: {
                        type: 'logarithmic',
                        grid: {
                          color: '#374151',
                        },
                        ticks: {
                          color: '#9E9E9E',
                          font: {
                            size: 12,
                          }
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
