import React from 'react'
import { PlusIcon } from 'lucide-react';

type Props = {
    setShowAddDebtModal: (show: boolean) => void;
}

const LogDebtButton = (props: Props) => {
    return (
        <button className="bg-white text-(--text-primary) text-[14px] leading-[19px] font-semibold capitalize text-center px-4 h-10 transition-colors rounded-[8px] flex items-center gap-2 border border-[#D9D1C4] cursor-pointer" onClick={() => props.setShowAddDebtModal(true)}>
            <PlusIcon size={16} />
            log debt
        </button>
    )
}

export default LogDebtButton