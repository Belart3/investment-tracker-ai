'use client'
import React, { useContext } from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { SidebarContext } from '@/context/sidebarContext';


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
        <div className={`fixed left-0 top-0 h-screen w-[237px] border-r border-[#374151] flex flex-col gap-8 bg-[#161B22] transition-all ${showSidebar ? 'w-[237px] p-5' : 'w-fit p-2'}`}>
            <div className="w-full flex items-center justify-between">
                {
                    showSidebar && <h1 className="text-white">Investment Tracker AI</h1>
                }
                <button className='rounded-sm p-1 hover:bg-[#374151] transition-colors cursor-pointer' onClick={() => setShowSidebar(!showSidebar)} >
                    {
                        showSidebar ? <GoSidebarCollapse size={20} color='white' /> : <GoSidebarExpand size={20} color='white' />
                    }
                </button>
            </div>
            {
                showSidebar ? 
                <div className="flex flex-col gap-2">
                    <h2 className="text-white">Menu</h2>
                    <div className="flex flex-col gap-1">
                        {
                            routes.map((routes, index) => {
                                const isActive = currentPath === routes.link;
                                return (
                                    <a key={index} href={routes.link} className={`flex items-center gap-2 rounded px-2 py-1 ${isActive ? 'bg-[#28C76F] text-white hover:bg-[#22A85C]' : 'text-[#9CA3AF] hover:bg-[#374151]'} transition-colors`}>
                                        {routes.value === "dashboard" ? <LuLayoutDashboard size={24} className={`${routes.value === "dashboard" ? 'text-white' : 'text-[#6b7280]'}`} /> :  <IoReceiptOutline size={24} color='#fff' />}
                                        <span className="text-[14px]/[21px] font-semibold capitalize">{routes.name}</span>
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