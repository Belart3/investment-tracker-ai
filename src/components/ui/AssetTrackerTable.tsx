import React, { useState } from 'react'
import { ChevronRight, Clock, DollarSignIcon, Ellipsis, PlusIcon, TrendingDown } from 'lucide-react';
import { FiPercent } from "react-icons/fi";
import { IoMdTrendingUp } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { TokenIcon } from '@web3icons/react'
import { AssetTrackerProps } from '../pages/AssetTracker';
import { useMarketData } from '@/hooks/useMarketData';
import { MarketDatum} from '@/types/marketData';
import { IoTriangleSharp } from 'react-icons/io5';
import { GoDash, GoPulse } from 'react-icons/go';
import { deleteAssetAction } from '@/app/actions/assetActions';
import { useTransition } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { CiCalendarDate } from 'react-icons/ci';
import { formatCurrency } from '@/lib/formatCurrency';

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
    assets: AssetTrackerProps['assets'];
}

const AssetTrackerTable = (props: Props) => {
    // All hooks must be declared first
    const [openRow, setOpenRow] = useState<number | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const {data:liveData, loading, error} = useMarketData();

    // Then other logic
    const marketData: MarketDatum[] = liveData.length > 0 ? liveData : [];
    const assets = props.assets;
    const asset = [...new Set(assets.map((item) => item.assetSymbol))].map((symbol) => {
        const assetItems = assets.filter((item) => item.assetSymbol === symbol);
        const itemId = assetItems[0]?.id;
        const totalQuantity = assetItems.reduce((total, item) => total + Number(item.quantity), 0);
        const avgPurchasePrice = assetItems.length > 0 ? assetItems.reduce((total, item) => total + (Number(item.purchasePrice) * Number(item.quantity)), 0) / totalQuantity : 0;
        return {
            assetSymbol: symbol,
            quantity: totalQuantity,
            purchasePrice: avgPurchasePrice,
            itemId: itemId || '',
        }
    });
    const getAssetPrice = (asset: string) : number => {
        const assetData = marketData.find((data:MarketDatum) => data.symbol.toLowerCase() === asset.toLowerCase());
        return assetData ? Number(assetData.quote.USD.price) : 0;
    }

    const getAssetPercentChange = (asset: string, timeKey: string) : number => {
        const assetData = marketData.find((data:MarketDatum) => data.symbol.toLowerCase() === asset.toLowerCase());
        return assetData ? Number(assetData.quote.USD[timeKey as keyof typeof assetData.quote.USD]) : 0;
    }

    const handleDeleteAsset = (assetId: string) => {
        startTransition(() => {
            deleteAssetAction(assetId).then((result) => {
                if (result.error) {
                    console.error('Error deleting asset:', result.error);
                } else {
                    console.log(result.message);
                    router.refresh(); 
                }
            });
        });
    };

    return (
        <div className="col-span-6 flex flex-col justify-start row-span-2 order-4 bg-[#161B22] border border-[#374151] rounded-md">
            <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center justify-between p-5">
                <h2 className="text-white capitalize">Portfolio assets</h2>
                <div className="flex items-center justify-center gap-3">
                    <button className="bg-transparent border border-[#374151] rounded-[8px] px-2 lg:px-4 py-2 lg:text-[14px]/[21px] tracking-[-0.56px] font-medium text-white text-sm hover:bg-[#28C76F] hover:bg-none transition cursor-pointer flex items-center capitalize" onClick={() => props.setIsAddAssetModalOpen(true)}>
                        <PlusIcon className="inline-block me-1 lg:me-2" size={20} />
                        Add Asset
                    </button> 
                    <button className="bg-[#811d1d] rounded-[8px] text-sm  px-2 lg:px-4 py-2 lg:text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#811d1d99] transition cursor-pointer flex items-center capitalize">
                        <TrendingDown className="inline-block me-1 lg:me-2" size={20} />
                        Add exit
                    </button>
                </div>
            </div>
            <div className="rounded-md rounded-t-none border-t border-[#374151] !overflow-hidden bg-[#161B22]">
                <div className="max-h-[600px] overflow-y-scroll">
                    <table className="table-fixed w-full border-collapse">
                        <thead className="sticky top-0 bg-[#161B22] z-10">
                            <tr className="text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-b border-[#374151]">
                                <th className='text-left py-5 ps-5 capitalize w-fit'>Asset</th>
                                <th className='text-right py-5 capitalize'>live qty</th>
                                <th className='text-right py-5 capitalize'>avg cost</th>
                                <th className='text-center py-5 capitalize'>price</th>
                                <th className='text-right py-5 capitalize'>invested</th>
                                <th className='text-right py-5 capitalize'>value</th>
                                <th className='text-right pe-5 py-5 capitalize'>PnL</th>
                                <th className='text-right pe-5 py-5 capitalize'>updated</th>
                                <th className='text-right pe-5 py-5 capitalize'>actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {asset?.length > 0 ?
                                asset.map((item, index) => {
                                    const isOpen = openRow === index;
                                    return (
                                        <React.Fragment key={index}>
                                            <tr
                                                onClick={() =>
                                                    setOpenRow(isOpen ? null : index)
                                                }
                                                className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal group relative border-b last-of-type:!border-0 border-[#374151] hover:bg-[#1F2937] cursor-pointer ${isOpen ? 'bg-[#1F2937]' : ''}`}
                                            >
                                                <td className='py-6 capitalize ps-5'>
                                                    <div className="flex items-center justify-start gap-2">
                                                        <button className='flex items-center justify-center cursor-pointer p-[2px]'>
                                                            <ChevronRight className={`inline-block me-2 mb-1 hover:text-[#28C76F] transition cursor-pointer ${isOpen ? 'rotate-90 text-[#28C76F]' : ''}`} size={20} />
                                                        </button>
                                                        <TokenIcon
                                                            symbol={item.assetSymbol.toUpperCase()}
                                                            size={20}
                                                            variant='branded'
                                                        />
                                                        <span className="uppercase text-sm">
                                                            {item.assetSymbol}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='py-6 capitalize text-right text-sm'>{formatCurrency(item.quantity)}</td>

                                                <td className='py-6 capitalize text-right text-sm text-[#919191]'>${formatCurrency(item.purchasePrice)}</td>

                                                <td className='py-6 capitalize text-right text-sm'>
                                                    <div className="flex items-center justify-end gap-2">
                                                        ${formatCurrency(getAssetPrice(item.assetSymbol))}
                                                        <div className="flex gap-1 items-center justify-center">
                                                            {
                                                                item.purchasePrice < Number(getAssetPrice(item.assetSymbol).toFixed(2)) ? (
                                                                    <IoTriangleSharp size={6} color="#22C55E" className="translate-y-[-25%]" />
                                                                ) : item.purchasePrice > Number(getAssetPrice(item.assetSymbol).toFixed(2)) ? (
                                                                    <IoTriangleSharp size={6} color="#B91C1C" className="translate-y-[0%] rotate-180" />
                                                                ) : (
                                                                    <GoDash size={12} color="#919191" className="translate-y-[-12.5%]" />
                                                                )
                                                            }
                                                            <p className={`uppercase text-[11px]  tracking-[-0.56px] font-normal ${item.purchasePrice < Number(getAssetPrice(item.assetSymbol).toFixed(2)) ? 'text-[#22C55E]' : item.purchasePrice > Number(getAssetPrice(item.assetSymbol).toFixed(2)) ? 'text-[#B91C1C]' : 'text-[#919191]'}`}>

                                                                {
                                                                    (formatCurrency(
                                                                        (Number(getAssetPrice(item.assetSymbol).toFixed(2)) - Number(item.purchasePrice))
                                                                        / 
                                                                        Number(item.purchasePrice) * 100
                                                                    ))
                                                                }%

                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className='py-6 capitalize text-right text-sm'>${formatCurrency(Number(item.purchasePrice) * Number(item.quantity))}</td>

                                                <td className='py-6 capitalize text-right text-sm'>${formatCurrency(getAssetPrice(item.assetSymbol) * Number(item.quantity))}</td>

                                                <td className={`py-6 pe-5 capitalize text-right text-sm ${item.purchasePrice < Number(getAssetPrice(item.assetSymbol).toFixed(2)) ? 'text-[#22C55E]' : item.purchasePrice > Number(getAssetPrice(item.assetSymbol).toFixed(2)) ? 'text-[#B91C1C]' : 'text-[#919191]'}`}>
                                                    ${
                                                        formatCurrency(
                                                            (Number(getAssetPrice(item.assetSymbol).toFixed(2)) - Number(Number(item.purchasePrice).toFixed(2)) )* Number(item.quantity)
                                                        )
                                                    }
                                                </td>
                                                <td className={`py-6 pe-5 capitalize text-right text-sm text-[#919191]`}>
                                                    <Clock className="inline-block me-2 mb-1" size={14} />
                                                    {marketData.length > 0 ? new Date(marketData[0].last_updated).toLocaleTimeString(
                                                        [], { hour: '2-digit', minute: '2-digit', hour12: true }
                                                    ) : 'N/A'}
                                                </td>
                                                <td className={`py-6 `}>
                                                    <div className="flex items-center justify-center">
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant={null} size="icon-xs" className="bg-none hover:bg-[#475d7b] flex items-center justify-center transition cursor-pointer p-1.5 rounded-sm !mx-auto" onClick={(e) => {
                                                                    e.stopPropagation()
                                                                }}>
                                                                    <Ellipsis className="inline-block text-[#919191]" size={16} />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className=' !p-0 !bg-[#111827] border border-[#374151] max-w-[180px]'>
                                                                <div className="flex flex-col">
                                                                    <button className="text-left text-sm px-4  hover:bg-[#374151] cursor-pointer" onClick={(e) => {
                                                                        e.stopPropagation()
                                                                    }}>
                                                                        <div className="border-b-[0.5px] border-b-[#374151] flex items-center gap-1 text-white py-2">
                                                                            <FaRegEdit className="inline-block me-2" size={16} />
                                                                            Edit
                                                                        </div>
                                                                    </button>
                                                                    <button className="text-left text-sm px-4  hover:bg-[#374151] cursor-pointer" onClick={(e) => {
                                                                        e.stopPropagation()
                                                                    }}>
                                                                        <div className="border-b-[0.5px] border-b-[#374151] flex items-center gap-1 text-white py-2">
                                                                            <PlusIcon className="inline-block me-2" size={16} />
                                                                            Add More {item.assetSymbol.toUpperCase()}
                                                                        </div>
                                                                    </button>
                                                                    <button className="text-left text-sm px-4  hover:bg-[#374151] cursor-pointer" onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleDeleteAsset(item.itemId);
                                                                        console.log('Delete asset with id:', item.itemId);
                                                                        if (!isPending) {
                                                                            router.refresh();
                                                                        }
                                                                    }}>
                                                                        <div className="flex items-center gap-1 text-red-400 hover:text-red-500 py-2">
                                                                            {
                                                                                isPending ? (
                                                                                    <>
                                                                                        <svg className="animate-spin h-4 w-4 text-red-400 inline-block me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                        </svg>
                                                                                        Deleting...
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <RiDeleteBin5Line className="inline-block me-2" size={16} />
                                                                                        Delete
                                                                                    </>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* COLLAPSIBLE ROW */}
                                            {isOpen && (
                                                <tr className="bg-[#111727] border-l-[5px] border-[#28c76f]">
                                                    <td colSpan={9} className="p-5 text-sm text-gray-300">
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-5">
                                                            <div className="flex flex-col gap-4 bg-[#0b121e] rounded-sm p-5">
                                                                <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                    Asset Details    
                                                                </p>
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                        <GoPulse className="inline-block me-2 text-white" size={14} />
                                                                            symbol
                                                                        </p>
                                                                        <h2 className="text-[14px]/[21px] tracking-[-0.96px] font-medium text-white">
                                                                            {item.assetSymbol.toUpperCase()}
                                                                        </h2>
                                                                    </div>
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                        <CiCalendarDate className="inline-block me-2 text-white" size={14} />
                                                                            first purchase
                                                                        </p>
                                                                        <h2 className="text-[14px]/[21px] tracking-[-0.96px] font-medium text-white">
                                                                            {item.itemId ? new Date(Number(assets.sort(
                                                                                (a, b) => Number(a.transactionDate) - Number(b.transactionDate)
                                                                            ).find(asset => asset.id === item.itemId)?.transactionDate)).toDateString() : 'N/A'}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-4 bg-[#0b121e] rounded-sm p-5">
                                                                <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                    Position Information   
                                                                </p>
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                        remaining quantity
                                                                        </p>
                                                                        <h2 className="text-[14px]/[21px] tracking-[-0.96px] font-medium text-white">
                                                                            {item.quantity}
                                                                        </h2>
                                                                    </div>
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                            <DollarSignIcon className="inline-block me-2 text-white" size={14} />
                                                                                average buy price
                                                                        </p>
                                                                        <h2 className="text-[14px]/[21px] tracking-[-0.96px] font-medium text-white">
                                                                            ${Number(item.purchasePrice).toFixed(2)}
                                                                        </h2>
                                                                    </div>
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                            total invested
                                                                        </p>
                                                                        <h2 className="text-[14px]/[21px] tracking-[-0.96px] font-medium text-white">
                                                                            ${Number(item.purchasePrice * item.quantity).toFixed(2)}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-4 bg-[#0b121e] rounded-sm p-5">
                                                                <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                    current performance   
                                                                </p>
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                        <IoMdTrendingUp className="inline-block me-2 text-white" size={14} />
                                                                        current price
                                                                        </p>
                                                                        <h2 className="text-[14px]/[21px] tracking-[-0.96px] font-medium text-white">
                                                                            ${Number(getAssetPrice(item.assetSymbol)).toFixed(2)}
                                                                        </h2>
                                                                    </div>
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                            <DollarSignIcon className="inline-block me-2 text-white" size={14} />
                                                                                current value
                                                                        </p>
                                                                        <h2 className="text-[14px]/[21px] tracking-[-0.96px] font-medium text-white">
                                                                            ${Number(getAssetPrice(item.assetSymbol) * item.quantity).toFixed(2)}
                                                                        </h2>
                                                                    </div>
                                                                    <div className="w-full flex items-center justify-between">
                                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize">
                                                                        <FiPercent className="inline-block me-2 text-white" size={14} />
                                                                            p&l
                                                                        </p>
                                                                        <h2 className="text-[14px]/[21px] tracking-[-0.96px] font-medium text-white">
                                                                            ${Number(item.purchasePrice * item.quantity).toFixed(2)}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-[#6B7280] capitalize mb-3">
                                                            transactions
                                                        </p>
                                                        <table className='table-auto w-full'>
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-start pb-3">From Coin</th>
                                                                    <th className="text-start pb-3">To Coin</th>
                                                                    <th className="text-start pb-3">From Amount</th>
                                                                    <th className="text-start pb-3">To Amount</th>
                                                                    <th className="text-start pb-3">Exchange Time</th>
                                                                    <th className="text-start pb-3">Exchange Rate</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {assets.filter(asset => item.assetSymbol === asset.assetSymbol).map((item, index) => (
                                                                    <tr key={index} className="border-t border-[#374151]">
                                                                        <td className="py-1 xl:py-5 xl:gap-1 items-center hidden md:flex text-end md:text-start px-[2px]">
                                                                            <TokenIcon
                                                                                symbol={item.assetSymbol.toUpperCase()}
                                                                                size={20}
                                                                                variant='branded'
                                                                            />
                                                                            <span className="uppercase">
                                                                                {item.assetSymbol}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-1">
                                                                            <TokenIcon
                                                                                symbol={item.assetSymbol.toUpperCase()}
                                                                                size={20}
                                                                                variant='branded'
                                                                            />
                                                                            <span className="uppercase">
                                                                                {item.assetSymbol}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-1">
                                                                            <TokenIcon
                                                                                symbol={item.assetSymbol.toUpperCase()}
                                                                                size={20}
                                                                                variant='branded'
                                                                            />
                                                                            <span className="uppercase">
                                                                                {Number(item.purchasePrice).toFixed(2)}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-1">
                                                                            <TokenIcon
                                                                                symbol={item.assetSymbol.toUpperCase()}
                                                                                size={20}
                                                                                variant='branded'
                                                                            />
                                                                            <span className="uppercase">
                                                                            {Number(item.purchasePrice).toFixed(2)}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-2">
                                                                            {new Date(Number(item.transactionDate)).toDateString()}
                                                                        </td>
                                                                        <td className="py-2">{Number(item.purchasePrice).toFixed(2)}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                                :
                                <tr>
                                    <td colSpan={10} className="text-center py-10 text-sm text-[#919191]">
                                        No assets added yet. Click "Add Asset" to start tracking your portfolio.
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>     
        </div>
    )
}

export default AssetTrackerTable