import React, { useState } from 'react'
import { ChevronRight, Clock, Ellipsis, PlusIcon, RefreshCcw, TrendingDown } from 'lucide-react';
import { TokenIcon } from '@web3icons/react'
import { useExchangeHistory } from '@/hooks/useExchangeHistory';
import { AssetTrackerProps } from '../pages/AssetTracker';
import { useMarketData } from '@/hooks/useMarketData';
import { MarketDatum} from '@/types/marketData';
import { IoTriangleSharp } from 'react-icons/io5';
import { GoDash } from 'react-icons/go';

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
    assets: AssetTrackerProps['assets'];
}

const AssetTrackerTable = (props: Props) => {
    const {data:liveData, loading, error} = useMarketData();
    const marketData: MarketDatum[] = liveData.length > 0 ? liveData : [];
    console.log('Market Data in AssetTrackerTable component:', marketData);
    const assets = props.assets;
    const [openRow, setOpenRow] = useState<number | null>(null);

    const getAssetPrice = (asset: string) : number => {
        const assetData = marketData.find((data:MarketDatum) => data.symbol.toLowerCase() === asset.toLowerCase());
        return assetData ? Number(assetData.quote.USD.price) : 0;
    }

    const getAssetPercentChange = (asset: string, timeKey: string) : number => {
        const assetData = marketData.find((data:MarketDatum) => data.symbol.toLowerCase() === asset.toLowerCase());
        return assetData ? Number(assetData.quote.USD[timeKey as keyof typeof assetData.quote.USD]) : 0;
    }

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
            <div className="rounded-md rounded-t-none border border-[#374151] !overflow-hidden bg-[#161B22]">
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
                            {assets?.length > 0 &&
                                assets.map((item, index) => {
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
                                                        <span className="uppercase">
                                                            {item.assetSymbol}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className='py-6 capitalize text-right text-sm'>{Number(item.quantity).toFixed(2)}</td>

                                                <td className='py-6 capitalize text-right text-sm'>${Number(item.purchasePrice).toFixed(2)}</td>

                                                <td className='py-6 capitalize text-right text-sm'>
                                                    <div className="flex items-center justify-end gap-2">
                                                        ${(getAssetPrice(item.assetSymbol).toFixed(2))}
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

                                                                {((Number(getAssetPrice(item.assetSymbol).toFixed(2)) - Number(item.purchasePrice)) / Number(item.purchasePrice) * 100).toFixed(2)}%

                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className='py-6 capitalize text-right text-sm'>${(Number(item.purchasePrice) * Number(item.quantity)).toFixed(2)}</td>

                                                <td className='py-6 capitalize text-right text-sm'>${(getAssetPrice(item.assetSymbol) * Number(item.quantity)).toFixed(2)}</td>

                                                <td className={`py-6 pe-5 capitalize text-right text-sm ${item.purchasePrice < Number(getAssetPrice(item.assetSymbol).toFixed(2)) ? 'text-[#22C55E]' : item.purchasePrice > Number(getAssetPrice(item.assetSymbol).toFixed(2)) ? 'text-[#B91C1C]' : 'text-[#919191]'}`}>
                                                    ${(Number(getAssetPrice(item.assetSymbol).toFixed(2)) - Number(item.purchasePrice)).toFixed(2)}
                                                </td>
                                                <td className={`py-6 pe-5 capitalize text-right text-sm`}>
                                                    <Clock className="inline-block me-2 mb-1" size={14} />
                                                    {marketData.length > 0 ? new Date(marketData[0].last_updated).toLocaleTimeString(
                                                        [], { hour: '2-digit', minute: '2-digit', hour12: true }
                                                    ) : 'N/A'}
                                                </td>
                                                <td className={`py-6 pe-5 capitalize text-right text-sm`}>
                                                    <Ellipsis className="inline-block me-2 mb-1 hover:text-[#28C76F] transition cursor-pointer" size={16} />
                                                </td>
                                            </tr>
                                            {/* COLLAPSIBLE ROW */}
                                            {/* {isOpen && (
                                                <tr className="bg-[#111827] border-b border-[#374151]">
                                                    <td colSpan={8} className="p-5 text-sm text-gray-300">
                                                        <div className="">
                                                            <h3 className="text-white font-semibold mb-3">Exchange History for {item.assetSymbol}</h3>
                                                        </div>
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
                                                                {exchangeHistoryData.map((exchange, exIndex) => (
                                                                    exchange.toCoin === item.assetSymbol && (
                                                                        <tr key={exIndex} className="border-t border-[#374151]">
                                                                            <td className="py-1 xl:py-5 xl:gap-1 items-center hidden md:flex text-end md:text-start px-[2px]">
                                                                                <TokenIcon
                                                                                    symbol={exchange.fromCoin.toUpperCase()}
                                                                                    size={20}
                                                                                    variant='branded'
                                                                                />
                                                                                <span className="uppercase">
                                                                                    {exchange.fromCoin}
                                                                                </span>
                                                                            </td>
                                                                            <td className="py-1">
                                                                                <TokenIcon
                                                                                    symbol={exchange.toCoin.toUpperCase()}
                                                                                    size={20}
                                                                                    variant='branded'
                                                                                />
                                                                                <span className="uppercase">
                                                                                    {exchange.toCoin}
                                                                                </span>
                                                                            </td>
                                                                            <td className="py-1">
                                                                                <TokenIcon
                                                                                    symbol={exchange.fromCoin.toUpperCase()}
                                                                                    size={20}
                                                                                    variant='branded'
                                                                                />
                                                                                <span className="uppercase">
                                                                                    {Number(exchange.fromAmount).toFixed(2)}
                                                                                </span>
                                                                            </td>
                                                                            <td className="py-1">
                                                                                <TokenIcon
                                                                                    symbol={exchange.toCoin.toUpperCase()}
                                                                                    size={20}
                                                                                    variant='branded'
                                                                                />
                                                                                <span className="uppercase">
                                                                                {Number(exchange.toAmount).toFixed(2)}
                                                                                </span>
                                                                            </td>
                                                                            <td className="py-2">
                                                                                {new Date(Number(exchange.exchangeTime)).toDateString()}
                                                                            </td>
                                                                            <td className="py-2">{Number(exchange.exchangeRate).toFixed(2)}</td>
                                                                        </tr>
                                                                    )
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )} */}

                                        </React.Fragment>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>     
        </div>
    )
}

export default AssetTrackerTable