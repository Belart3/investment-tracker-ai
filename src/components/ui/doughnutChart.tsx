import React from 'react'
import { Doughnut } from "react-chartjs-2";
import Skeleton from '@mui/material/Skeleton';
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
    assetCoins: string[];
    value: number[];
    loading: boolean;
}

const DoughnutChart = (props: Props) => {
    return (
        <div className="h-[300px] md:h-100 xl:h-[500px] flex items-center justify-center p-5">
            {
                !props.loading && props.assetCoins.length > 0 ? (
                <Doughnut
                    data={{
                    labels: props.assetCoins,
                    datasets: [
                        {
                            data: props.value,
                            backgroundColor: ['#FF638490','#36A2EB90','#FFCE5690','#4BC0C090','#9966FF90','#FF9F4090','#C9CBCE90','#00CD5690','#7848D490','#EC706390'],
                            hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                        },
                    ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
                ) : 
                <Skeleton variant="circular" width={'80%'} height={'80%'} sx={{bgcolor: '#374151'}} />
            }
            
        </div>
    )
}

export default DoughnutChart