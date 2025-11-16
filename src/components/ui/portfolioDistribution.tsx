import React from 'react'
import TimeFilter from './timeFilter'
import DoughnutChart from './doughnutChart'

type Props = {
    labels: string[];
    labelValue: string[];
}

const portfolioDistribution = (props: Props) => {
    return (
        <div className="bg-[#161B22] rounded-[16px] flex flex-col justify-start border border-[#374151] order-2 ">
            <div className="px-2 py-4 xl:p-5 border-b border-[#374151] flex items-center justify-between">
            <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Distribution</h3>
            <TimeFilter />
            </div>
            <DoughnutChart label={props.labels} labelValue={props.labelValue} />
        </div>
    )
}

export default portfolioDistribution