import React, { useState } from 'react'
import { Line } from "react-chartjs-2";
import { Skeleton } from '@mui/material';
import { usePortfolioHistory, PortfolioHistoryPoint } from '@/hooks/usePortfolioHistory';

type Props = {
    historyDates?: string[];
    historyValues?: number[];
    timeRange: number;
}

const AssetLineChart = (props: Props) => {
    const [days, setDays] = useState(props.timeRange);
    const { data: portfolioHistory, loading: portfolioHistoryLoading } = usePortfolioHistory(days);
    const historyDates = portfolioHistory.map((point: PortfolioHistoryPoint) => point.date);
    const historyValues = portfolioHistory.map((point: PortfolioHistoryPoint) => point.value);


    return (
        <div className="h-[250px] w-full mt-15">
            {
                !portfolioHistoryLoading && historyDates.length > 0 && historyValues.length > 0 ?
                <Line
                    data={{
                        labels: historyDates,
                        datasets: [
                            {
                                data: historyValues.map((value: number) => Number(value.toFixed(2))),
                                fill: true,
                                backgroundColor: (context) => {
                                    const { ctx, chartArea } = context.chart;
                                    if (!chartArea) return; 
                                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                                    gradient.addColorStop(0, '#374b7890');
                                    gradient.addColorStop(1, '#2c3e6305');
                                    return gradient;
                                },
                                borderColor: "#2c3e63",
                                borderWidth: 2,
                                tension: 0,
                                pointRadius: 0,
                                pointHoverRadius: 0,
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
                                display: true,
                                grid: {
                                    display: false,
                                },
                                border: {
                                    display: false 
                                },
                                ticks: {
                                    display: true,
                                    maxTicksLimit: 7,
                                    maxRotation: 0,
                                    minRotation: 0,
                                    color: '#6B635A',
                                    font: {
                                        size: 12,
                                        family: 'monospace',
                                        weight: 'bold',
                                    },
                                    callback: function(val, index) {
                                        const rawDateStr = this.getLabelForValue(Number(val)); 
                                        const date = new Date(rawDateStr);
                                        if (isNaN(date.getTime())) return rawDateStr;
                                        return date.toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric' 
                                        });
                                    }
                                },
                            },
                            y: {
                                type: 'linear', 
                                display: true, 
                                border: {
                                    display: false 
                                },
                                grid: {
                                    display: true,
                                    color: 'rgba(231, 225, 215, 0.6)', 
                                },
                                ticks: {
                                    display: false,
                                    maxTicksLimit: 6 ,
                                    color: '#6B635A',
                                    font: {
                                        size: 12,
                                        family: 'monospace',
                                        weight: 'bold'
                                    },
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
    )
}

export default AssetLineChart