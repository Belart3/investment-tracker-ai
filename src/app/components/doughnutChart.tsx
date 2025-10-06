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
    label: string[];
    labelValue: (string | number)[];
}

const DoughnutChart = (props: Props) => {
    return (
        <div className="h-[500px] flex items-center justify-center">
            {
                props.label && props.labelValue && props.label.length > 0 && props.labelValue.length > 0 ? (
                <Doughnut
                    data={{
                    labels: props.label,
                    datasets: [
                        {
                            data: props.labelValue,
                            backgroundColor: ['#FF638420','#36A2EB20','#FFCE5620','#4BC0C020','#9966FF20','#FF9F4020','#C9CBCE20','#00CD5620','#7848D420','#EC706320'],
                            hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                        },
                    ],
                    }}
                    options={{
                        responsive: true,
                    }}
                />
                ) : 
                <Skeleton variant="circular" width={'80%'} height={'80%'} sx={{bgcolor: '#374151'}} />
            }
            
        </div>
    )
}

export default DoughnutChart