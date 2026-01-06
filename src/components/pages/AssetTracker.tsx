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
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
    assets: {
        assetSymbol: string;
        quantity: number;
        purchasePrice: number;
        transactionDate: string;
        notes?: string;
        createdAt: string;
        updatedAt: string;
    }[]
}

export interface AssetTrackerProps {
    assets: {
        assetSymbol: string;
        quantity: number;
        purchasePrice: number;
        transactionDate: string;
        notes?: string;
        createdAt: string;
        updatedAt: string;
    }[]
}

const AssetTracker = (props: Props) => {
    const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
    const assets = props.assets;
    const totalAssets = assets.length;
    const assetValue = assets.reduce((total, asset) => total + (asset.purchasePrice * asset.quantity), 0);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    }
    return (
        <div className='lg:ms-[237px] mb-25 lg:mb-10 p-5 lg:w-[calc(100%-237px)]'>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-4 items-start lg:flex-row justify-between lg:items-center w-full">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <IoBagOutline color="#21c45d" className="bg-[#0d241f] lg:p-3 rounded-[8px] h-full !size-[20px] lg:!size-[50px]" />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-white font-semibold text-xl lg:text-[27px]/[27px] tracking-[-1.62px]">Asset Tracker</h2>
                            <p className="text-[14px]/[21px] tracking-[-0.48px] font-normal text-[#6B7280]">
                                Track your crypto portfolio and investment performance
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <button className="bg-transparent border border-[#374151] rounded-[8px] px-2 lg:px-4 py-2 text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#28C76F] hover:bg-none transition cursor-pointer flex items-center capitalize" onClick={() => handleRefresh()} disabled={isPending}>
                            <RefreshCcw className={`inline-block me-2 ${isPending ? 'animate-spin' : ''}`} size={20} />
                            {
                                isPending ? 'refreshing...' : 'refresh'
                            }
                        </button>
                        <button className="bg-transparent border border-[#374151] rounded-[8px] px-2 lg:px-4 py-2 text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#28C76F] hover:bg-none transition cursor-pointer flex items-center capitalize" onClick={() => setIsAddAssetModalOpen(true)}>
                            <PlusIcon className="inline-block me-2" size={20} />
                            Add Asset
                        </button>
                        <button className="bg-[#811d1d] rounded-[8px] px-2 lg:px-4 py-2 text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#811d1d99] transition cursor-pointer flex items-center capitalize">
                            <TrendingDown className="inline-block me-2" size={20} />
                            Add exit
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-[58px] border border-[#374151] px-2 py-4 lg:p-5 flex flex-col rounded-sm w-full bg-[#161B22] gap-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col">
                        <h1 className="text-[16px]/[16px] tracking-[-0.96px] font-medium text-white capitalize">
                            portfolio
                        </h1>
                    </div>
                    <button className='outline-none border-none bg-transparent cursor-pointer'>
                        <RefreshCcw className="inline-block me-2" size={20} color='white' />
                    </button>
                </div>
                <div className="grid grid-cols-3 grid-rows-1 gap-5 ">
                    <div className="flex flex-col gap-2 bg-[#0D1117] py-1 px-2 lg:p-3 border border-[#374151] rounded-sm">
                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                            value
                        </p>
                        <h2 className="text-[18px]/[28px] tracking-[-0.96px] font-semibold text-white">
                            ${assetValue.toFixed(2)}
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#0D1117] py-1 px-2 lg:p-3 border border-[#374151] rounded-sm">
                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                            p&l
                        </p>
                        <h2 className="text-[18px]/[28px] tracking-[-0.96px] font-semibold text-[#22C55E]">
                            +$345K
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#0D1117] py-1 px-2 lg:p-3 border border-[#374151] rounded-sm">
                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                            ROI
                        </p>
                        <h2 className="text-[18px]/[28px] tracking-[-0.96px] font-semibold text-[#22C55E]">
                            +$34%
                        </h2>
                    </div>
                </div>
            </div>
            <AddAssetModal addAssetModalOpen={isAddAssetModalOpen} setAddAssetModalOpen={setIsAddAssetModalOpen} handleRefresh={handleRefresh} />
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
            <AssetTrackerTable isAssetModalOpen={isAddAssetModalOpen} assets={assets} setIsAddAssetModalOpen={setIsAddAssetModalOpen} />
        </div>
    )
}

export default AssetTracker