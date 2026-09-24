import React, { useState } from 'react'
import { Line } from "react-chartjs-2";
import { Skeleton } from '@mui/material';
import { IoTriangleSharp } from 'react-icons/io5';
import { usePortfolioHistory, PortfolioHistoryPoint } from '@/hooks/usePortfolioHistory';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'

type Props = {
}

const AssetLineChart = (props: Props) => {
    const [days, setDays] = useState(30);
    const { data: portfolioHistory, loading: portfolioHistoryLoading } = usePortfolioHistory(days);
    const historyDates = portfolioHistory.map((point: PortfolioHistoryPoint) => point.date);
    const historyValue = portfolioHistory.map((point: PortfolioHistoryPoint) => point.value);
    const currentValue = historyValue.length > 0 ? historyValue[historyValue.length - 1] : 0;
    const historyChange = historyValue.length > 1 ? historyValue[historyValue.length - 1] - historyValue[0] : 0;
    const historyChangePercent = historyValue.length > 1 ? (historyChange / historyValue[0]) * 100 : 0;

    const timeRanges = [
        { label: '7D', value: 7 },
        { label: '30D', value: 30 },
        { label: '90D', value: 90 },
        { label: '1Y', value: 365 },
    ];
    return (
        <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] space-y-2 px-4 py-4 xl:p-5 ">
            <div className="flex flex-col gap-3 lg:flex-row w-full items-start lg:items-center lg:justify-between">
                <div className="flex flex-col items-start justify-start">
                    <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-semibold tracking-[-0.005em]">Net Worth</h3>
                        {
                            currentValue ? 
                            <NumberFlow 
                                format={{ style: 'currency', currency: 'USD', trailingZeroDisplay: 'stripIfInteger' }} 
                                value={currentValue} 
                                className="text-[46px]/[48px] font-semibold font-mono tabular-nums text-[var(--text-primary)] tracking-[-0.005em]" 
                            />
                            : <Skeleton variant="text" width={100} />
                        }
                    {
                        historyChange && historyChangePercent ? (
                            <p className="text-[16px]/[24px] font-semibold font-mono capitalize">
                                {
                                    historyChange && historyChange > 0 && 
                                        <IoTriangleSharp className={`inline-block ease-linear duration-200 ${historyChange > 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)] rotate-180'} mr-1`} size={8} /> 
                                }
                                    <NumberFlowGroup>
                                        <NumberFlow 
                                            format={{
                                                style: 'currency',
                                                currency: 'USD',
                                                trailingZeroDisplay: 'stripIfInteger',
                                                signDisplay: 'exceptZero'
                                            }}
                                            className={`${historyChange > 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'} text-[16px]/[24px] font-medium mx-1 p-0`} 
                                            value={Number(historyChange.toFixed(2))} 
                                        /> 
                                        <NumberFlow 
                                            className={`${historyChange > 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'} text-[16px]/[24px] font-medium mx-1 p-0`}
                                            value={Number(historyChangePercent/100)}
                                            locales="en-US"
                                            format={{
                                                style: 'percent',
                                                minimumFractionDigits: 1,
                                                maximumFractionDigits: 2,
                                                signDisplay: 'exceptZero'
                                            }}
                                        />
                                        over
                                        <NumberFlow 
                                        className='mx-1'
                                            value={days}
                                        />
                                        days
                                    </NumberFlowGroup>
                            </p>
                        ) : <Skeleton variant="text" width={150} height={20} />
                    }
                </div>
                <div className="flex gap-2 items-center justify-center">
                    {timeRanges.map((range) => (
                        <button
                            key={range.value}
                            onClick={() => setDays(range.value)}
                            className={`px-4 py-px rounded-[8px] h-9 border border-[var(--border-strong)] text-[13px] bg-[var(--bg-surface)] font-semibold cursor-pointer ${days === range.value ? 'bg-[var(--brand)] text-[var(--bg-surface)]' : 'bg-[var(--bg-surface)] text-[var(--text-secondary)]'}`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="h-[250px] w-full px-4">
                {
                    !portfolioHistoryLoading && historyDates.length > 0 && historyValue.length > 0 ?
                    <Line
                        data={{
                            labels: historyDates,
                            datasets: [
                                {
                                    data: historyValue.map((value: number) => value.toFixed(2)),
                                    fill: true,
                                    backgroundColor: (context) => {
                                        const { ctx, chartArea } = context.chart;
                                        if (!chartArea) return ; 
                                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                                        gradient.addColorStop(0, '#374b7890');
                                        gradient.addColorStop(1, '#2c3e6305');
                                        return gradient;
                                    },
                                    borderColor: "#2c3e63",
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointRadius: 2,
                                    pointHoverRadius: 5,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            interaction: {
                                mode: 'index',       
                                intersect: false,   
                                axis: 'x'            
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                            scales: {
                            x: {
                                display: false,
                                grid: {
                                    display: false,
                                },
                            },
                            y: {
                                display: false,
                                type: 'linear',
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                color: '#6F675D',
                                },
                            },
                            },        
                        }}
                    /> :
                    <div className='h-full w-full flex items-center justify-center p-2'>
                        <Skeleton className='bg-(--bg-canvas)' variant="rectangular" width={'100%'} height={'100%'} />
                    </div>    
                }
                
            </div>
        </div>
    )
}

export default AssetLineChart