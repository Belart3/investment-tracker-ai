import React, { useState, useEffect, use } from 'react'
import { ChevronRight, PlusIcon, RefreshCcw, TrendingDown } from 'lucide-react';
import { TokenIcon } from '@web3icons/react'

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
}

interface Asset {
    accountType: string;
    asset: {
        coin: string;
        walletBalance: string;
        usdValue: string;
    }[];
}

interface ExchangeHistoryData  {
    fromCoin: string,
    toCoin: string,
    fromAmount: string,
    toAmount: string,
    exchangeTime: string,
    exchangeRate: string,
}

const AssetTrackerTable = (props: Props) => {
    const [assets, setAssets] = useState<Asset>({accountType: '', asset: []});
    const accountType = assets.accountType;
    const assetHoldings = assets.asset.filter(item => Number(item.walletBalance) > 0);
    const portfolioValue = assetHoldings.reduce((total, item) => Number(total) + Number(item.usdValue),0);      
    const [exchangeHistory, setExchangeHistory] = useState<ExchangeHistoryData[]>([]);
    const totAssetQty = exchangeHistory.reduce((total, item) => Number(total) + Number(item.toCoin),0)
    const [openRow, setOpenRow] = useState<number | null>(null);

    useEffect(() => {
        async function loadUnifiedWalletBalance() {
        const res = await fetch('/api/unifiedBalance');
        const assetList = await res.json();

        setAssets(assetList || []); 
        console.log('Asset data set:', assetList );
        }

        loadUnifiedWalletBalance()

        async function loadExchangeHistory() {
            const res = await fetch('/api/exchangeHistory');
            const data = await res.json();

            setExchangeHistory(data || []);
            //console.log('exchange History Log:', data);
        } 
        loadExchangeHistory();
    }, [])

    return (
        <div className="col-span-6 flex flex-col justify-start row-span-2 space-y-2 order-4 bg-[#161B22] border border-[#374151] rounded-md">
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
                    <table className="table-auto w-full">
                        <thead className="sticky top-0 bg-[#161B22] z-10">
                            <tr className="text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-b border-[#374151]">
                                <th className='text-start py-5 ps-5 capitalize'></th>
                                <th className='text-start py-5 ps-5 capitalize'>Asset</th>
                                <th className='text-start py-5 capitalize'>total qty</th>
                                <th className='text-start py-5 capitalize'>value</th>
                                <th className='text-start py-5 capitalize'>price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {assetHoldings?.length > 0 &&
                                assetHoldings.map((item, index) => {
                                    const isOpen = openRow === index;
                                    return (
                                        <React.Fragment key={index}>
                                            <tr
                                                onClick={() =>
                                                    setOpenRow(isOpen ? null : index)
                                                }
                                                className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal group relative border-b last-of-type:!border-0 border-[#374151] hover:bg-[#1F2937] cursor-pointer ${isOpen ? 'bg-[#1F2937]' : ''}`}
                                            >
                                                <td className='py-5 capitalize ps-5'>
                                                    <button className='transition-transform duration-200 hover:bg-[#28C76F] rounded-sm flex items-center justify-center cursor-pointer p-[2px]'>
                                                        <ChevronRight className={`inline-block transition-all duration-200 text-[#374151] group-hover:text-white rounded-sm ${isOpen ? 'rotate-90 text-white' : ''}`} size={20} />
                                                    </button>
                                                </td>
                                                <td className='py-5 capitalize ps-5 flex items-center justify-start gap-2'>
                                                    <TokenIcon
                                                        symbol={item.coin.toUpperCase()}
                                                        size={20}
                                                        variant='mono'
                                                    />
                                                    <span className="uppercase">
                                                        {item.coin}
                                                    </span>
                                                </td>
                                                <td className='py-5 capitalize ps-5'>{Number(item.walletBalance).toFixed(2)}</td>
                                                <td className='py-5 capitalize ps-5'>{Number(item.usdValue).toFixed(2)}</td>
                                                <td className='py-5 capitalize ps-5'>{Number(item.walletBalance).toFixed(2)}</td>
                                            </tr>
                                            {/* COLLAPSIBLE ROW */}
                                            {isOpen && (
                                                <tr className="bg-[#111827] border-b border-[#374151]">
                                                    <td colSpan={8} className="p-5 text-sm text-gray-300">
                                                        <div className="">
                                                            <h3 className="text-white font-semibold mb-3">Exchange History for {item.coin}</h3>
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
                                                                {exchangeHistory.map((exchange, exIndex) => (
                                                                    exchange.toCoin === item.coin && (
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
                                            )}

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