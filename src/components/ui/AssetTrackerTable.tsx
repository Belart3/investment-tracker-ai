import React from 'react'
import {useAssetData} from '@/hooks/useAssetData';

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
}

const AssetTrackerTable = (props: Props) => {
    const { assets, loading, error } = useAssetData();
    const liveAssets = assets.filter(asset => asset.status === 'live');
    const closedAssets = assets.filter(asset => asset.status === 'closed');
    const deletedAssets = assets.filter(asset => asset.status === 'deleted');
    const totalValue = liveAssets.reduce((acc, asset) => acc + (asset.purchasePrice * asset.quantity), 0);
    const totalPnl = liveAssets.reduce((acc, asset) => acc + (asset.purchasePrice * asset.quantity * 0.1), 0);
    const assetNumber = liveAssets.length;
    const totalROI = totalValue > 0 ? (totalPnl / totalValue) * 100 : 0;

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
                    {
                        liveAssets.map((asset) => (
                            <tr key={asset._id} className="border-b border-(--border-subtle) hover:bg-(--bg-surface) ease-in duration-200 cursor-pointer">
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
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AssetTrackerTable