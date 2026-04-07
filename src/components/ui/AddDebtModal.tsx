'use client'
import React from 'react'
import AddDebtForm from './AddDebtForm'

type Props = {
    showAddDebtModal: boolean;
    setShowAddDebtModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleActionResponse: (response: any) => void;
}

const AddDebtModal = (props: Props) => {
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-[4px] z-50 ${props.showAddDebtModal ? 'flex' : 'hidden'} items-center justify-center`} onClick={() => props.setShowAddDebtModal(false)}>
            <div className={`bg-black/80 rounded-0-[16px] px-5 py-10 w-[500px] border border-[#374151] backdrop-blur-md `} onClick={(e) => e.stopPropagation()}>
                <h3 className="text-white text-[16px]/[16px] font-medium capitalize mb-5">
                    add debt
                </h3>
                <AddDebtForm setDisplayModal={props.setShowAddDebtModal} displayModal={props.showAddDebtModal} onActionResponse={props.handleActionResponse} />
            </div>
        </div>
    )
}

export default AddDebtModal