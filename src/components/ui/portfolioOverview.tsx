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
        <div className="bg-[var(--bg-surface)] overflow-scroll xl:overflow-hidden rounded-[8px] flex flex-col justify-center border border-[var(--border-subtle)] shadow-[0_1px_2px_rgba(28,25,23,0.04)] w-full">
            <div className="flex items-center justify-between px-4 py-4 xl:p-5">
                <h3 className="text-[var(--text-primary)] text-[17px] leading-[25px] font-semibold tracking-[-0.005em]">Portfolio Overview</h3>
            </div>
            {
                props.balanceValue ? (
                <div className="flex items-center justify-between gap-4 px-4 py-5 xl:p-5 border-t border-[var(--border-subtle)]">
                    <div className="flex flex-col gap-1 xl:gap-2">
                        <h4 className="type-label text-[var(--text-secondary)]">
                            Category
                        </h4>
                        <p className="text-[17px] leading-[25px] tracking-[-0.005em] text-[var(--text-primary)] font-semibold">
                        {
                            props.accountType
                        }
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 xl:gap-2">
                        <h4 className="type-label text-[var(--text-secondary)]">
                        Equity
                        </h4>
                        <p className="figure-mono text-[22px] leading-7 tracking-[-0.012em] text-[var(--text-primary)] font-medium">
                        { 
                            '$' + props.balanceValue 
                        }
                        </p>
                    </div>
                    <div className="flex flex-col gap-1 xl:gap-2">
                        <h4 className="type-label text-[var(--text-secondary)]">
                            PnL
                        </h4>
                        <p className={`figure-mono text-[22px] leading-7 tracking-[-0.012em] font-medium ${props.pnl && Number(props.pnl) >= 0 ? 'text-[var(--positive)]' : 'text-[var(--negative)]'}`}>
                        {
                            parseFloat(Number(props.pnl).toFixed(2)) + '%'
                        }
                        </p>
                    </div>
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