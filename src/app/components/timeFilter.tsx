import React from 'react'

type Props = {}

const TimeFilter = (props: Props) => {
    return (
        <div className="flex rounded-[8px] bg-[#161B22] border border-[#374151]">
            <button className="p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer">
                7d
            </button>
        </div>
    )
}

export default TimeFilter