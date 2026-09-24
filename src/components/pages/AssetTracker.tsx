'use client';
import React from 'react'
import { IoTriangleSharp } from 'react-icons/io5';
import { PlusIcon, RefreshCcw, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import AddAssetModal from '../../components/ui/AddAssetModal';
import AssetTrackerTable from '../../components/ui/AssetTrackerTable';
import { useAssetData } from '@/hooks/useAssetData';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'

type Props = {}

const AssetTracker = (props: Props) => {
    const { assets, loading, error } = useAssetData();
    const liveAssets = assets.filter(asset => asset.status === 'live');
    const totalValue = liveAssets.reduce((acc, asset) => acc + (asset.purchasePrice * asset.quantity), 0);
    const totalPnl = liveAssets.reduce((acc, asset) => acc + (asset.purchasePrice * asset.quantity * 0.1), 0);
    const assetNumber = liveAssets.length;
    const totalROI = totalValue > 0 ? (totalPnl / totalValue) * 100 : 0;
    const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
    return (
        <div className='xl:ms-[237px] transition-all duration-300 min-h-screen bg-[var(--bg-canvas)] p-5 lg:p-8'>
            <div className=" w-full max-w-[1440px] mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-4 items-start lg:flex-row justify-between lg:items-center w-full">
                        <div className="flex flex-row justify-between items-center gap-4">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[var(--text-primary)] font-semibold text-[22px] leading-7 tracking-[-0.012em]">Asset Tracker</h2>
                                <p className="text-[13px] leading-[19px] font-normal text-[var(--text-secondary)]">
                                    Track your crypto portfolio and investment performance
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button className="bg-(--bg-surface) border border-[var(--border-strong)] rounded-[8px] px-2 lg:px-4 py-2 text-[13px] leading-[19px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition cursor-pointer flex items-center capitalize">
                                <RefreshCcw className="inline-block me-1 text-black" size={14} />
                                refresh
                            </button>
                            <button className="bg-(--bg-surface) border border-(--border-strong) rounded-[8px] px-2 lg:px-4 py-2 text-[13px] leading-[19px] font-semibold text-(--text-primary) hover:bg-[var(--brand)] hover:border-transparent hover:text-white transition cursor-pointer flex items-center capitalize" onClick={() => setIsAddAssetModalOpen(true)}>
                                <PlusIcon className="inline-block me-1" size={14} />
                                Add Asset
                            </button>
                            <button className="bg-(--brand) rounded-[8px] px-2 lg:px-4 py-2 text-[13px] leading-[19px] font-semibold text-white hover:opacity-90 transition cursor-pointer flex items-center capitalize">
                                <TrendingDown className="inline-block me-1" size={14} />
                                Add exit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-2 lg:grid-cols-4 w-full lg:gap-4">
                    <div className="flex flex-col gap-2 bg-(--bg-surface) p-2 lg:p-6 shadow=(--shadow-card) border border-(--border-subtle) rounded-[14px]">
                        <p className="type-label text-[8px] lg:text-[12px]/[16px] font-semibold text-(--text-secondary) capitalize">
                            value
                        </p>
                        <NumberFlow 
                            format={{ 
                                style: 'currency', 
                                currency: 'USD', 
                                trailingZeroDisplay: 'stripIfInteger',
                                maximumFractionDigits: 2,
                            }} 
                            value={Number(totalValue)} 
                            className="font-display text-[14px]/[21px] lg:text-[32px] leading-[-0.32px] font-semibold tabular-nums text-[var(--text-primary)]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-(--bg-surface) p-2 lg:p-6 shadow=(--shadow-card) border border-(--border-subtle) rounded-[14px]">
                        <p className="type-label text-[4px] lg:text-[12px]/[16px] font-semibold text-(--text-secondary) capitalize">
                            p&l
                        </p>
                        <NumberFlow 
                            format={{ 
                                style: 'currency', 
                                currency: 'USD', 
                                trailingZeroDisplay: 'stripIfInteger',
                                maximumFractionDigits: 2,
                            }} 
                            value={Number(totalPnl)} 
                            className="font-display text-[14px]/[21px] lg:text-[32px] leading-[-0.32px] font-semibold tabular-nums text-[var(--positive)]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-(--bg-surface) p-2 lg:p-6 shadow=(--shadow-card) border border-(--border-subtle) rounded-[14px]">
                        <p className="type-label text-[8px] lg:text-[12px]/[16px] font-semibold text-(--text-secondary) capitalize">
                            ROI
                        </p>
                        <NumberFlow 
                            locales="en-US"
                            format={{
                                style: 'percent',
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 2,
                                signDisplay: 'exceptZero'
                            }}
                            value={Number(totalROI/100)} 
                            className="font-display text-[14px]/[21px] lg:text-[32px] leading-[-0.32px] font-semibold tabular-nums text-[var(--positive)]"
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-(--bg-surface) p-2 lg:p-6 shadow=(--shadow-card) border border-(--border-subtle) rounded-[14px]">
                        <p className="type-label text-[8px] lg:text-[12px]/[16px] font-semibold text-(--text-secondary) capitalize">
                            No. of assets
                        </p>
                        <NumberFlow 
                            className="font-display text-[14px]/[21px] lg:text-[32px] leading-[-0.32px] font-semibold tabular-nums text-(--text-primary)"
                            value={assetNumber}
                        />
                    </div>
                </div>
                <AddAssetModal addAssetModalOpen={isAddAssetModalOpen} setAddAssetModalOpen={setIsAddAssetModalOpen} />
                {
                    loading ? (
                        <div className="flex items-center justify-center w-full h-[400px]">
                            <p className="text-(--text-secondary) text-[14px] leading-[20px] font-normal">
                                Loading...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center w-full h-[400px]">
                            <p className="text-(--text-secondary) text-[14px] leading-[20px] font-normal">Error: {error instanceof Error ? error.message : String(error)}</p>
                        </div>
                    ) : (
                        <AssetTrackerTable  isAssetModalOpen={isAddAssetModalOpen} setIsAddAssetModalOpen={setIsAddAssetModalOpen} assets={assets} totalValue={totalValue} totalPnl={totalPnl} assetNumber={assetNumber} totalROI={totalROI} />
                    )
                }
            </div>
        </div>
    )
}

export default AssetTracker