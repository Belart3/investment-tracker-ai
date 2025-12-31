'use client;'
import React from "react";
import Marquee from "react-fast-marquee";
import { IoTriangleSharp } from "react-icons/io5";
import TimeFilter from "./liveMarketTimeFilter";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

type MarketDatum = {
    symbol: string;
    name: string;
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
    status: {
        timestamp: string;
    }
}


const LiveMarketData = () => {
    useEffect(() => {
        async function loadMarketData() {
            const res = await fetch('/api/liveMarketData');
            const data = await res.json();
            setLiveData(data || null); 
            console.log('Market data loaded:', data || null);
        }    
        loadMarketData()
    },[])
    const [liveData, setLiveData] = useState<MarketDatum[]>([])
    const marketData = liveData.length > 0 ? liveData : [];
    const [timeFilter, setTimeFilter] = useState<string>('1h');
    const timeKey = `percent_change_${timeFilter}` as keyof typeof marketData[0]['quote']['USD'];
    console.log('Market Data in LiveMarketData component:', marketData);

    return (
        <div className="border-b border-[#374151] bg-[#161B22] p-2 lg:p-5 flex items-center gap-2.5 fixed top-0 right-0 z-[9999999999] lg:ms-[237px] lg:w-[calc(100%-237px)]">
            <TimeFilter setTimeFilter={setTimeFilter} timefilter={timeFilter} />
            <Marquee
                gradient
                gradientColor="#161B22"
                gradientWidth={50}
            >
                {
                    marketData.length > 0 ? 
                    marketData.map((data, index) => (
                        <div key={index} className="flex items-center gap-1 me-5">
                            <p className="uppercase text-[14px]/[21px] text-white tracking-[-0.56px] font-bold">
                                {data.symbol}
                            </p>
                            <p className={`uppercase text-[14px]/[21px] tracking-[-0.56px] font-normal ${data.quote.USD.percent_change_1h > 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
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
                                <p className={`uppercase text-[14px]/[21px] text-[#22C55E] tracking-[-0.56px] font-normal ${data.quote.USD.percent_change_1h > 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                                    {data.quote.USD[timeKey].toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    ))
                    : 
                    <div className="flex gap-5">
                        { 
                            [1,2,3,4,5,6,7,8,90,2,1].map((item, index) => (
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
