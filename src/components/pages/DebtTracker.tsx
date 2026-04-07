'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { AiOutlineEdit } from 'react-icons/ai'
import { GoPlus } from 'react-icons/go'
import { MdDelete, MdOutlinePersonOutline } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TbCurrencyNaira } from 'react-icons/tb'
import { AiOutlineDisconnect } from 'react-icons/ai';
import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Filler,
    Tooltip,
    Legend,
    LogarithmicScale
} from 'chart.js';

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, BarElement, LogarithmicScale, Title, Filler, Tooltip, Legend);
import AddDebtModal from '../ui/AddDebtModal'
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { ChevronRight, MoreHorizontal, PencilIcon } from 'lucide-react'


interface DebtTrackerProps {
    user?: { 
    name?: string ,
        email?: string,
        userId: string
    } | null;

    debts?: {
        id: string;
        item: string;
        amount: number;
        name: string;
        createdAt: Date;
    }[];
};


const DebtTracker = ({ user, debts }: DebtTrackerProps) => {
    const [showAddDebtModal, setShowAddDebtModal] = useState(false);
    const [showActionMenu, setShowActionMenu] = useState<boolean>(false);
    const [openRow, setOpenRow] = useState<number | null>(null);
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);
    const name = user ? user.name : 'User';

    const handleActionResponse = (response: any) => {
        if (response?.type === "error") toast.error(response?.message, { position: "bottom-right" });
        if (response?.type === "info") toast.info(response?.message, { position: "bottom-right" });
    };


    return (
        (debts ?? []).length > 0 ? (
            <div className="xl:ms-[237px] bg-[#0D1117] relative pb-15 flex flex-col items-center justify-center">
                <div className="border-b border-[#374151] bg-[#161B22] w-full p-5">
                    <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
                        <h2 className="text-white font-semibold text-lg lg:text-[27px]/[27px] tracking-[-1.62px] capitalize">
                            outstanding balances
                        </h2>
                        <div className="flex items-center justify-between">
                            <button className="bg-transparent text-[#28C76F] text-[14px]/[14px] font-semibold tracking-[-0.56px] capitalize text-center px-6 py-2 transition-colors rounded-0-[12px] flex items-center gap-2 border !border-[#28C76F] cursor-pointer" onClick={() => setShowAddDebtModal(true)}>
                                <GoPlus size={24} />
                                log my debt
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-[1440px] xl:mx-auto min-h-[80vh] px-5'>
                    <div className="flex flex-col">
                        <div className="mt-[42px] flex flex-col lg:flex-row gap-5 h-fit">
                            {/* debts overview */}
                            <div className="grid grid-cols-2 gap-4 h-[300px] w-full lg:w-3/7">
                                <div className="flex flex-col justify-center items-center gap-2 bg-[#161B22] rounded-0-[16px] border border-[#374151]">
                                    <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                        total amount owed
                                    </h4>
                                    <p className="text-[27px]/[27px] tracking-[-1.62px] text-[#FBBF24] font-semibold flex">
                                        <TbCurrencyNaira size={27} /> {debts?.reduce((total, debt) => total + debt.amount, 0) ?? 0}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 bg-[#161B22] rounded-0-[16px] border border-[#374151]">
                                    <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                        no of people owed
                                    </h4>
                                    <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold flex">
                                        <MdOutlinePersonOutline size={27} />  {debts?.length}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 bg-[#161B22] rounded-0-[16px] border border-[#374151]">
                                    <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                        biggest debt
                                    </h4>
                                    <p className="text-[27px]/[27px] tracking-[-1.62px] text-[#E60000] font-semibold flex">
                                        <TbCurrencyNaira size={27} /> {debts?.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)?.amount ?? 0}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-2 bg-[#161B22] rounded-0-[16px] border border-[#374151]">
                                    <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                        smallest debt
                                    </h4>
                                    <p className="text-[27px]/[27px] tracking-[-1.62px] text-[#00AC4F] font-semibold flex">
                                        <TbCurrencyNaira size={27} /> {debts?.reduce((prev, current) => (prev.amount < current.amount) ? prev : current)?.amount ?? 0}
                                    </p>
                                </div>
                            </div>
                            {/* debtee bar chart */}
                            <div className="bg-[#161B22] rounded-0-[16px] flex flex-col justify-items-start col-span-1 row-span-2 border border-[#374151] w-full lg:w-4/7 max-h-[400px]">
                                <div className="flex items-center justify-between p-5 border-b border-[#374151]">
                                    <h3 className="text-white text-[16px]/[16px] font-medium capitalize">
                                        debts Overview
                                    </h3>
                                </div> 
                                <div className=" !h-full !w-full px-1 py-2 flex items-center justify-center lg:px-4">
                                    {
                                    (debts ?? []).length > 0 ? 
                                    <Bar 
                                        data={{
                                        labels: (debts ?? []).map((debt) => debt.name),
                                        datasets: [
                                            {
                                                label: 'Amt Owed',
                                                data: (debts ?? []).map((debt) => debt.amount),
                                                backgroundColor: ['#FF638420','#36A2EB20','#FFCE5620','#4BC0C020','#9966FF20','#FF9F4020','#C9CBCE20','#00CD5620','#7848D420','#EC706320'],
                                                hoverBackgroundColor: ['#FF638480','#36A2EB80','#FFCE5680','#4BC0C080','#9966FF80','#FF9F4080','#C9CBCE80','#00CD5680','#7848D480','#EC706380'],
                                                borderColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                                                borderWidth: 1,
                                                borderRadius: 0,
                                                borderSkipped: false,
                                            },
                                        ],
                                        
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                            legend: {
                                                display: false,
                                            },
                                            },
                                            scales: {
                                            x: {
                                                grid: {
                                                    display: false,
                                                },
                                                ticks: {
                                                    color: '#9E9E9E',
                                                font: {
                                                    size: 12,
                                                }
                                                },
                                            },
                                            y: {
                                                type: 'logarithmic',
                                                grid: {
                                                    color: '#374151',
                                                },
                                                ticks: {
                                                    color: '#9E9E9E',
                                                font: {
                                                    size: 12,
                                                }
                                                },
                                            },
                                            },        
                                        }}
                                    /> : <div className="h-full w-full flex items-center justify-center"><p className="text-white text-[24px]/[24px] font-medium capitalize">no data to display</p></div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center col-span-2 gap-5 mt-10 mb-10">
                            {/* action buttons */}
                            <div className="flex items-center justify-end gap-8">
                                {/* add debt button */}
                                <button className={`bg-transparent text-[#28C76F] text-[16px]/[16px] font-semibold tracking-[-0.64px] capitalize text-center transition-colors flex items-center gap-2 cursor-pointer`} onClick={() => setShowAddDebtModal(true)}>
                                    <GoPlus size={24} />
                                    add debt
                                </button>
                                {/* edit debt button */}
                                <button className={`bg-transparent  ${!checked ? 'text-[#6B7280] cursor-not-allowed' : 'text-[#28C76F] cursor-pointer'} text-[16px]/[16px] font-semibold tracking-[-0.64px] capitalize text-center transition-colors flex items-center gap-2`}  disabled={!checked}>
                                    <AiOutlineEdit size={24} />
                                    edit
                                </button>
                                {/* delete button */}
                                <button className={`bg-transparent  ${!checked ? 'text-[#6B7280] cursor-not-allowed' : 'text-[#28C76F] cursor-pointer'} text-[16px]/[16px] font-semibold tracking-[-0.64px] capitalize text-center transition-colors flex items-center gap-2`}  disabled={!checked}>
                                    <RiDeleteBinLine size={24} />
                                    delete
                                </button>
                            </div>
                            {/* table container */}
                            <div className=" bg-[#161B22] flex flex-col justify-center">
                                <div className="rounded-0-[16px] border border-[#374151] !overflow-hidden">
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-b border-[#374151]`}>
                                                <th className='max-w-12 lg:w-[200px]'></th>
                                                <th className='py-2 md:py-4 xl:py-5 ps-2 text-sm md:text-md font-medium xl:ps-5 capitalize text-start md:text-start'>Name</th>
                                                <th className='py-2 md:py-4 xl:py-5 ps-2 text-sm md:text-md font-medium xl:ps-5 capitalize text-start md:text-start'>Date</th>
                                                <th className='py-2 md:py-4 xl:py-5 ps-2 text-sm md:text-md font-medium xl:ps-5 capitalize text-start md:text-start'>min amt.</th>
                                                <th className='py-2 md:py-4 xl:py-5 ps-2 text-sm md:text-md font-medium xl:ps-5 capitalize text-start md:text-start'>max amt.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (debts ?? []).length > 0 ?
                                                (debts ?? []).map((data, index:number) => {
                                                    const isOpen = openRow === index;
                                                    return(<React.Fragment key={index}>
                                                        <tr className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151] hover:bg-[#1F2937] cursor-pointer select-none ${isOpen ? 'bg-[#1F2937]' : ''}`} onClick={() => {
                                                            setOpenRow(isOpen ? null : index)
                                                        }}>
                                                        <td className='max-w-12 lg:w-[100px] px-2 lg:px-5'>
                                                            <ChevronRight className={`transition-transform duration-200 ease-in-out text-[#9d9d9d] size-4 lg:size-6 ${isOpen ? 'rotate-90' : ''}`} />
                                                            {/* <input type="checkbox" id={`check-${index}`} checked={selectedId === index} className='size-[16px] appearance-none checked:bg-[#28C76F] border border-[#374151] rounded-0-[4px]' /> */}
                                                        </td>
                                                        <td className='py-4 lg:py-5 text-sm lg:text-lg'>{data.name}</td>
                                                        <td className='py-4 lg:py-5 text-sm lg:text-lg'>
                                                            {
                                                                new Date(data.createdAt).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })
                                                            }
                                                        </td>
                                                        <td className='py-4 lg:py-5 text-sm lg:text-lg'>
                                                            {
                                                                data.name
                                                            }
                                                        </td>
                                                        <td className='py-4 lg:py-5 text-sm lg:text-lg'>
                                                            {
                                                                data.amount
                                                            }
                                                        </td>
                                                        <td className='py-4 lg:py-5 text-sm lg:text-lg'>
                                                            {

                                                            }
                                                        </td>
                                                        </tr> 
                                                        {
                                                            isOpen  ? (
                                                                debts?.filter(debt => debt.name === data.name).map((debtItem, subIndex) => {
                                                                    const isActive = subIndex === openMenu;
                                                                    return (
                                                                        <tr key={subIndex} className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151] bg-[#111827]`}>
                                                                            <td className='max-w-12 lg:w-[200px]'></td>
                                                                            <td className='py-2 lg:py-5 text-sm lg:text-lg capitalize'>- {debtItem.item}</td>
                                                                            <td className='py-2 lg:py-5 text-sm lg:text-lg'>
                                                                                {
                                                                                    new Date(debtItem.createdAt).toLocaleDateString('en-US', {
                                                                                        year: 'numeric',
                                                                                        month: 'short',
                                                                                        day: 'numeric',
                                                                                    })
                                                                                }
                                                                            </td>
                                                                            <td className='py-2 lg:py-5 text-sm lg:text-lg'>
                                                                                {
                                                                                    debtItem.amount
                                                                                }
                                                                            </td>
                                                                            <td className='py-2 lg:py-5 text-sm lg:text-lg'>
                                                                                {
                                                                                    debtItem.amount
                                                                                }
                                                                            </td>
                                                                            <td className='py-2 lg:py-5 cursor-pointer relative'>
                                                                                <MoreHorizontal className='text-[#9d9d9d] hover:bg-[#28C76F] hover:text-white transition-colors duration-200 ease-in-out rounded-0-xs size-5 lg:size-6' onClick={() => {
                                                                                    setOpenMenu(isActive ? null : subIndex)
                                                                                    console.log(subIndex)
                                                                                }} />
                                                                                <div className={` ${isActive  ? 'absolute' : 'hidden'} bg-white z-[999999] rounded-0-md shadow-lg mt-2`}>
                                                                                    <div className="py-1 w-full">
                                                                                        <button className="block px-2 py-1 lg:px-4 lg:py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 w-full cursor-pointer transition-all duration-200 ease-in-out">
                                                                                            <PencilIcon size={16}  className="inline mr-2 mb-1 " />
                                                                                            Edit
                                                                                        </button>
                                                                                        <button className="block px-2 py-1 lg:px-4 lg:py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 w-full cursor-pointer transition-all duration-200 ease-in-out">
                                                                                            <MdDelete size={16}  className="inline mr-2 mb--4" />
                                                                                            Delete
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            ) : null
                                                        }
                                                    </React.Fragment>)
                                                })
                                                : 
                                                <tr className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151]`}>
                                                    <td className='w-[200px] px-5' colSpan={6}>
                                                        <div className="h-full w-full flex items-center justify-center p-5">
                                                            <p className="capitalize text-white text-[16px]/[24px] font-medium">
                                                                no data to display
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr> 
                                            }
                                        </tbody>
                                    </table>
                                </div>     
                            </div>
                        </div>
                    </div>
                    {/* add debt modal */}
                    <AddDebtModal showAddDebtModal={showAddDebtModal} setShowAddDebtModal={setShowAddDebtModal} handleActionResponse={handleActionResponse} />
                    <ToastContainer position='bottom-right' icon={({ type, theme }) => {
                        switch (type) {
                            case 'error':
                            return <AiOutlineDisconnect className="stroke-white" />;
                            default:
                            return null;
                        }
                    }}  />
                </div>
            </div>
            )
            :   
            <div className='xl:ms-[237px] bg-[#0D1117] relative pb-15 mt-20 flex flex-col items-center justify-center h-[80vh]'>
                <h2 className="text-white font-semibold text-[27px]/[27px] tracking-[-1.62px] capitalize mb-5">
                    no outstanding balances
                </h2>
                <button className="bg-transparent text-[#28C76F] text-[14px]/[14px] font-semibold tracking-[-0.56px] capitalize text-center px-6 py-2 transition-colors rounded-0-[12px] flex items-center gap-2 border !border-[#28C76F] cursor-pointer" onClick={() => setShowAddDebtModal(true)}>
                    <GoPlus size={24} />
                    log my debt
                </button>
                {/* add debt modal */}
                <AddDebtModal showAddDebtModal={showAddDebtModal} setShowAddDebtModal={setShowAddDebtModal} handleActionResponse={handleActionResponse} />
                <ToastContainer position='bottom-right' icon={({ type, theme }) => {
                    switch (type) {
                        case 'error':
                        return <AiOutlineDisconnect className="stroke-white" />;
                        default:
                        return null;
                    }
                }}  />
            </div>
        )
}
export default DebtTracker;