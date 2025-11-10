import React from 'react'
import { MdClose } from 'react-icons/md';

type Props = {
    addAssetModalOpen: boolean;
    setAddAssetModalOpen: (isOpen: boolean) => void;
}

const AddAssetModal = (props: Props) => {
    return (
        <div className={`fixed top-0 left-0 h-screen w-full inset-0 bg-black/50 bg-opacity-50 items-center justify-center z-[99999999] backdrop-blur-xs ${props.addAssetModalOpen ? 'flex' : 'hidden'}`} onClick={() => props.setAddAssetModalOpen(false)}>
            <div className="w-[550px] h-fit border border-[#374151] p-5 flex flex-col rounded-[16px] bg-[#161B22]" onClick={(e) => e.stopPropagation()}>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='capitalize text-white'>
                        Add Portfolio Asset
                    </h2>
                    <button className='outline-none border-none bg-transparent cursor-pointer text-[#6B7280] hover:text-white transition-colors ease-linear duration-150' onClick={() => props.setAddAssetModalOpen(false)}>
                        <MdClose className="inline-block" size={20} />
                    </button>
                </div>
                <form action="" className="flex flex-col gap-4 mt-4">
                    {/* asset name input field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="asset-name" className="text-sm text-white capitalize">Asset symbol*</label>
                        <input type="text" id="asset-name" className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-md focus:ring-[#28C76F] focus:border-[#28C76F] block w-full py-2 px-3 outline-none" required placeholder="Search for any cryptocurrency (BTC, ETH, SUI, etc.)" />
                    </div>
                    {/* asset quantity and purchase price input fields */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-quantity" className="text-sm text-white capitalize">quantity*</label>
                            <input type="number" id="asset-quantity" className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-md focus:ring-[#28C76F] focus:border-[#28C76F] block w-full py-2 px-3 outline-none" required placeholder="0.00" />
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-purchase-price" className="text-sm text-white capitalize">purchase price (USD)*</label>
                            <input type="number" id="asset-purchase-price" className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-md focus:ring-[#28C76F] focus:border-[#28C76F] block w-full py-2 px-3 outline-none" required placeholder="0.00" />
                        </div>
                    </div>
                    {/* transaction date and notes */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-purchase-time" className="text-sm text-white capitalize">Transaction Date & Time*</label>
                            <input type="date" id="asset-purchase-time" className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-md focus:ring-[#28C76F] focus:border-[#28C76F] block w-full py-2 px-3 outline-none" required placeholder="0.00" />
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-transaction-note" className="text-sm text-white capitalize">Notes</label>
                            <textarea id="asset-transaction-note" className="bg-[#0D1117] border !border-[#374151] text-white text-sm rounded-md focus:!ring-[#28C76F] focus:!border-[#28C76F] block w-full py-2 px-3 outline-none" placeholder="Optional notes about this transaction" />
                        </div>
                    </div>
                    {/* divider line */}
                    <div className='bg-[#374151] h-px w-full'></div>
                    {/* submit and cancel button */}
                    <div className="flex flex-row items-center justify-end gap-2">
                        <button className="capitalize cursor-pointer border border-[#374151] bg-[#0D1117] text-sm text-[#6B7280] hover:text-white rounded-sm py-2 px-4 hover:bg-[#21262D] hover:border-transparent transition-colors ease-linear duration-150" onClick={() => props.setAddAssetModalOpen(false)}>
                            cancel
                        </button>
                        <button className="capitalize cursor-pointer bg-[#28C76F] text-sm text-white rounded-sm py-2 px-4 hover:bg-[#21262D] transition-colors ease-linear duration-150">
                            add asset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAssetModal