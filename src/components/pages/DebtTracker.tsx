'use client'
import { validateUser } from '@/lib/validateUser'
import { Bar } from 'react-chartjs-2'
import { AiOutlineEdit } from 'react-icons/ai'
import { GoPlus } from 'react-icons/go'
import { MdOutlinePersonOutline } from 'react-icons/md'
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
import { useState } from "react";

ChartJS.register(ArcElement, LineElement, CategoryScale, LinearScale, PointElement, BarElement, LogarithmicScale, Title, Filler, Tooltip, Legend);
import dummyData from '@/data/dummyData.json'
import AddDebtForm from '../ui/AddDebtForm';
import { toast, ToastContainer } from 'react-toastify';


type DebtTrackerProps = {
    user?: { 
        name?: string ,
        email?: string
    } | null;
};

const DebtTracker = ({ user }: DebtTrackerProps) => {
    const [showAddDebtModal, setShowAddDebtModal] = useState(false);
    const [checked, setChecked] = useState(false);
    const name = user ? user.name : 'User';

    const handleActionResponse = (type: string, message: string) => {
        if (type === "error") toast.error(message, { position: "bottom-right" });
        if (type === "info") toast.info(message, { position: "bottom-right" });
    };

    return (
        <div className='ms-[237px] bg-[#0D1117] relative pb-15'>
            <div className="border-b border-[#374151] bg-[#161B22] p-5 w-full flex items-center justify-between">
                <h2 className="text-white font-semibold text-[27px]/[27px] tracking-[-1.62px] capitalize">
                    outstanding balances
                </h2>
                <div className="flex items-center justify-between">
                    <button className="bg-transparent text-[#28C76F] text-[14px]/[14px] font-semibold tracking-[-0.56px] capitalize text-center px-6 py-2 transition-colors rounded-[12px] flex items-center gap-2 border !border-[#28C76F] cursor-pointer" onClick={() => setShowAddDebtModal(true)}>
                        <GoPlus size={24} />
                        log my debt
                    </button>
                </div>
            </div>
            <div className="mt-[42px] grid grid-rows-3 grid-cols-1 md:grid-cols-2 gap-5 px-5">
                {/* debts overview */}
                <div className=" bg-[#161B22] rounded-[16px] flex flex-col justify-center col-span-1 row-span-1 border border-[#374151] ">
                    <div className="flex items-center justify-between p-5">
                        <h3 className="text-white text-[16px]/[16px] font-medium capitalize">
                            debts Overview
                        </h3>
                    </div>
                    <div className="flex items-center justify-between p-5 border-t border-[#374151]">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                total amount owed
                            </h4>
                            <p className="text-[27px]/[27px] tracking-[-1.62px] text-[#FBBF24] font-semibold flex">
                                <TbCurrencyNaira size={27} /> 
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                no of people owed
                            </h4>
                            <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold flex">
                                <MdOutlinePersonOutline size={27} /> 
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                biggest debt
                            </h4>
                            <p className="text-[27px]/[27px] tracking-[-1.62px] text-[#E60000] font-semibold flex">
                                <TbCurrencyNaira size={27} /> 
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                smallest debt
                            </h4>
                            <p className="text-[27px]/[27px] tracking-[-1.62px] text-[#00AC4F] font-semibold flex">
                                <TbCurrencyNaira size={27} /> 
                            </p>
                        </div>
                    </div>
                </div>
                {/* debtee bar chart */}
                <div className="bg-[#161B22] rounded-[16px] flex flex-col justify-center col-span-1 row-span-3 border border-[#374151] ">
                    <div className="flex items-center justify-between p-5 border-b border-[#374151]">
                        <h3 className="text-white text-[16px]/[16px] font-medium capitalize">
                            debts Overview
                        </h3>
                    </div>
                    {/* <div className="h-[500px] w-full px-4">
                        {
                            debteeNameList.length > 0 ? 
                            <Bar 
                        data={{
                            labels: debteeNameList,
                            datasets: [
                            {
                                label: 'Amt Owed',
                                data: debteeAmtList,
                                backgroundColor: ['#FF638420','#36A2EB20','#FFCE5620','#4BC0C020','#9966FF20','#FF9F4020','#C9CBCE20','#00CD5620','#7848D420','#EC706320'],
                                hoverBackgroundColor: ['#FF638480','#36A2EB80','#FFCE5680','#4BC0C080','#9966FF80','#FF9F4080','#C9CBCE80','#00CD5680','#7848D480','#EC706380'],
                                borderColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCE','#00CD56','#7848D4','#EC7063'],
                                borderWidth: 1,
                                borderRadius: 10,
                                borderSkipped: false,
                                barThickness: 70,
                            },
                            ],
                        }}
                        options={{
                            responsive: true,
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
                    </div> */}
                </div>
                <div className="flex flex-col justify-center col-span-2 gap-5">
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
                        <div className="rounded-[16px] border border-[#374151] !overflow-hidden">
                            {/* <table className="table-auto w-full">
                                <thead>
                                    <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-b border-[#374151]`}>
                                        <th className='w-[200px]'></th>
                                        <th className='text-start py-5 capitalize'>name</th>
                                        <th className='text-start py-5 capitalize'>total amt. owed</th>
                                        <th className='text-start py-5 capitalize'>min amt. owed</th>
                                        <th className='text-start py-5 capitalize'>max amt. owed</th>
                                        <th className='text-start py-5 capitalize'>no. of items owed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        debtData.length > 0 ?
                                        debtData.map((data, index) => (
                                            <tr key={index} className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151] ${selectedId === data.id ? 'bg-[#1F2937]' : ''}`}>
                                                <td className='w-[200px] px-5'>
                                                    <input type="checkbox" id={`check-${index}`} checked={selectedId === data.id} className='size-[16px] appearance-none checked:bg-[#28C76F] border border-[#374151] rounded-[4px]' />
                                                </td>
                                                <td className='py-5 capitalize'>{data.name}</td>
                                                <td className='py-5'>
                                                    {data.items.reduce((sum, item) => sum + Number(item.itemAmount), 0)}
                                                </td>
                                                <td className='py-5'>
                                                    {}
                                                </td>
                                                <td className='py-5'>
                                                    {}
                                                </td>
                                                <td className='py-5'>
                                                    {data.items.length}
                                                </td>
                                                <label htmlFor={`check-${index}`} className='absolute top-0 left-0 h-full w-full cursor-pointer' 
                                                onClick={() => {
                                                    const newId = data.id;
                                                    if (selectedId === newId) {
                                                        setChecked(!checked); // Toggle if clicking the same one
                                                    } else {
                                                        setChecked(true); // Or just set to true
                                                    }
                                                    setSelectedId(newId);
                                                    if(data.id === index){
                                                        setSelectedDebteeData({
                                                            id: data.id,
                                                            debteeName: data.name,
                                                            itemsOwed: data.items.map((item) => ({
                                                                itemAmt: item.itemAmount,
                                                                itemName: item.itemName
                                                            }))
                                                        })
                                                    }
                                                }}></label>
                                            </tr> 
                                        ))
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
                            </table> */}
                        </div>     
                    </div>
                </div>
            </div>
            {/* add debt modal */}
            <div className={`fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-[4px] z-50 ${showAddDebtModal ? 'flex' : 'hidden'} items-center justify-center`} onClick={() => setShowAddDebtModal(false)}>
                <div className={`bg-black/80 rounded-[16px] px-5 py-10 w-[500px] border border-[#374151] backdrop-blur-md `} onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-white text-[16px]/[16px] font-medium capitalize mb-5">
                        add debt
                    </h3>
                    <AddDebtForm setShowAddDebtModal={setShowAddDebtModal} showAddDebtModal={showAddDebtModal} onActionResponse={handleActionResponse} />
                </div>
            </div>
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