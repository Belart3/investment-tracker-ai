'use client;'
import React from "react";
import Marquee from "react-fast-marquee";
import { IoTriangleSharp } from "react-icons/io5";
import LiveMarketTimeFilter from "./liveMarketTimeFilter";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useMarketData } from "@/hooks/useMarketData";
import { MarketDatum } from "@/types/marketData";

const LiveMarketData = () => {
    const { data: liveData, loading, error } = useMarketData();
    const marketData : MarketDatum[] = liveData.length > 0 ? liveData : [];
    const [timeFilter, setTimeFilter] = useState<string>('1h');
    const timeKey = `percent_change_${timeFilter}` as const;
    const lastUpdated = marketData.length > 0 ? marketData[0].last_updated : '';
    console.log('Market Data in LiveMarketData component:', marketData);

    return (
        <div className="w-full border-b border-[#374151] bg-[#161B22] p-2 lg:p-5 flex items-center gap-1 lg:gap-2.5 sticky top-0 right-0  xl:ms-[237px] xl:w-[calc(100%-237px)] z-50">
            <LiveMarketTimeFilter setTimeFilter={setTimeFilter} timefilter={timeFilter} lastUpdated={lastUpdated} />
            <Marquee 
                gradient
                gradientColor="#161B22"
                gradientWidth={50}
            >
                {
                    !loading ? 
                    marketData.map((data: MarketDatum, index: number) => (
                        <div key={index} className="flex items-center gap-[2px] lg:gap-1 me-5">
                            <p className="uppercase text-xs lg:text-[14px]/[21px] text-white tracking-[-0.56px] font-bold">
                                {data.symbol}
                            </p>
                            <p className={`uppercase text-xs lg:text-[14px]/[21px] tracking-[-0.56px] font-normal ${data.quote.USD.percent_change_1h > 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                                ${data.quote.USD.price.toFixed(2)}
                            </p>
                            <div className="flex gap-1 items-center">
                                {
                                    data.quote.USD.percent_change_1h > 0 ? (
                                        <IoTriangleSharp size={6} color="#22C55E" className="translate-y-[-25%]" />
                                    ) : (
                                        <IoTriangleSharp size={6} color="#B91C1C" className="translate-y-[0%] rotate-180" />
                                    )
                                }
                                <p className={`uppercase text-xs lg:text-[14px]/[21px] text-[#22C55E] tracking-[-0.56px] font-normal ${data.quote.USD.percent_change_1h > 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                                    {(data.quote.USD[timeKey as keyof typeof data.quote.USD] as number).toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    ))
                    : 
                    <div className="flex gap-5">
                        { 
                            [1,2,3,4,5,6,7,8,90,2,1].map((item: number, index: number) => (
                                <div className="flex gap-1" key={index}>
                                    <Skeleton variant="text" width={30} height={30} sx={{bgcolor: '#374151', borderRadius: 0}} />
                                    <Skeleton variant="text" width={80} height={30} sx={{bgcolor: '#374151', borderRadius: 0}} />
                                    <Skeleton variant="text" width={30} height={30} sx={{bgcolor: '#374151', borderRadius: 0}} />
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
