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
  LogarithmicScale,
} from 'chart.js';
import { useState, useEffect } from "react";
import LiveMarketData from "./components/liveMarketData";
import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import TablePagination from '@mui/material/TablePagination';
import { Check } from "lucide-react";

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
  const [balance, setBalance] = useState<Balance | null>({});
  const [liveData, setLiveData] = useState<MarketDatum[]>([]);
  const [transactionLog, setTransactionLog] = useState<any>(null);
  const [exchangeHistory, setExchangeHistory] = useState<ExchangeHistoryData[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [slice, setSlice] = useState(10);
  const [showConversionFilter, setShowConversionFilter] = useState(false);
  const [filterBy, setFilterBy] = useState('');

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
  const labelValue = balance ? balance.asset?.map((item: any) => item.usdValue) : []
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
        <div className="border-b border-[#374151] bg-[#161B22] py-5 w-[calc(100%-237px)] flex items-center fixed top-0 right-0">
          <LiveMarketData marketData={marketData} />
        </div>
        {/* page header */}
        <div className="border-b border-[#374151] bg-[#161B22] p-5 w-full mt-[62px]">
          <h2 className="text-white font-semibold text-[27px]/[27px] tracking-[-1.62px]">Dashboard</h2>
        </div>
        <div className="px-5 mt-[42px] gap-5">
          <div className="grid grid-cols-6 gap-5 w-full h-fit 2xl:h-[600px]">
            {/* Portfolio Overview */}
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
            {/* portfolio distribution doughnut chart */}
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
            {/* portfolio distribution line chart */}
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
            {/* individual assets bar chart */}
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
            {/* Asset trade information table */}
            <div className="col-span-6 flex flex-col justify-start row-span-2 space-y-2 order-4 bg-[#161B22] border border-[#374151] rounded-[16px]">
              <div className="flex items-center justify-between p-5">
                <h2 className="text-white capitalize">conversion history</h2>
                <div className="flex flex-col bg-[#1F2937] rounded-[12px] relative max-h-[150px]">
                  <button className={`py-1.5 px-3 bg-[#1F2937] text-white flex gap-1 items-center capitalize text-[12px]/[18px] tracking-[-0.48px] cursor-pointer focus:outline-none ${showConversionFilter ? 'rounded-t-[12px]' : 'rounded-[12px]'}`}
                  onClick={() => {
                    setShowConversionFilter(!showConversionFilter)
                  }}
                  >
                    <PiSlidersHorizontalDuotone size={16}/>
                    filter by
                  </button>
                  <div className={`flex-col w-full ${showConversionFilter ? 'flex absolute z-50 right-0 mt-[30px] rounded-b-[12px] overflow-hidden' : 'hidden'}`}>
                    <button className="py-1.5 px-4 bg-[#1F2937] text-white uppercase flex gap-1 items-center justify-between text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151]"
                      onClick={() => {
                        setShowConversionFilter(!showConversionFilter);
                        setFilterBy('')
                      }}
                      >
                        all
                        {
                          filterBy === '' ?
                            <Check color="#28C76F" size={16} />
                          : null
                        }
                    </button>
                    {
                      filterAssets ?
                      filterAssets.map((asset, index) => (
                        <button className="py-1.5 px-4 bg-[#1F2937] text-white flex gap-1 items-center justify-between capitalize text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151]" key={index}
                        onClick={() => {
                          setShowConversionFilter(!showConversionFilter);
                          setFilterBy(asset.fromCoin.toUpperCase())
                        }}
                        >
                          {asset.fromCoin}
                          {
                            asset.fromCoin.toUpperCase() === filterBy ?
                              <Check color="#28C76F" size={16} />
                            : null
                          }
                        </button>
                      ))
                      :
                      <button className="py-1.5 px-4 bg-[#1F2937] text-white uppercase flex gap-1 items-center text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151]"
                        onClick={() => {
                          setShowConversionFilter(!showConversionFilter);
                        }}
                        >
                          n/a
                      </button>
                    }
                  </div>
                </div>
              </div>
              <div className="rounded-[16px] rounded-t-none border border-[#374151] !overflow-hidden bg-[#161B22]">
                <div className="max-h-[600px] overflow-y-scroll">
                  <table className="table-auto w-full">
                  <thead className="sticky top-0 bg-[#161B22] z-10">
                    <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-b border-[#374151]`}>
                        <th className='text-start py-5 ps-5 capitalize'>Date</th>
                        <th className='text-start py-5 capitalize'>exchange from</th>
                        <th className='text-start py-5 capitalize'>exchange pair</th>
                        <th className='text-start py-5 capitalize'>transaction type</th>
                        {/* <th className='text-start py-5 capitalize'>r:r</th> */}
                        <th className='text-start py-5 capitalize'>sell</th>
                        <th className='text-start py-5 capitalize'>buy</th>
                        <th className='text-start py-5 capitalize'>value @ exchange time</th>
                        <th className='text-start py-5 capitalize'>current value of coin</th>
                    </tr>
                  </thead>
                  <tbody className="">
                      {
                          exchangeHistory && exchangeHistory.length > 0 ?
                          exchangeHistory.filter((exchange) => filterBy !== '' ? exchange.fromCoin === filterBy || exchange.toCoin === filterBy : exchange).map((exchange, index) => (
                            <tr key={index} className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151] hover:bg-[#1F2937] cursor-pointer`}>
                                <td className='py-5 capitalize ps-5'>
                                  {new Date(Number(exchange.exchangeTime)).toDateString()}
                                </td>
                                {/* fromCoin: string,
                                toCoin: string,
                                fromAmount: string,
                                toAmount: string,
                                exchangeTime: string,
                                exchangeRate: string, */}
                                <td className='py-5 flex gap-1'>
                                  <span className="uppercase">{exchange.fromCoin}</span>
                                </td>
                                <td className='py-5'>
                                    {exchange.fromCoin.toUpperCase()}/{exchange.toCoin.toUpperCase()}
                                </td>
                                <td className='py-5 uppercase'>
                                  {
                                    exchange.fromCoin === 'USDT' ? 
                                    <span className="text-[#00AC4F]">buy</span> : <span className="text-[#FBBF24]">sell</span>
                                  }
                                </td>
                                {/* <td className='py-5'>
                                    1:{Number(Math.ceil(Number(exchange.exchangeRate) * 100))/100}
                                </td> */}
                                <td className='py-5 '>
                                  {Number(exchange.fromAmount).toFixed(2) + ' ' + exchange.fromCoin}
                                </td>
                                <td className='py-5 '>
                                  {Number(exchange.toAmount).toFixed(2) + ' ' + exchange.toCoin}
                                </td>
                                <td className='py-5 capitalize'>
                                  {
                                    exchange.fromCoin === 'USDT' ? 
                                    '$' + (
                                      Number(exchange.fromAmount)/Number(exchange.toAmount)
                                    ).toFixed(2) + '/' + exchange.toCoin : ''
                                  }
                                </td>
                                <td className='py-5 capitalize'>
                                  {/* Find the current value of the coin in liveData */}
                                  {
                                    (() => {
                                      const market = liveData.find(
                                        (item) => item.symbol.toUpperCase() === exchange.toCoin.toUpperCase() + "USDT"
                                      );
                                      return market
                                        ? (`$${Number(market.latestPrice).toFixed(2)}` + '/' + exchange.toCoin)
                                        : 'N/A';
                                    })()
                                  }
                                </td>
                                {/* <label htmlFor={`check-${index}`} className='absolute top-0 left-0 h-full w-full cursor-pointer' 
                                onClick={() => {
                                    const newId = index;
                                    if (selectedId === newId) {
                                        setChecked(!checked); 
                                    } else {
                                        setChecked(true); 
                                    }
                                    setSelectedId(newId);
                                }}></label> */}
                            </tr> 
                          ))
                          : 
                          <tr className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151]`}>
                              <td className='w-[200px] px-5' colSpan={6}>
                                  <div className="h-full w-full flex items-center justify-center p-5">
                                      <p className="capitalize text-white text-[16px]/[24px] font-medium">
                                          no data to display
                                      </p>
                                  </div>
                              </td>
                          </tr> 
                      }
                  </tbody>
                  <tfoot>
                    <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-t border-[#374151]`}>
                      <TablePagination
                        className={`!text-white`}
                        color="white"
                        count={exchangeHistory.length}
                        page={0}
                        rowsPerPage={10}
                        onPageChange={() => {}}
                        onRowsPerPageChange={(e) => {
                          setSlice(Number(e.target.value))
                        }}
                        rowsPerPageOptions={[10,20,30,50,100]}
                      />
                    </tr>
                  </tfoot>
                  </table>
                </div>
              </div>     
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
