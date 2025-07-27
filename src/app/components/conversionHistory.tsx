import React, { useEffect, useState } from 'react'
import { PiSlidersHorizontalDuotone } from "react-icons/pi";
import { Check } from "lucide-react";
import { GoChevronLeft } from "react-icons/go";
import TablePagination from '@mui/material/TablePagination';

interface ExchangeHistoryData {
    fromCoin: string;
    toCoin: string,
    fromAmount: string,
    toAmount: string,
    exchangeTime: string,
    exchangeRate: string,
}

interface MarketDatum {
    symbol: string;
    latestPrice: number;
    percIncr: number;
    volume?: number; 
};

type Props = {
    liveData: MarketDatum[];
    filterAssets: ExchangeHistoryData[];
    exchangeHistory: ExchangeHistoryData[]
}

const ConversionHistory = (props: Props) => {
    const [showConversionFilter, setShowConversionFilter] = useState(false);
    const [filterBy, setFilterBy] = useState('');
    const [slice, setSlice] = useState(10);
    return (
        <div className="col-span-6 flex flex-col justify-start row-span-2 space-y-2 order-4 bg-[#161B22] border border-[#374151] rounded-[16px]">
            <div className="flex items-center justify-between p-5">
                <h2 className="text-white capitalize">conversion history</h2>
                <div className="flex flex-col bg-[#1F2937] rounded-[12px] relative">
                    <button className={`py-1.5 px-3 bg-[#1F2937] text-white flex gap-1 items-center capitalize text-[12px]/[18px] tracking-[-0.48px] cursor-pointer focus:outline-none ${showConversionFilter ? 'rounded-t-[12px] w-[140px]' : 'rounded-[12px]'}`}
                    onClick={() => {
                    setShowConversionFilter(!showConversionFilter)
                    }}
                    >
                    <PiSlidersHorizontalDuotone size={16}/>
                    filter by
                    </button>
                    <div className={`flex-col w-[140px] ${showConversionFilter ? 'flex absolute z-50 right-0 mt-[30px] rounded-b-[12px]' : 'hidden'}`}>
                    <div className="w-full group">
                        <button className={`py-1.5 px-4 bg-[#1F2937] text-white uppercase flex gap-1 items-center ${filterBy === '' ? 'justify-between' : 'justify-end'} text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151] w-full`}
                        onClick={() => {
                            setShowConversionFilter(!showConversionFilter);
                            setFilterBy('')
                        }}
                        >
                            {
                            filterBy === '' ?
                                <Check color="#28C76F" size={16} />
                            : null
                            }
                            all
                        </button>
                    </div>

                    <div className="w-full group relative">
                        <button className="py-1.5 px-4 bg-[#1F2937] text-white uppercase flex gap-1 items-center justify-between text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151] w-full"
                        >
                            <GoChevronLeft size={16} />
                            assets
                        </button>
                        <div className="hidden group-hover:flex flex-col absolute top-0 left-[-80px] z-20 w-[80px]">
                        {
                        props.filterAssets ?
                        props.filterAssets.map((asset, index) => (
                            <button className="py-1.5 px-4 bg-[#1F2937] text-white flex gap-1 items-center justify-between capitalize text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151] z-20 w-full" key={index}
                            onClick={() => {
                            setShowConversionFilter(!showConversionFilter);
                            setFilterBy(asset.fromCoin.toUpperCase())
                            }}
                            >
                            {asset.fromCoin}
                            {
                                asset.fromCoin.toUpperCase() === filterBy ?
                                <Check color="#28C76F" size={16} />
                                : null
                            }
                            </button>
                        ))
                        :
                        <button className="py-1.5 px-4 bg-[#1F2937] text-white uppercase flex gap-1 items-center text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151]"
                            onClick={() => {
                            setShowConversionFilter(!showConversionFilter);
                            }}
                            >
                            n/a
                        </button>
                        }
                        </div>
                    </div>

                    <div className="w-full group relative">
                        <button className="py-1.5 px-4 bg-[#1F2937] text-white uppercase flex gap-1 items-center justify-between text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151] w-full"
                        >
                            <GoChevronLeft size={16} />
                            transaction
                        </button>
                        <div className="hidden group-hover:flex flex-col absolute top-0 left-[-80px] z-20 w-[80px]">
                        {
                        props.filterAssets ?
                        props.filterAssets.map((asset, index) => (
                            <button className="py-1.5 px-4 bg-[#1F2937] text-white flex gap-1 items-center justify-between capitalize text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151] z-20 w-full" key={index}
                            onClick={() => {
                            setShowConversionFilter(!showConversionFilter);
                            setFilterBy(asset.fromCoin.toUpperCase())
                            }}
                            >
                            {
                                asset.fromCoin === 'USDT' ?
                                'sell' : 'buy'
                            }
                            {
                                asset.fromCoin.toUpperCase() === filterBy ?
                                <Check color="#28C76F" size={16} />
                                : null
                            }
                            </button>
                        ))
                        :
                        <button className="py-1.5 px-4 bg-[#1F2937] text-white uppercase flex gap-1 items-center text-[12px]/[18px] tracking-[-0.48px] cursor-pointer border-t border-[#374151]"
                            onClick={() => {
                            setShowConversionFilter(!showConversionFilter);
                            }}
                            >
                            n/a
                        </button>
                        }
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>
            <div className="rounded-[16px] rounded-t-none border border-[#374151] !overflow-hidden bg-[#161B22]">
            <div className="max-h-[600px] overflow-y-scroll">
                <table className="table-auto w-full">
                <thead className="sticky top-0 bg-[#161B22] z-10">
                    <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-b border-[#374151]`}>
                        <th className='text-start py-5 ps-5 capitalize'>Date</th>
                        <th className='text-start py-5 capitalize'>exchange from</th>
                        <th className='text-start py-5 capitalize'>exchange pair</th>
                        <th className='text-start py-5 capitalize'>transaction type</th>
                        <th className='text-start py-5 capitalize'>sell</th>
                        <th className='text-start py-5 capitalize'>buy</th>
                        <th className='text-start py-5 capitalize'>value @ exchange time</th>
                        <th className='text-start py-5 capitalize'>current value of coin</th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        props.exchangeHistory && props.exchangeHistory.length > 0 ?
                        props.exchangeHistory.filter((exchange) => filterBy !== '' ? exchange.fromCoin === filterBy || exchange.toCoin === filterBy : exchange).map((exchange, index) => (
                        <tr key={index} className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151] hover:bg-[#1F2937] cursor-pointer`}>
                            <td className='py-5 capitalize ps-5'>
                                {new Date(Number(exchange.exchangeTime)).toDateString()}
                            </td>
                            <td className='py-5 flex gap-1'>
                                <span className="uppercase">{exchange.fromCoin}</span>
                            </td>
                            <td className='py-5'>
                                {exchange.fromCoin.toUpperCase()}/{exchange.toCoin.toUpperCase()}
                            </td>
                            <td className='py-5 uppercase'>
                                {
                                exchange.fromCoin === 'USDT' ? 
                                <span className="text-[#00AC4F]">buy</span> : <span className="text-[#FBBF24]">sell</span>
                                }
                            </td>
                            <td className='py-5 '>
                                {Number(exchange.fromAmount).toFixed(2) + ' ' + exchange.fromCoin}
                            </td>
                            <td className='py-5 '>
                                {Number(exchange.toAmount).toFixed(2) + ' ' + exchange.toCoin}
                            </td>
                            <td className='py-5 capitalize'>
                                {
                                exchange.fromCoin === 'USDT' ? 
                                '$' + (
                                    Number(exchange.fromAmount)/Number(exchange.toAmount)
                                ).toFixed(2) + '/' + exchange.toCoin : ''
                                }
                            </td>
                            <td className='py-5 capitalize'>
                                {/* Find the current value of the coin in liveData */}
                                {
                                (() => {
                                    const market = props.liveData.find(
                                    (item) => item.symbol.toUpperCase() === exchange.toCoin.toUpperCase() + "USDT"
                                    );
                                    return market
                                    ? (`$${Number(market.latestPrice).toFixed(2)}` + '/' + exchange.toCoin)
                                    : 'N/A';
                                })()
                                }
                            </td>
                        </tr> 
                        ))
                        : 
                        <tr className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151]`}>
                            <td className='w-[200px] px-5' colSpan={6}>
                                <div className="h-full w-full flex items-center justify-center p-5">
                                    <p className="capitalize text-white text-[16px]/[24px] font-medium">
                                        no data to display
                                    </p>
                                </div>
                            </td>
                        </tr> 
                    }
                </tbody>
                <tfoot>
                <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-t border-[#374151]`}>
                    <TablePagination
                    className={`!text-white`}
                    color="white"
                    count={props.exchangeHistory.length}
                    page={0}
                    rowsPerPage={10}
                    onPageChange={() => {}}
                    onRowsPerPageChange={(e) => {
                        setSlice(Number(e.target.value))
                    }}
                    rowsPerPageOptions={[10,20,30,50,100]}
                    />
                </tr>
                </tfoot>
                </table>
            </div>
            </div>     
        </div>
    )
}

export default ConversionHistory