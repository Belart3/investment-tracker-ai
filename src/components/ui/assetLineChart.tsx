import React from 'react'
import { Line } from "react-chartjs-2";
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
ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, BarElement, LogarithmicScale, Title, Filler, Tooltip, Legend);
import TimeFilter from './liveMarketTimeFilter';
import { Skeleton } from '@mui/material';

type Props = {
    label: string[];
    labelValue: (string | number)[]
}

const AssetLineChart = (props: Props) => {
    return (
        <div className="bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] space-y-2 order-3">
            <div className="px-2 py-4 xl:p-5 border-b border-[#374151] flex items-center justify-between">
                <h3 className="text-white text-[16px]/[16px] font-medium">Asset Value History</h3>
                {/* <TimeFilter /> */}
            </div>
            <div className="h-[250px] w-full px-4">
                {
                    props.label && props.labelValue && props.label.length === 0 && props.labelValue.length === 0 ? 
                    <Line
                        data={{
                            labels: props.label,
                            datasets: [
                            {
                                label: '',
                                data: props.labelValue,
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