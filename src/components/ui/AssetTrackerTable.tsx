import React from 'react'

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
}

const AssetTrackerTable = (props: Props) => {
    return (
        <div className="max-h-[600px] overflow-y-scroll  border border-(--border-subtle) bg-(--bg-surface) rounded-2xl shadow-(--shadow-card) pb-10">
            <table className="table-auto w-full">
                <thead className="sticky top-0  z-10">
                    <tr className="bg-(--bg-surface-2) border-b border-(--border-subtle) hover:bg-(--bg-surface) ease-in duration-200 cursor-pointer">
                        <th className='text-left text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Asset</th>
                        <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Live Qty</th>
                        <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Avg Cost</th>
                        <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Price</th>
                        <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Invested</th>
                        <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Value</th>
                        <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Pnl</th>
                        <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-(--border-subtle) hover:bg-(--bg-surface-2) ease-in duration-200 cursor-pointer" onClick={() => props.setIsAddAssetModalOpen(true)}>
                        {/* Asset Name */}
                        <td className='text-left text-[13px]/[16px] font-semibold trackng-[1px] text-(--text-primary) py-3 px-4'>Asset Name</td>
                        {/* Live Qty */}
                        <td className='text-right text-[13px]/[16px] font-mono font-semibold trackng-[1px] text-(--text-primary) py-3 px-4'>10.00</td>
                        {/* Avg Cost */}
                        <td className='text-right text-[13px]/[16px] font-mono font-semibold trackng-[1px] text-(--text-primary) py-3 px-4'>$10.00</td>
                        {/* Price */}
                        <td className='text-right text-[13px]/[16px] font-mono font-semibold trackng-[1px] text-(--text-primary) py-3 px-4'>$10.00</td>
                        {/* Invested */}
                        <td className='text-right text-[13px]/[16px] font-mono font-semibold trackng-[1px] text-(--text-primary) py-3 px-4'>$10.00</td>
                        {/* Value */}
                        <td className='text-right text-[13px]/[16px] font-mono font-semibold trackng-[1px] text-(--text-primary) py-3 px-4'>$10.00</td>
                        {/* Pnl */}
                        <td className='text-right text-[13px]/[16px] font-mono font-semibold trackng-[1px] text-(--positive) py-3 px-4'>+$10.00</td>
                        {/* Updated */}
                        <td className='text-right text-[13px]/[16px] font-mono font-semibold trackng-[1px] text-(--text-primary) py-3 px-4'>10:00 AM</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AssetTrackerTable