import React from 'react'
import { Line } from "react-chartjs-2";
import { Skeleton } from '@mui/material';
import { IoTriangleSharp } from 'react-icons/io5';
import { usePortfolioHistory, PortfolioHistoryPoint } from '@/hooks/usePortfolioHistory';

type Props = {
}

const AssetLineChart = (props: Props) => {
    const { data: portfolioHistory, loading: portfolioHistoryLoading } = usePortfolioHistory(30);
    const label = portfolioHistory.map((point: PortfolioHistoryPoint) => point.date);
    console.log('portfolioHistory:', portfolioHistory);
    const labelValue = portfolioHistory.map((point: PortfolioHistoryPoint) => point.value);
    return (
        <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] space-y-2 px-4 py-4 xl:p-5 ">
            <div className="flex flex-col gap-2 items-start justify-start">
                <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-semibold tracking-[-0.005em]">Net Worth</h3>
                <p className="text-[46px]/[48px] font-semibold font-mono tabular-nums text-(--text-primary) tracking-[-0.005em]">
                    ${
                        labelValue && labelValue.length > 0 ? (labelValue[labelValue.length - 1]) : <Skeleton variant="text" width={100} />
                    }
                </p>
                <p className="text-[13px]/[24px] font-semibold font-mono">
                    <IoTriangleSharp className={`inline-block text-[var(--text-success)] mr-1`} size={8} /> 
                    <span className="">
                        +$1,234.70
                    </span> <span className="text-[var(--text-success)] text-[13px] font-medium">
                        ({
                            labelValue && labelValue.length > 0 ? (
                                labelValue[labelValue.length - 1] && labelValue[0] ? 
                                (
                                    ((labelValue[labelValue.length - 1] - labelValue[0]) / labelValue[0]) * 100
                                ) : 0
                            ) : <Skeleton variant="text" width={50} />
                        }%)
                    </span> over <span className="">
                        90 days
                    </span>
                </p>
            </div>
            <div className="h-[250px] w-full px-4">
                {
                    !portfolioHistoryLoading && label.length > 0 && labelValue.length > 0 ?
                    <Line
                        data={{
                            labels: portfolioHistory.map((point: PortfolioHistoryPoint) => point.date),
                            datasets: [
                                {
                                    data: portfolioHistory.map((point: PortfolioHistoryPoint) => point.value),
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