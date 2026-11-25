import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
    labels: string[];
    labelValue: string[];
}

const AssetAllocations = (props: Props) => {
    const totalValue = props.labelValue.reduce((acc, val) => acc + parseFloat(val), 0);

    return (
        <div className="bg-[var(--bg-surface)] rounded-[8px] flex flex-col justify-start border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] px-4 py-4 xl:p-5 gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-bold tracking-[-0.005em]">Allocation</h3>
                <Link href='/assets' className="text-[var(--text-primary)] text-[14px] leading-[20px] font-semibold tracking-[-0.005em]">
                    View assets
                    <span className="">
                        <ArrowRight className="inline-block ms-1" size={16} />
                    </span>
                </Link>
            </div>
            <div className="flex flex-col gap-4">
                {
                    props.labelValue && props.labels.length > 0 && props.labelValue.length > 0 ? (
                        props.labels.map((label, index) => (
                            <div className="flex flex-col gap-1.5 py-3 border-b last-of-type:border-0 border-[var(--border-subtle)]" key={index}>
                                <div className="flex items-center justify-between">
                                    <p className="text-[var(--text-primary)] text-[16px]/[24px] leading-[19px] font-semibold tracking-[-0.005em]">{label}</p>
                                    <div className="flex items-center gap-5">
                                        <p className="font-mono text-[13px]/[24px] leading-[19px] font-medium tracking-[-0.005em] text-[var(--text-secondary)]">
                                            {
                                                ((parseFloat(props.labelValue[index]) / totalValue) * 100).toFixed(2)
                                            }%
                                        </p>
                                        <p className="font-mono text-[14px]/[24px] text-right leading-[19px] font-medium tracking-[-0.005em] text-[var(--text-primary)]">
                                            ${parseFloat(props.labelValue[index]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
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

export default AssetAllocations