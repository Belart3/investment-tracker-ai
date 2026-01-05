import React from 'react'
import TimeFilter from './liveMarketTimeFilter'
import Skeleton from '@mui/material/Skeleton';

type Props = {
    balanceValue: string | number;
    accountType: string | undefined;
    pnl: string;
}

const PortfolioOverview = (props: Props) => {
    
    return (
        <div className=" bg-[#161B22] overflow-scroll xl:overflow-hidden rounded-[16px] flex flex-col justify-center border border-[#374151] w-full">
            <div className="flex items-center justify-between px-2 py-4 xl:p-5">
                <h3 className="text-white text-[16px]/[16px] font-medium">Portfolio Overview</h3>
                {/* <TimeFilter /> */}
            </div>
            {
                props.balanceValue ? (
                <div className="flex items-center justify-between px-2 py-4 xl:p-5 border-t border-[#374151]">
                    <div className="flex flex-col gap-1 xl:gap-2">
                        <h4 className="text-lg xl:text-[12px]/[18px] text-[#D1D5DB]">
                            Category
                        </h4>
                        <p className="text-md xl:text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                        {
                            props.accountType
                        }
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 xl:gap-2">
                        <h4 className="text-lg xl:text-[12px]/[18px] text-[#D1D5DB]">
                        Equity
                        </h4>
                        <p className="text-xl xl:text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                        { 
                            '$' + props.balanceValue 
                        }
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 xl:gap-2">
                        <h4 className="text-lg xl:text-[12px]/[18px] text-[#D1D5DB]">
                            PnL
                        </h4>
                        <p className={`text-xl xl:text-[27px]/[27px] tracking-[-1.62px] font-semibold ${props.pnl && Number(props.pnl) >= 0 ? 'text-[#22C55E]' : 'text-[#B91C1C]'}`}>
                        {
                            parseFloat(Number(props.pnl).toFixed(2)) + '%'
                        }
                        </p>
                    </div>
                    {/* <div className="flex flex-col gap-2">
                        <h4 className="text-[12px]/[18px] text-[#D1D5DB]">
                        {
                            balanceValue.totalAssets 
                        }
                        </h4>
                        <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold">
                        {
                            balanceValue.totalAssets
                        }
                        </p>
                    </div> */}
                </div>
                ) :   
                <div className='flex px-2 py-4 xl:p-5 justify-between gap-5 border-t border-[#374151] max-w-full'>
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