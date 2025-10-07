import React from 'react'
import { MdClose } from 'react-icons/md';

type Props = {
    addAssetModalOpen: boolean;
    setAddAssetModalOpen: (isOpen: boolean) => void;
}

const AddAssetModal = (props: Props) => {
    return (
        <div className={`fixed top-0 left-0 h-screen w-full inset-0 bg-black/50 bg-opacity-50 items-center justify-center z-[99999999] backdrop-blur-xs ${props.addAssetModalOpen ? 'flex' : 'hidden'}`} onClick={() => props.setAddAssetModalOpen(false)}>
            <div className="w-[550px] h-[600px] border border-[#374151] p-5 flex flex-col rounded-[16px] bg-[#161B22]" onClick={(e) => e.stopPropagation()}>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='capitalize text-white'>
                        Add Portfolio Asset
                    </h2>
                    <button className='outline-none border-none bg-transparent cursor-pointer text-[#6B7280] hover:text-white transition-colors ease-linear duration-150' onClick={() => props.setAddAssetModalOpen(false)}>
                        <MdClose className="inline-block" size={20} />
                    </button>
                </div>
                <form action="" className="">
                    <div className="flex flex-col">
                        <label htmlFor="asset-name" className="text-sm text-white mt-5 mb-2">Asset Name*</label>
                        <input type="text" id="asset-name" className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-lg focus:ring-[#28C76F] focus:border-[#28C76F] block w-full p-2.5 outline-none" placeholder="e.g. Bitcoin" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAssetModal