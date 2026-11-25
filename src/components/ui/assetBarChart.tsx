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
        <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] space-y-2 w-full">
            <div className="px-4 py-4 xl:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-semibold tracking-[-0.005em]">Individual Asset Value ($)</h3>
            </div>
            <div className="w-full px-4">
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
                            maintainAspectRatio: false,
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
                                    color: '#6F675D',
                                    font: {
                                    size: 12,
                                    }
                                },
                                },
                                y: {
                                type: 'logarithmic',
                                grid: {
                                    color: '#E8E3DB',
                                    display: false,
                                },
                                ticks: {
                                    color: '#6F675D',
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