import React, { useState } from 'react'
import TablePagination from '@mui/material/TablePagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TokenIcon } from '@web3icons/react'

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
    const [filterByAsset, setFilterByAsset] = useState('');
    const [filterByTransaction, setFilterByTransaction] = useState('');
    const [slice, setSlice] = useState(10);
    return (
        <div className="flex flex-col justify-start space-y-2 order-4 bg-[#161B22] border border-[#374151] rounded-[16px]">
            <div className="flex flex-col gap-1 items-start md:flex-row md:items-center justify-between px-2 py-4 xl:p-5">
                <h2 className="text-white capitalize">conversion history</h2>
                <div className="flex items-center md:items-center justify-end gap-4 w-full">
                    <div className="flex flex-col gap-1">
                        <p className="text-white text-xs capitalize hidden md:block">asset</p>
                        <Select onValueChange={(value) => {
                            setFilterByAsset(value.toUpperCase());
                        }}>
                            <SelectTrigger className="w-[250px] border !border-[#374151] !bg-[#1F2937] !text-white !rounded-sm h-8 cursor-pointer !p-1">
                                <SelectValue placeholder="Assets" />
                            </SelectTrigger>
                            <SelectContent className='!bg-[#1F2937] !border !border-[#374151] !text-white !rounded-sm'>
                                {
                                    props.filterAssets && props.filterAssets.length > 0 ?
                                    props.filterAssets.map((asset, index) => (
                                        <SelectItem value={asset.fromCoin} className='!rounded-sm cursor-pointer capitalize flex items-center gap-1' key={index}>
                                            <TokenIcon
                                            symbol={asset.fromCoin.toUpperCase()}
                                            size={20}
                                            variant='branded'
                                            />
                                            {asset.fromCoin}
                                        </SelectItem>
                                    )) : 'no data'
                                }
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-white text-xs capitalize hidden md:block">transaction</p>
                        <Select onValueChange={(value) => {
                            setFilterByAsset(value.toUpperCase());
                            }}
                        >
                            <SelectTrigger className="w-[180px] border !border-[#374151] !bg-[#1F2937] !text-white !rounded-sm h-8 cursor-pointer !px-2">
                                <SelectValue className='capitalize' placeholder='Transaction' />
                            </SelectTrigger>
                            <SelectContent className='!bg-[#1F2937] !border !border-[#374151] !text-white !rounded-sm'>
                                {
                                    props.filterAssets && props.filterAssets.length > 0 ?
                                    ['Buy', 'Sell'].map((transaction, index) => (
                                        <SelectItem value={transaction} className='!rounded-sm cursor-pointer capitalize' key={index}>
                                            {transaction}
                                        </SelectItem>
                                    )) : 'no data'
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="rounded-[16px] rounded-t-none border border-[#374151] !overflow-hidden bg-[#161B22]">
                <div className="max-h-[600px] overflow-y-scroll">
                    <table className="table-auto w-full">
                    <thead className="sticky top-0 bg-[#161B22] z-10">
                        <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-b border-[#374151]`}>
                            <th className='py-2 xl:py-5 ps-2 xl:ps-5 capitalize text-end'>Date</th>
                            <th className='py-2 xl:py-5 capitalize hidden md:flex text-end'>exchange from</th>
                            <th className='py-2 xl:py-5 capitalize text-end'>pair</th>
                            <th className='py-2 xl:py-5 capitalize text-end'>type</th>
                            <th className='py-2 xl:py-5 capitalize text-end'>sell</th>
                            <th className='py-2 xl:py-5 capitalize text-end'>buy</th>
                            <th className='py-2 xl:py-5 capitalize text-end'>rate</th>
                            <th className='py-2 xl:py-5 capitalize text-end hidden md:block'>current value of coin</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            props.exchangeHistory && props.exchangeHistory.length > 0 ?
                            props.exchangeHistory.filter((exchange) => filterByAsset !== '' ? exchange.fromCoin === filterByAsset || exchange.toCoin === filterByAsset : exchange).map((exchange, index) => (
                            <tr key={index} className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151] hover:bg-[#1F2937] cursor-pointer`}>
                                <td className='py-1 xl:py-5 capitalize ps-2 xl:ps-5 text-sm md:text-xl text-end px-[2px]'>
                                    {new Date(Number(exchange.exchangeTime)).toDateString()}
                                </td>
                                <td className='py-1 xl:py-5 xl:gap-1 items-center hidden md:flex text-end px-[2px]'>
                                    <TokenIcon
                                        symbol={exchange.fromCoin.toUpperCase()}
                                        size={20}
                                        variant='branded'
                                    />
                                    <span className="uppercase">{exchange.fromCoin}</span>
                                </td>
                                <td className='py-1 xl:py-5 text-sm md:text-lg text-end px-[2px]'>
                                    {exchange.fromCoin.toUpperCase()}/{exchange.toCoin.toUpperCase()}
                                </td>
                                <td className='py-1 xl:py-5 uppercase text-sm md:text-lg w-fit text-end px-[2px]'>
                                    {
                                    exchange.fromCoin === 'USDT' ? 
                                    <span className="text-[#00AC4F]">buy</span> : <span className="text-[#FBBF24]">sell</span>
                                    }
                                </td>
                                <td className='py-1 xl:py-5 px-[2px]'>
                                    <span className="flex items-center xl:gap-1 text-sm md:text-lg text-end">
                                        <TokenIcon
                                            symbol={exchange.fromCoin.toUpperCase()}
                                            size={20}
                                            variant='branded'
                                        />
                                        <span className="uppercase">
                                        {
                                            Number(exchange.fromAmount).toFixed(2) + ' ' + exchange.fromCoin
                                        }
                                        </span>
                                    </span>
                                </td>
                                <td className='py-1 xl:py-5 gap-1 text-sm md:text-lg text-end px-[2px] flex items-center justify-end'>
                                    <TokenIcon
                                        symbol={exchange.toCoin.toUpperCase()}
                                        size={20}
                                        variant='branded'
                                    />
                                    {
                                        Number(exchange.toAmount).toFixed(2) + ' ' +exchange.toCoin
                                    }
                                </td>
                                <td className='py-1 xl:py-5 capitalize text-sm md:text-lg text-end px-[2px]'>
                                    {
                                    exchange.fromCoin === 'USDT' ? 
                                    '$' + (
                                        Number(exchange.fromAmount)/Number(exchange.toAmount)
                                    ).toFixed(2) + '/' + exchange.toCoin : ''
                                    }
                                </td>
                                <td className='py-1 xl:py-5 capitalize hidden md:block text-sm md:text-lg text-end px-[2px]'>
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