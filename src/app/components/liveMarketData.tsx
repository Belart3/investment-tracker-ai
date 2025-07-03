import React from "react";
import Marquee from "react-fast-marquee";
import { IoTriangleSharp } from "react-icons/io5";


type MarketDatum = {
    symbol: string;
    latestPrice: number;
    percIncr: number;
};

type props = {
    marketData?: MarketDatum[];
};

const LiveMarketData = (props: props) => (
    <Marquee >
        {
            props.marketData?.map((data, index) => (
                <div key={index} className="flex items-center gap-1 me-5">
                    <p className="uppercase text-[14px]/[21px] text-white tracking-[-0.56px] font-bold">
                        {data.symbol}
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
                            {data.percIncr.toString().replace(/-/g,'')}%
                        </p>
                    </div>
                </div>
            ))
        }
    </Marquee>
);

export default LiveMarketData;