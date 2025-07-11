'use client'
import { Bar } from 'react-chartjs-2'
import { AiOutlineEdit } from 'react-icons/ai'
import { GoPlus } from 'react-icons/go'
import { MdOutlinePersonOutline } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TbCurrencyNaira } from 'react-icons/tb'
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

interface DebtItem {
    itemName: string;
    itemAmount: number;
}

interface DebtData {
    name: string;
    id: number;
    items: DebtItem[];
}


const page = () => {
    const [debtData, setDebtData] = useState<DebtData[]>(dummyData as DebtData[]);
    const [checked, setChecked] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showAddDebtModal, setShowAddDebtModal] = useState(false);

    const [modalData, setModalData] = useState({
        name: '',
        itemDescription: [
            {
                itemName: '',
                itemAmt: '',
            }
        ]
    })

    const [addDebt, setAddDebt] = useState<DebtData>({
        id: debtData.length,
        name: '',
        items: [
            {
                itemName: '',
                itemAmount: 0,
            }
        ],
    });

    const [itemAdd, setItemAdd] = useState(['x']);
    const [selectedDebteeData, setSelectedDebteeData] = useState({
        id: 0,
        debteeName: '',
        itemsOwed: [] as { itemName: string; itemAmt: string | number }[],
    });
    const overAllDebtList = debtData.map((item) => ({
        name: item.name,
        amtList: item.items.map((i) => Number(i.itemAmount))
    }));
    const debtTotalPerPerson = overAllDebtList.map((item) => (
        {
            name: item.name,
            totalDebt: item.amtList.reduce((sum, item) => sum + Number(item))
        }
    ))
    const debteeNameList = overAllDebtList.map((debtee) => debtee.name);
    const debteeAmtList = debtTotalPerPerson.map((debt) => (
        debt.totalDebt
    ))
    const biggestDebt = Math.max(...debtTotalPerPerson.map((item) => item.totalDebt));
    const smallestDebt = Math.min(...debtTotalPerPerson.map((item) => item.totalDebt));
    const totalAmountOwed = debtData.reduce((totalSum, person) => {
        const personSum = person.items.reduce(
            (sum, item) => sum + Number(item.itemAmount),
            0
        );
        return totalSum + personSum;
    }, 0);
    const noOfPeopleOwed = debtData.length;

    const additems = () => {
        setItemAdd([...itemAdd, "x"]);
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
                                <TbCurrencyNaira size={27} /> {totalAmountOwed ?  totalAmountOwed : 0}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                no of people owed
                            </h4>
                            <p className="text-[27px]/[27px] tracking-[-1.62px] text-white font-semibold flex">
                                <MdOutlinePersonOutline size={27} /> {noOfPeopleOwed}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                biggest debt
                            </h4>
                            <p className="text-[27px]/[27px] tracking-[-1.62px] text-[#E60000] font-semibold flex">
                                <TbCurrencyNaira size={27} /> {biggestDebt >= 0 ? biggestDebt : 0}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-[12px]/[18px] text-[#D1D5DB] capitalize">
                                smallest debt
                            </h4>
                            <p className="text-[27px]/[27px] tracking-[-1.62px] text-[#00AC4F] font-semibold flex">
                                <TbCurrencyNaira size={27} /> {smallestDebt >= 0 ? smallestDebt : 0}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#161B22] rounded-[16px] flex flex-col justify-center col-span-1 row-span-3 border border-[#374151] ">
                    <div className="flex items-center justify-between p-5 border-b border-[#374151]">
                        <h3 className="text-white text-[16px]/[16px] font-medium capitalize">
                            debts Overview
                        </h3>
                    </div>
                    <div className="h-[500px] w-full px-4">
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
                    </div>
                </div>
                <div className="flex flex-col justify-center col-span-2 gap-5">
                    <div className="flex items-center justify-end gap-8">
                        <button className={`bg-transparent text-[#28C76F] text-[16px]/[16px] font-semibold tracking-[-0.64px] capitalize text-center transition-colors flex items-center gap-2 cursor-pointer`} onClick={() => setShowAddDebtModal(true)}>
                            <GoPlus size={24} />
                            add debt
                        </button>
                        <button className={`bg-transparent  ${!checked ? 'text-[#6B7280] cursor-not-allowed' : 'text-[#28C76F] cursor-pointer'} text-[16px]/[16px] font-semibold tracking-[-0.64px] capitalize text-center transition-colors flex items-center gap-2`}  disabled={!checked}>
                            <AiOutlineEdit size={24} />
                            edit
                        </button>
                        <button className={`bg-transparent  ${!checked ? 'text-[#6B7280] cursor-not-allowed' : 'text-[#28C76F] cursor-pointer'} text-[16px]/[16px] font-semibold tracking-[-0.64px] capitalize text-center transition-colors flex items-center gap-2`}  disabled={!checked} onClick={
                            () => {
                                const id = debtData.findIndex(debtee => debtee.name === selectedDebteeData.debteeName)
                                setDebtData(debtData.splice(id, 1))                                
                            }
                        }>
                            <RiDeleteBinLine size={24} />
                            delete
                        </button>
                    </div>
                    <div className=" bg-[#161B22] flex flex-col justify-center">
                        <div className="rounded-[16px] border border-[#374151] !overflow-hidden">
                            <table className="table-auto w-full">
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
                                                <td className='py-5'>{data.name}</td>
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
                                                    console.log(selectedDebteeData)
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
                            </table>
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
                    <form className='flex flex-col gap-4'>
                        {/* add debtee name */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280] " 
                                placeholder="Enter name or description of who you owe" 
                                required
                                onChange={(e) => setAddDebt({ ...addDebt, name: e.target.value })}
                                value={addDebt.name}
                            />
                        </div>
                        {/* add item name and price */}
                        <div className="flex flex-col gap-4">
                            {
                                itemAdd.map((x, index) => (
                                    <div className="flex gap-4" key={index}>
                                        {/* add item name */}
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="item-description" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">Item</label>
                                            <input 
                                                type="text" 
                                                id="item-description" 
                                                className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280]" 
                                                placeholder="Enter a name for what is owed" 
                                                required 
                                                onChange={(e) =>
                                                    setAddDebt({
                                                        ...addDebt,
                                                        items: addDebt.items.map((item, idx) =>
                                                            idx === index
                                                                ? { ...item, itemName: e.target.value }
                                                                : item
                                                        ),
                                                    })
                                                }
                                            />
                                        </div>
                                        {/* add item value */}
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="amount-owed" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">amount owed</label>
                                            <input 
                                                type="number" 
                                                id="amount-owed" 
                                                className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280] " 
                                                placeholder="Enter monetary value for what is owed" 
                                                required 
                                                onChange={(e) =>
                                                    setAddDebt({
                                                        ...addDebt,
                                                        items: addDebt.items.map((item, idx) =>
                                                            idx === index
                                                                ? { ...item, itemAmount: Number(e.target.value) }
                                                                : item
                                                        ),
                                                    })
                                                }
                                            />  
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {/* add more items button */}
                        <div className="flex items-center justify-start">
                            <button type='button' className={`bg-transparent text-[#28C76F] text-[12px]/[12px] font-semibold tracking-[-0.64px] capitalize text-center transition-colors flex items-center gap-1 cursor-pointer`} onClick={additems}>
                                <GoPlus size={14} />
                                add item
                            </button>
                        </div>
                        {/* form actions */}
                        <div className="flex items-center justify-end gap-3">
                            {/* cancel debt addition */}
                            <button type="button" className="bg-[#161B22] hover:bg-[#28C76F] transition-colors ease-linear duration-100 text-white font-semibold py-3 px-6 rounded-[12px] text-[14px]/[14px] tracking-[-0.56px] capitalize focus:outline-none focus:shadow-outline cursor-pointer" 
                            onClick={
                                (e) => {
                                    e.preventDefault();
                                    setShowAddDebtModal(false);
                                }
                            }
                            >
                                cancel
                            </button>
                            {/* submit new debt */}
                            <button type='button' className="bg-[#28C76F] text-white font-semibold py-3 px-6 rounded-[12px] text-[14px]/[14px] tracking-[-0.56px] capitalize focus:outline-none focus:shadow-outline cursor-pointer" onClick={() => {
                            setDebtData([
                                ...debtData,
                                {
                                    ...addDebt,
                                    id: debtData.length,
                                    items: addDebt.items.map((item) => ({
                                        itemName: item.itemName,
                                        itemAmount: Number(item.itemAmount) || 0
                                    }))
                                }
                            ]);
                            console.log(debtData)
                            setShowAddDebtModal(false);
                            setAddDebt({
                                id: 0,
                                name: '',
                                items: [{ itemName: '', itemAmount: 0 }]
                            });
                            }}>
                                Add Debt
                            </button>
                        </div> 
                    </form>
                </div>
            </div>
            {/* cancel debt modal */}
            {/* <div className={`fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-[4px] z-50 hidden items-center justify-center`} onClick={() => setShowModal(false)}>
                <div className={`bg-black/80 rounded-[16px] px-5 py-10 w-[500px] border border-[#374151] backdrop-blur-md `} onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-white text-[16px]/[16px] font-medium capitalize mb-5">
                        add debt
                    </h3>
                    <form className='flex flex-col gap-4'>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280] " 
                                placeholder="Enter name or description of who you owe" 
                                disabled
                                value={selectedDebteeData.debteeName}
                                onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            {
                                selectedDebteeData.itemsOwed.map((item, index) => (
                                    <div className="flex gap-4" key={index}>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="item-description" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">Item</label>
                                            <input 
                                                type="text" 
                                                id="item-description" 
                                                className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280]" 
                                                disabled
                                                value={item.itemName}
                                                onChange={(e) =>
                                                    setModalData({
                                                        ...modalData,
                                                        itemDescription: modalData.itemDescription.map((item, idx) =>
                                                            idx === index
                                                                ? { ...item, itemName: e.target.value }
                                                                : item
                                                        ),
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="amount-owed" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">amount owed</label>
                                            <input 
                                                type="number" 
                                                id="amount-owed" 
                                                className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280] " 
                                                disabled 
                                                value={item.itemAmt}
                                                onChange={(e) =>
                                                    setModalData({
                                                        ...modalData,
                                                        itemDescription: modalData.itemDescription.map((item, idx) =>
                                                            idx === index
                                                                ? { ...item, itemAmt: e.target.value }
                                                                : item
                                                        ),
                                                    })
                                                }
                                            />  
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex flex-col gap-4">
                            {
                                itemAdd.map((x, index) => (
                                    <div className="flex gap-4" key={index}>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="item-description" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">Item</label>
                                            <input 
                                                type="text" 
                                                id="item-description" 
                                                className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280]" 
                                                placeholder="Enter a name for what is owed" 
                                                required 
                                                onChange={(e) =>
                                                    setModalData({
                                                        ...modalData,
                                                        itemDescription: modalData.itemDescription.map((item, idx) =>
                                                            idx === index
                                                                ? { ...item, itemName: e.target.value }
                                                                : item
                                                        ),
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="amount-owed" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">amount owed</label>
                                            <input 
                                                type="number" 
                                                id="amount-owed" 
                                                className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280] " 
                                                placeholder="Enter monetary value for what is owed" 
                                                required 
                                                onChange={(e) =>
                                                    setModalData({
                                                        ...modalData,
                                                        itemDescription: modalData.itemDescription.map((item, idx) =>
                                                            idx === index
                                                                ? { ...item, itemAmt: e.target.value }
                                                                : item
                                                        ),
                                                    })
                                                }
                                            />  
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex items-center justify-start">
                            <button type='button' className={`bg-transparent text-[#28C76F] text-[12px]/[12px] font-semibold tracking-[-0.64px] capitalize text-center transition-colors flex items-center gap-1 cursor-pointer`} onClick={additems}>
                                <GoPlus size={14} />
                                add item
                            </button>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <button type="button" className="bg-[#161B22] hover:bg-[#28C76F] transition-colors ease-linear duration-100 text-white font-semibold py-3 px-6 rounded-[12px] text-[14px]/[14px] tracking-[-0.56px] capitalize focus:outline-none focus:shadow-outline cursor-pointer" 
                            onClick={
                                (e) => {
                                    e.preventDefault();
                                    setShowModal(false);
                                }
                            }
                            >cancel</button>
                            <button type='button' className="bg-[#28C76F] text-white font-semibold py-3 px-6 rounded-[12px] text-[14px]/[14px] tracking-[-0.56px] capitalize focus:outline-none focus:shadow-outline cursor-pointer" onClick={
                                () => {
                                    dummyData[selectedDebteeData.id].items.push(
                                        ...modalData.itemDescription.map((item) => ({
                                            itemName: item.itemName,
                                            itemAmount: Number(item.itemAmt)
                                        }))
                                    );
                                    setShowModal(false);
                                }
                            }>Add Debt</button>
                        </div> 
                    </form>
                </div>
            </div> */}
        </div>
    )
}

export default page