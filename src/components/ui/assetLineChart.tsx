import React from 'react'
import { Line } from "react-chartjs-2";
import { Skeleton } from '@mui/material';

type Props = {
    label: string[];
    labelValue: (string | number)[];
    loading?: boolean;
}

const AssetLineChart = (props: Props) => {
    return (
        <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] space-y-2 order-3 px-4 py-4 xl:p-5 ">
            <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-semibold tracking-[-0.005em]">Net Worth</h3>
            <div className="h-[350px] w-full px-4">
                {
                    !props.loading && props.label.length > 0 && props.labelValue.length > 0 ?
                    <Line
                        data={{
                            labels: [1,2,3,4,5,6,7,8,9,10],
                            datasets: [
                                {
                                    label: '',
                                    data: [20,100,90,98,99,40,99,9],
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
                                grid: {
                                display: false,
                                },
                            },
                            y: {
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
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} sx={{bgcolor: '#374151'}} />
                    </div>    
                }
                
            </div>
        </div>
    )
}

export default AssetLineChart