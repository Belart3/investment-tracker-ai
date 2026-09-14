'use client'
import React, { useContext } from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { SidebarContext } from '@/context/sidebarContext';
import { TrendingUp } from 'lucide-react';


type Props = {}

const routes = [
    {
        name: "Dashboard",
        link: "/",
        value: "dashboard",
    },
    {
        name: "Debts",
        link: "/track-debts",
        value: "debts",
    },
    {
        name: "Asset Tracker",
        link: "/asset-tracker",
        value: "asset-tracker",
    }
]

const FixedSideBar = () => {
    const currentPath = usePathname();
    const { showSidebar, setShowSidebar } = useContext(SidebarContext);
    return (
        <div className={`fixed left-0 top-0 z-40 h-screen border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] hidden xl:flex flex-col gap-10 transition-all ${showSidebar ? 'w-[237px] p-5' : 'w-fit p-2'}`}>
            <div className="w-full flex items-center justify-between">
                {showSidebar && <h1 className="text-[15px] leading-6 tracking-[-0.01em] font-semibold text-[var(--brand)]">Investment Tracker AI</h1>}
                <button aria-label="Toggle sidebar" className='rounded-[8px] p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors cursor-pointer' onClick={() => setShowSidebar(!showSidebar)} >
                    {
                        showSidebar ? <GoSidebarCollapse size={18} /> : <GoSidebarExpand size={18} />
                    }
                </button>
            </div>
            {
                showSidebar ? 
                <div className="flex flex-col gap-2">
                    <h2 className="type-label text-[var(--text-tertiary)] uppercase mb-2">Workspace</h2>
                    <div className="flex flex-col gap-1.5">
                        {
                            routes.map((routes, index) => {
                                const isActive = currentPath === routes.link;
                                return (
                                    <a key={index} href={routes.link} className={`flex items-center gap-3 rounded-[8px] px-3 py-2.5 ${isActive ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)]'} transition-colors`}>
                                        {routes.value === "dashboard" ? <LuLayoutDashboard size={18} /> : routes.value === "asset-tracker" ? <TrendingUp size={18} /> : <IoReceiptOutline size={18} />}
                                        <span className="text-[13px] leading-[19px] font-medium capitalize">{routes.name}</span>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div> : null
            }
        </div>
    )
}

export default FixedSideBar;