"use client";
import { useState } from "react";
import PortfolioDistribution from "../ui/portfolioDistribution";
import AssetLineChart from "../ui/assetLineChart";
import { Skeleton } from "@mui/material";
import { useWalletBalance, type WalletAsset } from "@/hooks/useWalletBalance";
import { useExchangeHistory } from "@/hooks/useExchangeHistory";
import RecentActivity from "../ui/RecentActivity";
import LogDebtButton from "../ui/LogDebtButton";
import AddTransactionButton from "../ui/AddTransactionButton";
import AssetAllocations from "../ui/AllocationsVsTarget";
import { useAssetData } from "@/hooks/useAssetData";
import { IoTriangleSharp } from 'react-icons/io5';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { usePortfolioHistory, PortfolioHistoryPoint } from "@/hooks/usePortfolioHistory";

type user = {
  name?: string;
  email?: string;
  _id?: string;
}

type Props = { 
  user?: user | null 
};

export default function Home({ user }: Props) {
  const {balance:balance, loading:walletLoading, error:walletError} = useWalletBalance();
  const { assets: manualAssets, loading: manualAssetsLoading, error: manualAssetsError } = useAssetData();  
  const {exchangeHistory: exchangeHistoryData, loading: exchangeHistoryLoading, error: exchangeHistoryError} = useExchangeHistory();

  const addedAssets = manualAssets;
  const liveAddedAssets = addedAssets.filter(asset => asset.status === 'live');
  const closedAddedAssets = addedAssets.filter(asset => asset.status === 'closed');
  const deletedAddedAssets = addedAssets.filter(asset => asset.status === 'deleted');
  const totalAddedAssetsValue = liveAddedAssets.reduce((acc, asset) => acc + (asset.purchasePrice * asset.quantity), 0);
  const exchangeAssets = balance?.asset || [];
  const totalExchangeAssetsValue = exchangeAssets.reduce((acc, asset) => acc + parseFloat(asset.usdValue || '0'), 0);
  const totalAssetsValue = walletLoading ? 0 : totalAddedAssetsValue + totalExchangeAssetsValue;
  const balExists = balance && Object.keys(balance).length > 0 && exchangeAssets.length > 0;
  const labels = balExists ? exchangeAssets.map((item: WalletAsset) => item.coin) : [];
  const labelValue: string[] = balExists ? exchangeAssets.map((item: typeof exchangeAssets[number]) => item.usdValue) : [];
  
  const [days, setDays] = useState(30);
  const { data: portfolioHistory, loading: portfolioHistoryLoading } = usePortfolioHistory(days);
  const historyDates = portfolioHistory.map((point: PortfolioHistoryPoint) => point.date);
  const historyValues = portfolioHistory.map((point: PortfolioHistoryPoint) => point.value);
  const currentValue = historyValues.length > 0 ? historyValues[historyValues.length - 1] : 0;
  const historyChange = historyValues.length > 1 ? historyValues[historyValues.length - 1] - historyValues[0] : 0;
  const historyChangePercent = historyValues.length > 1 ? (historyChange / historyValues[0]) * 100 : 0;

  const timeRanges = [
    { label: '7D', value: 7 },
    { label: '30D', value: 30 },
    { label: '90D', value: 90 },
    { label: '1Y', value: 365 },
  ];


  interface User {
    name: string;
    email: string;
  }

  return (
    <div className={`xl:ms-[237px] transition-all duration-300 min-h-screen bg-[var(--bg-canvas)] p-8`}>
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-(--text-primary) font-semibold text-[22px] leading-7 tracking-[-0.012em]">
              Good evening, {user ? user.name : <Skeleton variant="text" width={100} />}
            </h2>
            {balExists &&
              <p className="text-[var(--text-secondary)] font-medium text-[13px] leading-[19px]">
                  Here's where you stand today · prices updated 2 min ago
              </p>}
          </div>
          <div className="flex gap-3">
            <LogDebtButton setShowAddDebtModal={() => {}} />
            <AddTransactionButton setIsAddAssetModalOpen={() => {}} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="mt-8 flex flex-col gap-5">
            <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] space-y-2 px-4 py-4 xl:p-5 ">
              <div className="flex flex-col gap-3 sm:flex-row w-full items-start sm:items-center sm:justify-between">
                  <div className="flex flex-col items-start justify-start">
                      <h3 className="text-[var(--text-secondary)] text-[12px] leading-[25px] font-semibold tracking-[-0.005em]">Net Worth</h3>
                      {
                          currentValue ? 
                          <NumberFlow 
                              format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }} 
                              value={currentValue} 
                              className="text-[44px]/[48px] font-semibold font-mono tabular-nums text-[var(--text-primary)] tracking-[-0.005em]" 
                          />
                          : <Skeleton variant="text" width={100} />
                      }
                      {
                          historyChange && historyChangePercent ? (
                              <div className={`flex items-center justify-start gap-2`}>
                                  <div className={`rounded-full px-2 mt-1 ${historyChange > 0 ? 'bg-[var(--positive-muted)]' : 'bg-[var(--negative-muted)]'}`}>
                                      <p className="text-[12px] font-semibold font-mono capitalize">
                                          {
                                              historyChange && 
                                              <IoTriangleSharp className={`inline-block ease-linear duration-200 ${historyChange > 0 ? 'text-[var(--positive)] translate-y-[-25%]' : 'text-[var(--negative)] rotate-180'} mr-1`} size={10} /> 
                                          }
                                          <NumberFlowGroup>
                                              <NumberFlow 
                                                  format={{
                                                      style: 'currency',
                                                      currency: 'USD',
                                                      trailingZeroDisplay: 'stripIfInteger',
                                                      signDisplay: 'never',
                                                  }}
                                                  className={`${historyChange > 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'} text-[12px]  font-medium mx-1 p-0`} 
                                                  value={Number(historyChange.toFixed(2))} 
                                              /> 
  
                                              <span className={`${historyChange > 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'} text-[12px] font-medium mx-1 p-0`}>·</span>
  
                                              <NumberFlow 
                                                  className={`${historyChange > 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'} text-[12px] font-medium mx-1 p-0`}
                                                  value={Number(historyChangePercent/100)}
                                                  locales="en-US"
                                                  format={{
                                                      style: 'percent',
                                                      minimumFractionDigits: 1,
                                                      maximumFractionDigits: 2,
                                                      signDisplay: "never"
                                                  }}
                                              />
                                          </NumberFlowGroup>
                                      </p>
                                  </div>
                                  <p className="text-[12px] text-(--text-secondary) font-semibold font-mono capitalize">
                                      past
                                      <NumberFlow 
                                      className='mx-1'
                                          value={days}
                                      />
                                      days
                                  </p>
                              </div>
                          ) : <Skeleton variant="text" width={150} height={20} />
                      }
                  </div>
                  <div className="flex gap-[2px] items-center justify-center bg-[#FBF9F5] rounded-[8px] p-[3px] border border-[#E7E1D7]">
                      {timeRanges.map((range) => (
                          <button
                              key={range.value}
                              onClick={() => setDays(range.value)}
                              className={`px-4 py-px rounded-[8px] h-9 text-[13px] bg-[var(--bg-surface)] font-semibold cursor-pointer ${days === range.value ? 'bg-[var(--brand)] text-[var(--bg-surface)]' : 'bg-transparent text-[var(--text-secondary)]'}`}
                          >
                              {range.label}
                          </button>
                      ))}
                  </div>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {
                      [1,2,3,4].map((item) => (
                          <div className="flex flex-col items-start justify-start rounded-[10px] bg-transparent py-3 px-4 border border-[#F0EBE3]">
                              <p className="text-[var(--text-secondary)] text-[12px] leading-[25px] font-semibold tracking-[-0.005em]">
                                  Crypto Assets
                              </p>
                              {
                                  totalAssetsValue !== undefined ?
                                  <NumberFlow 
                                      className={`text-[16px] font-semibold font-mono tabular-nums text-[var(--text-primary)] tracking-[-0.005em]`} 
                                      value={totalAssetsValue}
                                      format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}  
                                  />
                                  : <Skeleton variant="text" width={150} height={20} />
                              }
                              {
                                walletLoading ? <Skeleton variant="text" width={100} height={20} /> :
                                <p className="text-[var(--text-secondary)] text-[12px] leading-[25px] font-semibold tracking-[-0.005em]">
                                  <NumberFlowGroup>
                                      <span className="me-1">Manual</span>
                                      <NumberFlow 
                                          className={``}
                                          value={totalAddedAssetsValue}
                                          format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}  
                                      />
                                      <span className={`mx-1`}>·</span>
                                      <span className="me-1">Bybit</span>
                                      <NumberFlow 
                                          className={``}
                                          value={totalExchangeAssetsValue}
                                          format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }}  
                                      />
                                  </NumberFlowGroup>
                                </p>
                              }
                          </div>
                      ))
                  }
              </div>
              <AssetLineChart historyDates={historyDates} historyValues={historyValues} timeRange={days} /> 
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              <AssetAllocations labels={labels} labelValue={labelValue} />
              <PortfolioDistribution labels={labels} labelValue={labelValue} />
            </div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
