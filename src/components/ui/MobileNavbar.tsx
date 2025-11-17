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
        <nav className='fixed bottom-[10px] left-1/2 -translate-1/2 rounded-full w-fit backdrop-blur-xs bg-black/10 border border-gray-700 flex lg:hidden z-50 justify-start items-center p-[2px]'>
            <a href="/" className="">
                <div className={`flex flex-col justify-center items-center py-1 w-fit rounded-full transition-all ease-in duration-200 hover:border hover:border-white/20 hover:bg-black/10 hover:backdrop-blur-xl shadow-xl hover:px-5 hover:py-1 ${active === "dashboard" ? 'border border-white/20 bg-black/10 backdrop-blur-xl shadow-xl px-5 py-1' : ' px-4'}`} onClick={() => setActive("dashboard")}>
                    <MdDashboard size={30} className={`${active === 'dashboard' ? 'text-[#22C55E]' : 'text-gray-300'}`}/>
                    <p className={`text-xs capitalize ${active === 'dashboard' ? 'text-[#22C55E]' : 'text-white'}`}>dashboard</p>
                </div>
            </a>
            <a href="/asset-tracker" className="">
                <div className={`flex flex-col justify-center items-center py-1 p-[2px] w-fit rounded-full transition-all ease-in duration-200 hover:border hover:border-white/20 hover:bg-black/10 hover:backdrop-blur-xl shadow-xl hover:px-5 hover:py-1 ${active === "asset-tracker" ? 'border border-white/20 bg-black/10 backdrop-blur-xl shadow-xl px-5 py-1' : 'px-4'}`} onClick={() => setActive("asset-tracker")}>
                    <TrendingUp size={30} className={`${active === 'asset-tracker' ? 'text-[#22C55E]' : 'text-gray-300'}`}/>
                    <p className={`text-xs capitalize ${active === 'asset-tracker' ? 'text-[#22C55E]' : 'text-white'}`}>assets</p>
                </div>
            </a>
            <a href="track-debts" className="">
                <div className={`flex flex-col justify-center items-center py-1 p-[2px] w-fit rounded-full transition-all ease-in duration-200 hover:border hover:border-white/20 hover:bg-black/10 hover:backdrop-blur-xl shadow-xl hover:px-5 hover:py-1 ${active === "track-debts" ? 'border border-white/20 bg-black/10 backdrop-blur-xl shadow-xl px-5 py-1' : 'px-4'}`} onClick={() => setActive("track-debts")}>
                    <IoReceiptOutline size={30} className={`${active === 'track-debts' ? 'text-[#22C55E]' : 'text-gray-300'}`}/>
                    <p className={`text-xs capitalize ${active === 'track-debts' ? 'text-[#22C55E]' : 'text-white'}`}>debts</p>
                </div>
            </a>
        </nav>
    )
}

export default MobileNavbar