import React from 'react'
import TimeFilter from './timeFilter'

interface Asset {
    coin: string;
    walletBalance: string;
    cumRealisedPnl: string;
}

interface Balance {
    accountType?: string;
    balance?: string;
    totalAssets?: number | string;
    asset?: Asset[];
}

interface Props {
    balance: Balance;
    totalBalance: number | string | undefined;
    cumRealisedPnl: string | number
}


const PortfolioOverview = (props: Props) => {
    return (
        <div className=" bg-[#161B22] rounded-[16px] flex flex-col justify-center col-span-2 row-span-1 border border-[#374151] ">
            <div className="flex items-center justify-between p-5">
                <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Overview</h3>
                <TimeFilter />
            </div>
            <div className="flex items-center justify-between p-5 border-t border-[#374151]">
            <div className="flex flex-col gap-2">
                <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                    Account Type
                </h4>
                <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                {
                    props.balance.accountType ? props.balance.accountType : 'Loading...'
                }
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                Total Balance
                </h4>
                <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                { 
                    props.totalBalance ? '$' + props.totalBalance : 'Loading...' 
                }
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                    Realized PnL
                </h4>
                <p className={`text-[27px]/[27px] tracking-[-1.62px] font-semibold ${props.cumRealisedPnl && Number(props.cumRealisedPnl) >= 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                {
                    props.cumRealisedPnl ? parseFloat(Number(props.cumRealisedPnl).toFixed(2)) + '%' : '0%'
                }
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                {
                    props.balance ? props.balance.totalAssets : 'Loading...'
                }
                </h4>
                <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                {
                    props.balance ? props.balance.totalAssets : 'Loading...'
                }
                </p>
            </div>
            </div>
        </div>
    )
}

export default PortfolioOverview