'use client'
import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';


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
    }
]

const FixedSideBar = (props: Props) => {
    const currentPath = usePathname();
    return (
        <div className="fixed left-0 top-0 h-screen w-[237px] border-r border-[#374151] p-5 flex flex-col gap-8 bg-[#161B22]">
            <h1 className="text-white">Investment Tracker AI</h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-white">Menu</h2>
                <div className="flex flex-col">
                    {
                        routes.map((routes, index) => {
                            const isActive = currentPath === routes.link;
                            return (
                                <a key={index} href={routes.link} className={`flex items-center gap-[10px] rounded-[12px] py-2 px-3 ${isActive ? 'bg-[#28C76F] text-white hover:bg-[#22A85C]' : 'text-[#9CA3AF] hover:bg-[#374151]'} transition-colors`}>
                                    {routes.value === "dashboard" ? <LuLayoutDashboard size={24} /> :  <IoReceiptOutline size={24} />}
                                    <span className="text-[14px]/[21px] font-semibold capitalize">{routes.name}</span>
                                </a>
                            )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default FixedSideBar;