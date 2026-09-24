import React, { useEffect, useState } from 'react'
import { AssetData } from '@/hooks/useAssetData';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AssetLivePrice, fetchAssetLivePrice } from '@/lib/fetchAssetLivePrice';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'

dayjs.extend(relativeTime);

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
    assets: AssetData[]; 
    totalValue: number;
    totalPnl: number;
    assetNumber: number;
    totalROI: number;
    status?: "live" | "closed" | "deleted";
}

const AssetTrackerTable = (props: Props) => {
    const { assets, totalValue, totalPnl, assetNumber, totalROI, status } = props;
    const filters = [
        { name: 'live assets', value: 'live' },
        { name: 'closed assets', value: 'closed' },
        { name: 'deleted assets', value: 'deleted' },
    ];
    const [activeFilter, setActiveFilter] = useState('live');
    const assetSymbols = assets.map(asset => asset.symbol)
    const filteredAssets = assets.filter(asset => asset.status === activeFilter);
    const [livePrices, setLivePrices] = useState<AssetLivePrice[]>([]);
    console.log(livePrices)

    useEffect(() => {
        if (assetSymbols.length === 0) {
            setLivePrices([]);
            return;
        }

        let requestIsCurrent = true;

        void fetchAssetLivePrice(assetSymbols)
            .then((prices) => {
                if (requestIsCurrent && Array.isArray(prices)) {
                    setLivePrices(prices);
                }
            })
            .catch((error) => {
                if (requestIsCurrent) {
                    console.error("Error fetching live asset prices:", error);
                    setLivePrices([]);
                }
            });

        return () => {
            requestIsCurrent = false;
        };
    }, [assets]);

    return (
        <div className="">
            <div className="flex items-center justify-center mt-8 mb-5 w-fit gap-6">
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => {
                            setActiveFilter(filter.value)
                        }}
                        className={`flex items-center justify-center outline-none ${activeFilter === filter.value ? "border-b-2 border-(--brand)" : "border-b-2 border-transparent"}  px-1 py-0.5 bg-transparent cursor-pointer text-[13px] text-(--text-primary) capitalize ease-linear duration-150 font-semibold tracking-[-0.56px]`}
                    >
                        {filter.name}
                    </button>
                ))}
            </div>
            <div className="max-h-[600px] overflow-y-scroll  border border-(--border-subtle) bg-(--bg-surface) rounded-2xl shadow-(--shadow-card)">
                <table className="table-auto w-full">
                    <thead className="sticky top-0  z-10">
                        <tr className="bg-(--bg-surface-2) border-b border-(--border-subtle) hover:bg-(--bg-surface) ease-in duration-200 cursor-pointer">
                            <th className='text-left text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Asset</th>
                            <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Live Qty</th>
                            <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Avg Cost</th>
                            <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Price</th>
                            <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Invested</th>
                            <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Value</th>
                            <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Pnl</th>
                            <th className='text-right text-[12px]/[16px] font-medium font-mono trackng-[1px] text-(--text-secondary) py-3 px-4'>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredAssets.length > 0 ? (
                                filteredAssets.map((asset) => (
                                    <tr key={asset._id} className="border-b last-of-type:border-0 border-(--border-subtle) hover:bg-(--bg-surface) ease-in duration-200 cursor-pointer">
                                        {/* asset symbol */}
                                        <td className='text-left text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>{asset.symbol}</td>
                                        {/* asset quantity */}
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>{asset.quantity}</td>
                                        {/* asset average cost */}
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>${asset.purchasePrice.toFixed(2)}</td>
                                        {/* asset purchase price*/}
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>${(asset.purchasePrice).toFixed(2)}</td>
                                        {/* asset invested amount  */}
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>${(asset.purchasePrice * asset.quantity).toFixed(2)}</td>
                                        {/* asset value */}
                                        {
                                            livePrices.map(symbol => (     
                                                asset.symbol === symbol.symbol &&
                                                <>
                                                    <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) px-0!'>
                                                        <NumberFlow 
                                                            format={{ 
                                                                style: 'currency', 
                                                                currency: 'USD', 
                                                                trailingZeroDisplay: 'stripIfInteger',
                                                                maximumFractionDigits: 2,
                                                            }} 
                                                            value={Number(
                                                                Number(asset.quantity.toFixed(2)) * Number(symbol.price.toFixed(2))
                                                            )} 
                                                            className="text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4"
                                                        />
                                                    </td>
                                                    {/* asset pnl */}
                                                    <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) px-0!'>
                                                        <NumberFlow 
                                                            format={{ 
                                                                style: 'currency', 
                                                                currency: 'USD', 
                                                                trailingZeroDisplay: 'stripIfInteger',
                                                                maximumFractionDigits: 2,
                                                            }} 
                                                            value={Number(
                                                                (
                                                                asset.quantity * symbol.price
                                                                - 
                                                                asset.purchasePrice * asset.quantity).toFixed(2)
                                                            )} 
                                                            className="text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4"
                                                        />
                                                    </td>
                                                </>
                                            ))
                                        }
                                        {/* last updated */}
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>{dayjs(asset.updatedAt).fromNow()}</td>
                                        {/* actions */}
                                        <td className='text-right text-[13px]/[16px] font-medium font-mono trackng-[1px] text-(--text-primary) py-3 px-4'>{dayjs(asset.updatedAt).fromNow()}</td>
                                    </tr>
                                ))
                            ) :
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-[13px] font-normal text-(--text-secondary)">
                                    No active assets found matching <span className="font-semibold capitalize text-(--text-primary">"{activeFilter}"</span>  assets
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AssetTrackerTable