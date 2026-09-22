import React, { act, useState } from 'react'
import { AssetData } from '@/hooks/useAssetData';

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
    assets: AssetData[]; 
    totalValue: number;
    totalPnl: number;
    assetNumber: number;
    totalROI: number;
    status?: "live" | "closed" | "deleted";
}

const AssetTrackerTable = (props: Props) => {
    const { assets, totalValue, totalPnl, assetNumber, totalROI, status } = props;
    const filters = [
        { name: 'live assets', value: 'live' },
        { name: 'closed assets', value: 'closed' },
        { name: 'deleted assets', value: 'deleted' },
    ];
    const [activeFilter, setActiveFilter] = useState('live');
    const filteredAssets = assets.filter(asset => asset.status === activeFilter);

    return (
        <div className="">
            <div className="flex items-center justify-center mt-8 mb-5 w-fit gap-6">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => {
                            setActiveFilter(filter.value)
                        }}
                        className={`flex items-center justify-center outline-none ${activeFilter === filter.value ? "border-b-2 border-(--brand)" : "border-b-2 border-transparent"}  px-1 py-0.5 bg-transparent cursor-pointer text-[13px] text-(--text-primary) capitalize ease-linear duration-150 font-semibold tracking-[-0.56px]`}
                    >
                        {filter.name}
                    </button>
                ))}
            </div>
            <div className="max-h-[600px] overflow-y-scroll  border border-(--border-subtle) bg-(--bg-surface) rounded-2xl shadow-(--shadow-card)">
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
                        {
                            filteredAssets.length > 0 ? (
                                filteredAssets.map((asset) => (
                                    <tr key={asset._id} className="border-b last-of-type:border-0 border-(--border-subtle) hover:bg-(--bg-surface) ease-in duration-200 cursor-pointer">
                                        <td className='text-left text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>{asset.symbol}</td>
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>{asset.quantity}</td>
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>${asset.purchasePrice.toFixed(2)}</td>
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>${(asset.purchasePrice * 1.1).toFixed(2)}</td>
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>${(asset.purchasePrice * asset.quantity).toFixed(2)}</td>
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>${(asset.purchasePrice * asset.quantity * 1.1).toFixed(2)}</td>
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>${(asset.purchasePrice * asset.quantity * 0.1).toFixed(2)}</td>
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>{new Date(asset.updatedAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) :
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-[13px] font-normal text-(--text-secondary)">
                                    No active assets found matching <span className="font-semibold capitalize text-(--text-primary">"{activeFilter}"</span>  assets
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AssetTrackerTable