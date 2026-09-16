'use client';
import React from 'react'
import { IoBagOutline, IoTriangleSharp } from 'react-icons/io5';
import { ArrowUp, PlusIcon, RefreshCcw, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { CiBag1 } from 'react-icons/ci';
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import AddAssetModal from '../../components/ui/AddAssetModal';
import AssetTrackerTable from '../../components/ui/AssetTrackerTable';

type Props = {}

const AssetTracker = (props: Props) => {
    const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
    const filters = [
        { name: 'live assets', value: 'live' },
        { name: 'closed assets', value: 'closed' },
        { name: 'deleted assets', value: 'deleted' },
    ];
    return (
        <div className='lg:ms-[237px] min-h-screen bg-[var(--bg-canvas)] mb-25 lg:mb-10 p-5 lg:w-[calc(100%-237px)]'>
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
                        <button className="bg-(--bg-surface) border border-(--border-strong) rounded-[8px] px-2 lg:px-4 py-2 text-[13px] leading-[19px] font-semibold text-(--text-primary) hover:bg-[var(--brand-hover)] transition cursor-pointer flex items-center capitalize" onClick={() => setIsAddAssetModalOpen(true)}>
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
            <div className="mt-10 grid grid-cols-4 w-full gap-4">
                <div className="flex flex-col gap-2 bg-(--bg-surface) p-6 shadow=(--shadow-card) border border-(--border-subtle) rounded-[14px]">
                    <p className="type-label text-[12px]/[16px] font-semibold text-(--text-secondary) capitalize">
                        value
                    </p>
                    <h2 className="font-figure text-[32px] leading-[-0.32px] font-semibold tabular-nums text-[var(--text-primary)]">
                        $12,345.67
                    </h2>
                </div>
                <div className="flex flex-col gap-2 bg-(--bg-surface) p-6 shadow=(--shadow-card) border border-(--border-subtle) rounded-[14px]">
                    <p className="type-label text-[12px]/[16px] font-semibold text-(--text-secondary) capitalize">
                        p&l
                    </p>
                    <h2 className="font-figure text-[32px] leading-[-0.32px] font-semibold tabular-nums text-[var(--positive)]">
                        +$1,234.56
                    </h2>
                </div>
                <div className="flex flex-col gap-2 bg-(--bg-surface) p-6 shadow=(--shadow-card) border border-(--border-subtle) rounded-[14px]">
                    <p className="type-label text-[12px]/[16px] font-semibold text-(--text-secondary) capitalize">
                        ROI
                    </p>
                    <h2 className="font-figure text-[32px] leading-[-0.32px] font-semibold tabular-nums text-[var(--positive)]">
                        <IoTriangleSharp className="inline-block me-1" size={18} /> 34.72%
                    </h2>
                </div>
                <div className="flex flex-col gap-2 bg-(--bg-surface) p-6 shadow=(--shadow-card) border border-(--border-subtle) rounded-[14px]">
                    <p className="type-label text-[12px]/[16px] font-semibold text-(--text-secondary) capitalize">
                        No. of assets
                    </p>
                    <h2 className="font-figure text-[32px] leading-[-0.32px] font-semibold tabular-nums text-(--text-primary)">
                        5
                    </h2>
                </div>
            </div>
            <AddAssetModal addAssetModalOpen={isAddAssetModalOpen} setAddAssetModalOpen={setIsAddAssetModalOpen} />
            <div className="flex items-center justify-center mt-8 mb-5 w-fit gap-6">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        className='flex items-center justify-center outline-none border-b-2 px-1 py-0.5 border-(--brand) bg-transparent cursor-pointer text-[13px] text-(--text-primary) capitalize ease-linear duration-150 font-semibold tracking-[-0.56px]'
                    >
                        {filter.name}
                    </button>
                ))}
            </div>
            {/* <AssetTrackerTable isAssetModalOpen={isAddAssetModalOpen} setIsAddAssetModalOpen={setIsAddAssetModalOpen} /> */}
        </div>
    )
}

export default AssetTracker