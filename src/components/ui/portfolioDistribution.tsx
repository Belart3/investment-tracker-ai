import React from 'react'
import TimeFilter from './liveMarketTimeFilter'
import DoughnutChart from './doughnutChart'

type Props = {
    labels: string[];
    labelValue: string[];
}

const portfolioDistribution = (props: Props) => {
    return (
        <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] order-2">
            <div className="px-4 py-4 xl:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-semibold tracking-[-0.005em]">Portfolio Distribution</h3>
            {/* <TimeFilter /> */}
            </div>
            <DoughnutChart label={props.labels} labelValue={props.labelValue} />
        </div>
    )
}

export default portfolioDistribution