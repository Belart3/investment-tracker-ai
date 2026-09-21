import React from 'react'

type Props = {
    labels: string[];
    labelValue: string[];
}

const AllocationsVsTarget = (props: Props) => {
    return (
        <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] px-4 py-4 xl:p-5 gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-semibold tracking-[-0.005em]">Price Targets</h3>
            </div>
            <div className="flex flex-col gap-4">
                {
                    props.labelValue && props.labels.length > 0 && props.labelValue.length > 0 ? (
                        props.labels.map((label, index) => (
                            <div className="flex flex-col gap-1.5" key={index}>
                                <div className="flex items-center justify-between">
                                    <p className="text-[var(--text-primary)] text-[16px]/[24px] leading-[19px] font-semibold tracking-[-0.005em]">{label}</p>
                                    <p className="font-mono text-[13px]/[24px] leading-[19px] font-medium tracking-[-0.005em]">
                                        <span className="text-(--text-primary) ">{Number(props.labelValue[index]).toFixed(2)}</span> / <span className="text-(--text-tertiary)"> 100% target</span>
                                    </p>
                                </div>
                                <div className="w-full h-2 rounded-2xl bg-[var(--bg-surface-2)]"></div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[var(--text-secondary)] text-[14px] leading-[20px]">No data available</p>
                    )
                }
            </div>
        </div>
    )
}

export default AllocationsVsTarget