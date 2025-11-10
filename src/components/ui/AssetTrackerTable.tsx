import React, { useState } from 'react'
import { IoBagOutline } from 'react-icons/io5';
import { PlusIcon, RefreshCcw, TrendingDown } from 'lucide-react';

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
}

const AssetTrackerTable = (props: Props) => {
    return (
        <div className="col-span-6 flex flex-col justify-start row-span-2 space-y-2 order-4 bg-[#161B22] border border-[#374151] rounded-md">
            <div className="flex items-center justify-between p-5">
                <h2 className="text-white capitalize">Portfolio assets</h2>
                <div className="flex items-center justify-center gap-3">
                    <button className="bg-transparent border border-[#374151] rounded-[8px] px-4 py-2 text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#28C76F] hover:bg-none transition cursor-pointer flex items-center capitalize" onClick={() => props.setIsAddAssetModalOpen(true)}>
                        <PlusIcon className="inline-block me-2" size={20} />
                        Add Asset
                    </button>
                    <button className="bg-[#811d1d] rounded-[8px] px-4 py-2 text-[14px]/[21px] tracking-[-0.56px] font-medium text-white hover:bg-[#811d1d99] transition cursor-pointer flex items-center capitalize">
                        <TrendingDown className="inline-block me-2" size={20} />
                        Add exit
                    </button>
                </div>
            </div>
            <div className="rounded-md rounded-t-none border border-[#374151] !overflow-hidden bg-[#161B22]">
                <div className="max-h-[600px] overflow-y-scroll">
                    <table className="table-auto w-full">
                        <thead className="sticky top-0 bg-[#161B22] z-10">
                            <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-b border-[#374151]`}>
                                <th className='text-start py-5 ps-5 capitalize'>Asset</th>
                                <th className='text-start py-5 capitalize'>live qty</th>
                                <th className='text-start py-5 capitalize'>avg. cost</th>
                                <th className='text-start py-5 capitalize'>price</th>
                                <th className='text-start py-5 capitalize'>invested</th>
                                <th className='text-start py-5 capitalize'>value</th>
                                <th className='text-start py-5 capitalize'>last updated</th>
                                <th className='text-start py-5 capitalize'>actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr className={`text-white text-[16px]/[24px] tracking-[-0.64px] font-normal relative border-b last-of-type:!border-0 border-[#374151] hover:bg-[#1F2937] cursor-pointer`}>
                                <td className='py-5 capitalize ps-5'>
                                </td>
                            </tr> 
                        </tbody>
                        {/* <tfoot>
                        <tr className={`text-[#6B7280] text-[12px]/[18px] tracking-[-0.48px] font-normal border-t border-[#374151]`}>
                            <TablePagination
                            className={`!text-white`}
                            color="white"
                            count={props.exchangeHistory.length}
                            page={0}
                            rowsPerPage={10}
                            onPageChange={() => {}}
                            onRowsPerPageChange={(e) => {
                                setSlice(Number(e.target.value))
                            }}
                            rowsPerPageOptions={[10,20,30,50,100]}
                            />
                        </tr>
                        </tfoot> */}
                    </table>
                </div>
            </div>     
        </div>
    )
}

export default AssetTrackerTable