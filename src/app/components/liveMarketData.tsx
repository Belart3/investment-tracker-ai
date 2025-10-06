import React from "react";
import Marquee from "react-fast-marquee";
import { IoTriangleSharp } from "react-icons/io5";
import TimeFilter from "./timeFilter";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

type MarketDatum = {
    symbol: string;
    latestPrice: number;
    percIncr: number;
    volume?: number; 
};


const LiveMarketData = () => {
    useEffect(() => {
        async function loadMarketData() {
            const res = await fetch('/api/liveMarketData');
            const marketData = await res.json();
            setLiveData(marketData || null); 
            //console.log('Market data loaded:', marketData || null);
        }    
        loadMarketData()
    },[])
    const [liveData, setLiveData] = useState<MarketDatum[]>([])
    const data = liveData || [];
    const spotData = data.filter((item) => !item.symbol.includes('-'))
    const sortedData = spotData.sort((a, b) => (b.latestPrice ?? 0) - (a.latestPrice ?? 0));
    const topAssets = sortedData.slice(0, 20);

    return (
        <div className="border-b border-[#374151] bg-[#161B22] p-5 w-[calc(100%-237px)] flex items-center gap-2.5 fixed top-0 right-0">
            <TimeFilter />
            <Marquee
                gradient
                gradientColor="#161B22"
                gradientWidth={50}
            >
                {
                    topAssets.length > 0 ? 
                    topAssets.map((data, index) => (
                        <div key={index} className="flex items-center gap-1 me-5">
                            <p className="uppercase text-[14px]/[21px] text-white tracking-[-0.56px] font-bold">
                                {data.symbol.replace('USDT', '')}
                            </p>
                            <p className={`uppercase text-[14px]/[21px] tracking-[-0.56px] font-normal ${data.percIncr > 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                                ${data.latestPrice}
                            </p>
                            <div className="flex gap-1 items-center">
                                {
                                    data.percIncr > 0 ? (
                                        <IoTriangleSharp size={6} color="#22C55E" className="translate-y-[-25%]" />
                                    ) : (
                                        <IoTriangleSharp size={6} color="#B91C1C" className="translate-y-[0%] rotate-180" />
                                    )
                                }
                                <p className={`uppercase text-[14px]/[21px] text-[#22C55E] tracking-[-0.56px] font-normal ${data.percIncr > 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                                    {(data.percIncr*100).toFixed(2).toString().replace(/-/g,'')}%
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
