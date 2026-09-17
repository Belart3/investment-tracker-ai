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
        <div className="flex items-center justify-center p-5">
            {
                props.label && props.labelValue && props.label.length > 0 && props.labelValue.length > 0 ? (
                <Doughnut
                    data={{
                    labels: props.label,
                    datasets: [
                        {
                            data: props.labelValue,
                            backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                            hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                        },
                    ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        circumference: 180,
                        rotation: -90,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    boxWidth: 12,
                                    boxHeight: 12,
                                    padding: 20,
                                    font: {
                                        size: 12,
                                    },
                                },
                            },
                        },
                    }}
                />
                ) : 
                <Skeleton variant="circular" width={'80%'} height={'80%'} sx={{bgcolor: '#374151'}} />
            }
            
        </div>
    )
}

export default DoughnutChart