'use client';
import React from 'react'
import LiveMarketData from '../../components/ui/liveMarketData'
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
        <div className='ms-[237px] mb-20 p-5 w-[calc(100%-237px)]'>
            <div className="flex flex-row justify-between items-center">
                <LiveMarketData />
                <div className="flex flex-row justify-between items-center mt-20 w-full">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <IoBagOutline size={50} color="#21c45d" className="bg-[#0d241f] p-3 rounded-[8px] h-full" />
                        <div className="flex flex-col gap-1">
                            <h2 className="text-white font-semibold text-[27px]/[27px] tracking-[-1.62px]">Asset Tracker</h2>
                            <p className="text-[14px]/[21px] tracking-[-0.48px] font-normal text-[#6B7280]">
                                Track your crypto portfolio and investment performance
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <button className="bg-transparent border border-[#374151] rounded-[8px] px-4 py-2 text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#28C76F] hover:bg-none transition cursor-pointer flex items-center capitalize">
                            <RefreshCcw className="inline-block me-2" size={20} />
                            refresh all
                        </button>
                        <button className="bg-transparent border border-[#374151] rounded-[8px] px-4 py-2 text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#28C76F] hover:bg-none transition cursor-pointer flex items-center capitalize" onClick={() => setIsAddAssetModalOpen(true)}>
                            <PlusIcon className="inline-block me-2" size={20} />
                            Add Asset
                        </button>
                        <button className="bg-[#811d1d] rounded-[8px] px-4 py-2 text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#811d1d99] transition cursor-pointer flex items-center capitalize">
                            <TrendingDown className="inline-block me-2" size={20} />
                            Add exit
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-[58px] border border-[#374151] p-5 flex flex-col rounded-sm w-full bg-[#161B22] gap-4">
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
                    <div className="flex flex-col gap-2 bg-[#0D1117] p-3 border border-[#374151] rounded-sm">
                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                            value
                        </p>
                        <h2 className="text-[18px]/[28px] tracking-[-0.96px] font-semibold text-white">
                            $12,345.67
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#0D1117] p-3 border border-[#374151] rounded-sm">
                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                            p&l
                        </p>
                        <h2 className="text-[18px]/[28px] tracking-[-0.96px] font-semibold text-[#22C55E]">
                            +$345K
                        </h2>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#0D1117] p-3 border border-[#374151] rounded-sm">
                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                            ROI
                        </p>
                        <h2 className="text-[18px]/[28px] tracking-[-0.96px] font-semibold text-[#22C55E]">
                            +$34%
                        </h2>
                    </div>
                </div>
            </div>
            <AddAssetModal addAssetModalOpen={isAddAssetModalOpen} setAddAssetModalOpen={setIsAddAssetModalOpen} />
            <div className="flex items-center justify-center rounded-sm bg-[#9ca3b0] p-[2px] mt-8 mb-5 w-fit">
                <button className='flex items-center justify-center outline-none border-none bg-transparent cursor-pointer text-sm text-white px-10 py-1 rounded-sm g-[#374151] capitalize hover:bg-[#0D1117] transition-colors ease-linear duration-150 font-normal tracking-[-0.56px]'>
                    <CiBag1 className='me-2' strokeWidth={2} />
                    live assets
                </button>
                <button className='flex items-center justify-center outline-none border-none bg-transparent cursor-pointer text-sm text-white px-10 py-1 rounded-sm g-[#374151] capitalize hover:bg-[#0D1117] transition-colors ease-linear duration-150 font-normal tracking-[-0.56px]'>
                    <IoTrashBinOutline className='me-2' strokeWidth={2} />
                    closed assets
                </button>
                <button className='flex items-center justify-center outline-none border-none bg-transparent cursor-pointer text-sm text-white px-10 py-1 rounded-sm g-[#374151] capitalize hover:bg-[#0D1117] transition-colors ease-linear duration-150 font-normal tracking-[-0.56px]'>
                    <FaRegTrashAlt className='me-2' strokeWidth={2} />
                    deleted assets
                </button>
            </div>
            <AssetTrackerTable isAssetModalOpen={isAddAssetModalOpen} setIsAddAssetModalOpen={setIsAddAssetModalOpen} />
        </div>
    )
}

export default AssetTracker