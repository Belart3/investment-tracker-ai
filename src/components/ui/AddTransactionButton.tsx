import React from 'react'
import { PlusIcon } from 'lucide-react';

type Props = {
    setIsAddAssetModalOpen: (show: boolean) => void;
}

const AddTransactionButton = (props: Props) => {
    return (
        <button className="bg-[var(--brand)] border border-[var(--border-strong)] rounded-[8px] px-2 lg:px-4 h-10 text-[13px] leading-[19px] font-semibold text-white hover:bg-[var(--brand)] hover:border-transparent hover:text-white transition cursor-pointer flex items-center capitalize gap-2" onClick={() => props.setIsAddAssetModalOpen(true)}>
            <PlusIcon className="inline-block me-1 text-white" size={16} />
            Add transaction
        </button>
    )
}

export default AddTransactionButton