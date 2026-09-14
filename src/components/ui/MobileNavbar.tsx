'use client'
import { TrendingUp } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { IoReceiptOutline } from 'react-icons/io5'

type Props = {}

const MobileNavbar = (props: Props) => {
    const [active, setActive] = useState<string>("");
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/") {
            setActive("dashboard");
        } else if (pathname === "/asset-tracker") {
            setActive("asset-tracker");
        } else if (pathname === "/track-debts") {
            setActive("track-debts");
        }
    }, [pathname]);

    return (
        <nav className='fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full w-fit bg-[var(--bg-surface)]/95 border border-[var(--border-strong)] shadow-[0_8px_24px_rgba(28,25,23,0.12)] flex xl:hidden z-50 justify-start items-center p-1'>
            <a href="/" className="">
                <div className={`flex flex-col justify-center items-center py-1 w-fit rounded-full transition-all ${active === "dashboard" ? 'bg-[var(--brand-muted)] px-5' : 'px-4'}`} onClick={() => setActive("dashboard")}>
                    <MdDashboard size={22} className={`${active === 'dashboard' ? 'text-[var(--brand)]' : 'text-[var(--text-tertiary)]'}`}/>
                    <p className={`text-[10px] leading-[14px] capitalize ${active === 'dashboard' ? 'text-[var(--brand)] font-semibold' : 'text-[var(--text-secondary)]'}`}>dashboard</p>
                </div>
            </a>
            <a href="/asset-tracker" className="">
                <div className={`flex flex-col justify-center items-center py-1 p-[2px] w-fit rounded-full transition-all ${active === "asset-tracker" ? 'bg-[var(--brand-muted)] px-5' : 'px-4'}`} onClick={() => setActive("asset-tracker")}>
                    <TrendingUp size={22} className={`${active === 'asset-tracker' ? 'text-[var(--brand)]' : 'text-[var(--text-tertiary)]'}`}/>
                    <p className={`text-[10px] leading-[14px] capitalize ${active === 'asset-tracker' ? 'text-[var(--brand)] font-semibold' : 'text-[var(--text-secondary)]'}`}>assets</p>
                </div>
            </a>
            <a href="track-debts" className="">
                <div className={`flex flex-col justify-center items-center py-1 p-[2px] w-fit rounded-full transition-all ${active === "track-debts" ? 'bg-[var(--brand-muted)] px-5' : 'px-4'}`} onClick={() => setActive("track-debts")}>
                    <IoReceiptOutline size={22} className={`${active === 'track-debts' ? 'text-[var(--brand)]' : 'text-[var(--text-tertiary)]'}`}/>
                    <p className={`text-[10px] leading-[14px] capitalize ${active === 'track-debts' ? 'text-[var(--brand)] font-semibold' : 'text-[var(--text-secondary)]'}`}>debts</p>
                </div>
            </a>
        </nav>
    )
}

export default MobileNavbar