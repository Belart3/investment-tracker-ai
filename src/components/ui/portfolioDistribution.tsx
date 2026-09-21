import React from 'react'
import DoughnutChart from './doughnutChart'

type Props = {
    labels: string[];
    labelValue: string[];
}

const portfolioDistribution = (props: Props) => {
    return (
        <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] px-4 pt-4 xl:p-5 ">
            <div className="flex items-center justify-between">
                <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-semibold tracking-[-0.005em]">Portfolio Distribution</h3>
            </div>
            {
                props.labelValue && props.labels.length > 0 && props.labelValue.length > 0 ? (
                    <DoughnutChart label={props.labels} labelValue={props.labelValue} />
                ) : (
                    <div className="p-4 text-center text-[var(--text-secondary)]">
                        No data available for portfolio distribution.
                    </div>
                )
            }
        </div>
    )
}

export default portfolioDistribution