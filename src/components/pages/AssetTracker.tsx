'use client';
import React from 'react'
import { IoBagOutline } from 'react-icons/io5';
import { PlusIcon, RefreshCcw, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { CiBag1 } from 'react-icons/ci';
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import AddAssetModal from '../../components/ui/AddAssetModal';
import AssetTrackerTable from '../../components/ui/AssetTrackerTable';

type Props = {}

const AssetTracker = (props: Props) => {
    const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
    return (
        <div className='lg:ms-[237px] min-h-screen bg-[var(--bg-canvas)] mb-25 lg:mb-10 p-5 lg:w-[calc(100%-237px)]'>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-4 items-start lg:flex-row justify-between lg:items-center w-full">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <IoBagOutline color="var(--brand)" className="bg-[var(--brand-muted)] lg:p-3 rounded-[8px] h-full !size-[20px] lg:!size-[50px]" />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[var(--text-primary)] font-semibold text-[22px] leading-7 tracking-[-0.012em]">Asset Tracker</h2>
                            <p className="text-[13px] leading-[19px] font-normal text-[var(--text-secondary)]">
                                Track your crypto portfolio and investment performance
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <button className="bg-transparent border border-[var(--border-strong)] rounded-[8px] px-2 lg:px-4 py-2 text-[13px] leading-[19px] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition cursor-pointer flex items-center capitalize">
                            <RefreshCcw className="inline-block me-2" size={20} />
                            refresh all
                        </button>
                        <button className="bg-[var(--brand)] border border-[var(--brand)] rounded-[8px] px-2 lg:px-4 py-2 text-[13px] leading-[19px] font-medium text-white hover:bg-[var(--brand-hover)] transition cursor-pointer flex items-center capitalize" onClick={() => setIsAddAssetModalOpen(true)}>
                            <PlusIcon className="inline-block me-2" size={20} />
                            Add Asset
                        </button>
                        <button className="bg-[var(--negative)] rounded-[8px] px-2 lg:px-4 py-2 text-[13px] leading-[19px] font-medium text-white hover:opacity-90 transition cursor-pointer flex items-center capitalize">
                            <TrendingDown className="inline-block me-2" size={20} />
                            Add exit
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-10 border border-[var(--border-subtle)] px-2 py-4 lg:p-5 flex flex-col rounded-[8px] w-full bg-[var(--bg-surface)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] gap-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col">
                        <h1 className="text-[17px] leading-[25px] tracking-[-0.005em] font-semibold text-[var(--text-primary)] capitalize">
                            portfolio
                        </h1>
                    </div>
                    <button className='outline-none border-none bg-transparent cursor-pointer'>
                        <RefreshCcw className="inline-block me-2" size={20} color='white' />
                    </button>
                </div>
                <div className="grid grid-cols-3 grid-rows-1 gap-5 ">
                    <div className="flex flex-col gap-2 bg-[var(--bg-surface-2)] py-1 px-2 lg:p-3 border border-[var(--border-subtle)] rounded-[8px]">
                        <p className="type-label text-[var(--text-secondary)] capitalize">
                            value
                        </p>
                        <h2 className="figure-mono text-[22px] leading-7 font-medium text-[var(--text-primary)]">
                            $12,345.67
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 bg-[var(--bg-surface-2)] py-1 px-2 lg:p-3 border border-[var(--border-subtle)] rounded-[8px]">
                        <p className="type-label text-[var(--text-secondary)] capitalize">
                            p&l
                        </p>
                        <h2 className="figure-mono text-[22px] leading-7 font-medium text-[var(--positive)]">
                            +$345K
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 bg-[var(--bg-surface-2)] py-1 px-2 lg:p-3 border border-[var(--border-subtle)] rounded-[8px]">
                        <p className="type-label text-[var(--text-secondary)] capitalize">
                            ROI
                        </p>
                        <h2 className="figure-mono text-[22px] leading-7 font-medium text-[var(--positive)]">
                            +$34%
                        </h2>
                    </div>
                </div>
            </div>
            <AddAssetModal addAssetModalOpen={isAddAssetModalOpen} setAddAssetModalOpen={setIsAddAssetModalOpen} />
            <div className="flex items-center justify-center rounded-sm bg-[#374151] p-[2px] mt-8 mb-5 w-fit">
                <button className='flex items-center justify-center outline-none border-none bg-transparent cursor-pointer text-sm text-white px-3 lg:px-10 py-1 rounded-sm g-[#374151] capitalize hover:bg-[#0D1117] transition-colors ease-linear duration-150 font-normal tracking-[-0.56px]'>
                    <CiBag1 className='me-2' strokeWidth={2} />
                    live assets
                </button>
                <button className='flex items-center justify-center outline-none border-none bg-transparent cursor-pointer text-sm text-white px-3 lg:px-10 py-1 rounded-sm g-[#374151] capitalize hover:bg-[#0D1117] transition-colors ease-linear duration-150 font-normal tracking-[-0.56px]'>
                    <IoTrashBinOutline className='me-2' strokeWidth={2} />
                    closed assets
                </button>
                <button className='flex items-center justify-center outline-none border-none bg-transparent cursor-pointer text-sm text-white px-3 lg:px-10 py-1 rounded-sm g-[#374151] capitalize hover:bg-[#0D1117] transition-colors ease-linear duration-150 font-normal tracking-[-0.56px]'>
                    <FaRegTrashAlt className='me-2' strokeWidth={2} />
                    deleted assets
                </button>
            </div>
            <AssetTrackerTable isAssetModalOpen={isAddAssetModalOpen} setIsAddAssetModalOpen={setIsAddAssetModalOpen} />
        </div>
    )
}

export default AssetTracker