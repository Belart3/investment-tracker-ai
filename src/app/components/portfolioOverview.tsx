import React from 'react'
import TimeFilter from './timeFilter'
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

interface Asset {
    coin: string;
    walletBalance: string;
    cumRealisedPnl: string;
    asset?: {
        coin: string;
        usdValue: string;
        walletBalance: string;
        cumRealisedPnl: string ;
    }[];
}

interface Balance {
    accountType?: string;
    balance?: string;
    totalAssets?: number | string;
    asset?: Asset[];
}

const PortfolioOverview = () => {
    const [balance, setBalance] = useState<Balance>({})

    useEffect(() => {
        async function loadBalance() {
        const res = await fetch('/api/balance');
        const data = await res.json();

        setBalance(data || null); 
            console.log('Balance data set:', data );
        }

        loadBalance()
    },[])

    const cumRealisedPnl = balance?.asset?.[0]?.cumRealisedPnl || 0;
    const labels = balance ? balance.asset?.map((item: any) => item.coin) : []
    const labelValue = balance ? balance.asset?.map((item) => item.asset?.map((item) => item.usdValue)) : []
    const totalBalance = balance ? balance.asset?.reduce((acc: number, item: any) => acc + parseFloat(item.usdValue || '0'), 0).toFixed(2) : 0;
    return (
        <div className=" bg-[#161B22] rounded-[16px] flex flex-col justify-center col-span-2 row-span-1 border border-[#374151] ">
            <div className="flex items-center justify-between p-5">
                <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Overview</h3>
                <TimeFilter />
            </div>
            {
                balance && balance.asset && balance.asset.length > 0 ? (
                <div className="flex items-center justify-between p-5 border-t border-[#374151]">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                            Account Type
                        </h4>
                        <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                        {
                            balance.accountType 
                        }
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                        Total Balance
                        </h4>
                        <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                        { 
                            '$' + totalBalance 
                        }
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                            Realized PnL
                        </h4>
                        <p className={`text-[27px]/[27px] tracking-[-1.62px] font-semibold ${cumRealisedPnl && Number(cumRealisedPnl) >= 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                        {
                            parseFloat(Number(cumRealisedPnl).toFixed(2)) + '%'
                        }
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                        {
                            balance.totalAssets 
                        }
                        </h4>
                        <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                        {
                            balance.totalAssets
                        }
                        </p>
                    </div>
                </div>
                ) :   
                <div className='flex p-5 justify-between gap-5 border-t border-[#374151]'>
                    <div className="flex flex-col">
                        <Skeleton variant="text" width={100} height={20} animation="pulse" sx={{bgcolor: '#374151', borderRadius: 0}}></Skeleton>
                        <Skeleton variant="text" width={60} height={20} animation="pulse" sx={{bgcolor: '#374151', borderRadius: 0}}></Skeleton>
                    </div>
                    <div className="flex flex-col">
                        <Skeleton variant="text" width={100} height={20} animation="pulse" sx={{bgcolor: '#374151', borderRadius: 0}}></Skeleton>
                        <Skeleton variant="text" width={60} height={20} animation="pulse" sx={{bgcolor: '#374151', borderRadius: 0}}></Skeleton>
                    </div>
                    <div className="flex flex-col">
                        <Skeleton variant="text" width={100} height={20} animation="pulse" sx={{bgcolor: '#374151', borderRadius: 0}}></Skeleton>
                        <Skeleton variant="text" width={60} height={20} animation="pulse" sx={{bgcolor: '#374151', borderRadius: 0}}></Skeleton>
                    </div>
                </div>
            }
        </div>
    )
}

export default PortfolioOverview