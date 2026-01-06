import React, { useActionState, useEffect } from 'react'
import { addDebtAction } from '@/app/actions/debts/addDebt';
import { toast } from 'react-toastify';

type Props = {
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
    displayModal: boolean;
    onActionResponse?: (type: string, message: string) => void;
}

const AddDebtForm = (props: Props) => {
    const [state, action, pending] = useActionState( addDebtAction, { errors: {}, message: undefined, error: undefined, userId: undefined });

    useEffect(() => {
        if (state.error) {
            toast.error(state.error, { position: 'bottom-right' });
            return;
        }

        if (state.message) {
            toast.info(state.message, { position: 'bottom-right' });
            props.setDisplayModal(false);
            return;
        }
    }, [state]);
    return (
        <form action={action} className='flex flex-col gap-4'>
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280] " 
                    placeholder="Enter name or description of who you owe" 
                    required
                /> 
                {state?.errors?.name && <p className='text-red-500'>{state.errors.name}</p>}
            </div>
            <div className="flex gap-4">
                {/* add item name */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="item" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">item</label>
                    <input 
                        type="text" 
                        id="item" 
                        name="item"
                        className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#6B7280]" 
                        placeholder="Enter a name for what is owed" 
                        required 
                    />
                    {state?.errors?.item && <p className='text-red-500'>{state.errors.item}</p>}
                </div>
                {/* add item value */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="amount" className="text-white text-[14px]/[21px] font-normal tracking-[-0.56px] capitalize">amount owed</label>
                    <input 
                        type="number" 
                        id="amount" 
                        name="amount"
                        className="shadow appearance-none border border-[#374151] rounded-[8px] h-12 w-full py-2 px-4 text-white tracking-[-0.56px] focus:border-[2px] focus:outline-none focus:border-[#28C76F] focus:shadow-outline text-[14px]/[21px] placeholder-shown:text-[#193b7d] " 
                        placeholder="Enter monetary value for what is owed" 
                        required 
                    />  
                    {state?.errors?.amount && <p className='text-red-500'>{state.errors.amount}</p>}
                </div>
            </div>
            <div className="flex items-center justify-end gap-3">
                {/* cancel debt addition */}
                <button type="button" className="bg-[#161B22] hover:bg-[#28C76F] transition-colors ease-linear duration-100 text-white font-semibold py-3 px-6 rounded-[12px] text-[14px]/[14px] tracking-[-0.56px] capitalize focus:shadow-outline cursor-pointer" 
                onClick={
                    (e) => {
                        e.preventDefault();
                        props.setDisplayModal(false);
                    }
                }
                >
                    Cancel
                </button>
                {/* submit new debt */}
                <button type='submit' className="bg-[#28C76F] text-white font-semibold py-3 px-6 rounded-[12px] text-[14px]/[14px] tracking-[-0.56px] capitalize focus:shadow-outline cursor-pointer">
                    {pending ? 'Adding Debt...' : 'Add Debt'}
                </button>
            </div> 
        </form>
    )
}

export default AddDebtForm