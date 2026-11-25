'use client;'
import React from "react";
import Marquee from "react-fast-marquee";
import { IoTriangleSharp } from "react-icons/io5";
import LiveMarketTimeFilter from "./liveMarketTimeFilter";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useMarketData } from "@/hooks/useMarketData";
import { GoDash } from "react-icons/go";

type MarketDatum = {
    symbol: string;
    name: string;
    last_updated: string;
    quote: {
        USD: {
            price: number;
            percent_change_1h: number;
            percent_change_7d: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_60d: number;
            percent_change_90d: number;
        };
        latestPrice: number;
        percIncr: number;
        volume?: number; 
    },
}


const LiveMarketData = () => {
    const { data: liveData, loading, error } = useMarketData();
    const marketData = liveData.length > 0 ? liveData : [];
    const [timeFilter, setTimeFilter] = useState<string>('1h');
    const timeKey = `percent_change_${timeFilter}` as const;
    const lastUpdated = marketData.length > 0 ? marketData[0].last_updated : '';

    return (
        <div className="w-full border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2 lg:px-5 lg:py-3 flex items-center gap-1 lg:gap-2.5 sticky top-0 right-0 xl:ms-[237px] xl:w-[calc(100%-237px)] z-50">
            <LiveMarketTimeFilter setTimeFilter={setTimeFilter} timefilter={timeFilter} lastUpdated={lastUpdated} />
            <Marquee
            >
                {
                    !loading ? 
                    marketData.map((data: MarketDatum, index: number) => (
                        <div key={index} className="flex items-center gap-[4px] lg:gap-2 me-5">
                            <p className="uppercase text-xs lg:text-[13px]/[19px] text-[var(--text-primary)] tracking-[0.01em] font-normal">
                                {data.symbol}
                            </p>
                            <p className={`figure-mono uppercase text-xs lg:text-[13px]/[19px] tracking-[-0.01em] font-medium `}>
                                ${data.quote.USD.price.toFixed(2)}
                            </p>
                            <div className="flex gap-1 items-center">
                                {
                                    data.quote.USD.percent_change_1h > 0 ? (
                                        <IoTriangleSharp size={9} className="text-(--positive)" />
                                    ) : data.quote.USD.percent_change_1h < 0 ? (
                                        <IoTriangleSharp size={9} className="rotate-180 text-(--negative)" />
                                    ) : <GoDash size={9} className="text-(--text-secondary)" />
                                }
                                <p className={`figure-mono uppercase text-xs lg:text-[14px]/[21px] tracking-[-0.56px] font-normal ${data.quote.USD.percent_change_1h > 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}`}>
                                    {Math.abs((data.quote.USD[timeKey as keyof typeof data.quote.USD] as number)).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    ))
                    : 
                    <div className="flex gap-8">
                        { 
                            [1,2,3,4,5,6,7,8,90,2,1].map((item: number, index: number) => (
                                <div className="flex gap-1" key={index}>
                                    <Skeleton variant="text" width={30} height={30} className="bg-(--bg-canvas)" sx={{borderRadius: 0}} />
                                    <Skeleton variant="text" width={80} height={30} className="bg-(--bg-canvas)" sx={{borderRadius: 0}} />
                                    <Skeleton variant="text" width={30} height={30} className="bg-(--bg-canvas)" sx={{borderRadius: 0}} />
                                </div>
                            )) 
                        }
                    </div>
                }
            </Marquee>
        </div>
    )
}

export default LiveMarketData;
