import React from 'react'
import TimeFilter from './liveMarketTimeFilter'
import { Bar } from "react-chartjs-2";
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';
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

type Props = {
    labels: string[];
    labelValue: (string | number)[]
}

const AssetBarChart = (props: Props) => {
    return (
        <div className="bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151]  space-y-2 order-4 w-full">
            <div className="px-2 py-4 xl:p-5 border-b border-[#374151] flex items-center justify-between">
                <h3 className="text-white text-[16px]/[16px] font-medium">Individual Asset Value ($)</h3>
                {/* <TimeFilter/> */}
            </div>
            <div className="h-[300px] w-full px-4">
                {
                    props.labels && props.labelValue && props.labels.length > 0 && props.labelValue.length > 0 ? (
                        <Bar 
                            data={{
                            labels: props.labels,
                            datasets: [
                                {
                                label: 'USDT Value',
                                data: props.labelValue,
                                backgroundColor: ['#FF638420','#36A2EB20','#FFCE5620','#4BC0C020','#9966FF20','#FF9F4020','#C9CBCE20','#00CD5620','#7848D420','#EC706320'],
                                hoverBackgroundColor: ['#FF638480','#36A2EB80','#FFCE5680','#4BC0C080','#9966FF80','#FF9F4080','#C9CBCE80','#00CD5680','#7848D480','#EC706380'],
                                borderColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                                borderWidth: 1,
                                borderRadius: 0,
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
                    ) : 
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: '100%', justifyContent: 'center' }}>
                        <Skeleton variant="rectangular" width={40} height={'40%'} sx={{bgcolor: '#374151'}} />
                        <Skeleton variant="rectangular" width={40} height={'80%'} sx={{bgcolor: '#374151'}} />
                        <Skeleton variant="rectangular" width={40} height={'50%'} sx={{bgcolor: '#374151'}} />
                        <Skeleton variant="rectangular" width={40} height={'70%'} sx={{bgcolor: '#374151'}} />
                        <Skeleton variant="rectangular" width={40} height={'30%'} sx={{bgcolor: '#374151'}} />
                        <Skeleton variant="rectangular" width={40} height={'85%'} sx={{bgcolor: '#374151'}} />
                    </Box>
                }
            </div>
        </div>
    )
}

export default AssetBarChart