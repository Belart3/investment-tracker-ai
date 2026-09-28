import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { addAsset } from '../../lib/asset';
import { fetchAssetLivePrice } from '../../lib/fetchAssetLivePrice';
import { AssetData } from '@/hooks/useAssetData';
import {
    NativeSelect,
    NativeSelectOptGroup,
    NativeSelectOption,
} from "@/components/ui/native-select"

type Props = {
    addAssetModalOpen: boolean;
    setAddAssetModalOpen: (isOpen: boolean) => void;
    assets: AssetData[];
}

const AddExitModal = (props: Props) => {
    const [assetSymbol, setAssetSymbol] = useState('');
    const [assetExitQuantity, setAssetExitQuantity] = useState('');
    const [assetExitPrice, setAssetExitPrice] = useState('');
    const [assetExitDate, setAssetExitDate] = useState('');
    const [assetExitNotes, setAssetExitNotes] = useState('');

    useEffect(() => {
        if (!assetSymbol) {
            setAssetExitPrice('');
            return;
        }

        let requestIsCurrent = true;
        const timeoutId = window.setTimeout(async () => {
            try {
                const price = await fetchAssetLivePrice(assetSymbol);
                if (requestIsCurrent) {
                    setAssetExitPrice(price.toString());
                }
            } catch (error) {
                console.error("Error fetching asset price:", error);
                if (requestIsCurrent) {
                    setAssetExitPrice('');
                }
            }
        }, 400);

        return () => {
            requestIsCurrent = false;
            window.clearTimeout(timeoutId);
        };
    }, [assetSymbol]);

    const closeModal = () => {
        props.setAddAssetModalOpen(false);
        setAssetSymbol('');
        setAssetExitQuantity('');
        setAssetExitPrice('');
        setAssetExitDate('');
        setAssetExitNotes('');
    }

    const handleAddAsset = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!assetSymbol || !setAssetExitQuantity || !assetExitPrice || !setAssetExitDate) {
            alert('Please fill in all required fields');
            return;
        }
        const quantity = parseFloat(assetExitQuantity);
        const exitPrice = parseFloat(assetExitPrice);
        const exitDate = new Date(assetExitDate);
        closeModal();
        await addAsset(assetSymbol, quantity, exitPrice, exitDate);
    }

    const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]
    return (
        <div className={`fixed top-0 left-0 h-screen w-full inset-0 bg-black/50 bg-opacity-50 items-center justify-center z-[99999999] backdrop-blur-xs ${props.addAssetModalOpen ? 'flex' : 'hidden'}`} onClick={() => props.setAddAssetModalOpen(false)}>
            <div className="w-[550px] h-fit bg-(--bg-surface) border border-(--border-subtle) p-5 flex flex-col rounded-[16px]" onClick={(e) => e.stopPropagation()}>
                <div className='flex items-center justify-between w-full'>
                    <div className="flex flex-col gap-1">
                        <h2 className='capitalize text-(--text-primary) text-[18px]/[24px] font-semibold'>
                            Add Exit
                        </h2>
                        <p className="text-[12px] text-(--text-secondary)">
                            Record a full or partial sell from a live position.
                        </p>
                    </div>
                    <button className='outline-none border-none bg-transparent cursor-pointer text-(--text-secondary) hover:text-(--text-primary) transition-colors ease-linear duration-150' onClick={() => closeModal()}>
                        <MdClose className="inline-block" size={20} />
                    </button>
                </div>

                <form className="flex flex-col gap-4 mt-4" onSubmit={handleAddAsset}>
                    {/* assets dropdown */}
                    <div className="flex w-full flex-col gap-2 [&>*:last-child]:!w-full">
                        <label htmlFor="asset-name" className="text-[12px] text-(--text-primary) capitalize">Asset</label>
                        <NativeSelect
                            value={assetSymbol}
                            onChange={(e) => {
                                const selectedAssetSymbol = e.target.value;
                                setAssetSymbol(selectedAssetSymbol)
                                console.log(selectedAssetSymbol)
                            }}
                            className='!w-full bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px]! rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) py-px px-3 outline-none h-11'
                        >
                            <NativeSelectOption value="" >Select as asset</NativeSelectOption>
                            {
                                props.assets.map((asset, index) => (
                                    <NativeSelectOption value={asset.symbol} key={index} >
                                        {asset.symbol} — {asset.quantity.toFixed(2)} held 
                                    </NativeSelectOption>
                                ))
                            }
                        </NativeSelect>
                    </div>
                    {/* asset quantity and purchase price input fields */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-quantity" className="text-[12px] text-(--text-primary) capitalize">quantity to exit</label>
                            <input type="number" id="asset-quantity" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px px-3 outline-none h-11" value={assetExitQuantity} onChange={(e) => setAssetExitQuantity(e.target.value)} required placeholder="0.00" />
                        </div>
                        {/* asset exit price */}
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-exit-price" className="text-[12px] text-(--text-primary) capitalize">exit price (USD)</label>
                            <input type="number" id="asset-exit-price" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px px-3 outline-none h-11" value={assetExitPrice} onChange={(e) => setAssetExitPrice(e.target.value)} required placeholder="0.00" />
                        </div>
                    </div>
                    {/* transaction date and notes */}
                    <div className="flex flex-col">
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="asset-purchase-time" className="text-[12px] text-(--text-primary) capitalize">Date</label>
                            <input type="date" id="asset-purchase-time" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px px-3 outline-none h-11" value={assetExitDate} onChange={(e) => setAssetExitDate(e.target.value)} required placeholder="0.00" />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="asset-transaction-note" className="text-[12px] text-(--text-primary) capitalize">Notes</label>
                            <textarea id="asset-transaction-note" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px h-11 px-3 outline-none" value={assetExitNotes} onChange={(e) => setAssetExitNotes(e.target.value)} placeholder="Optional notes about this transaction" />
                        </div>
                    </div>
                    {/* submit and cancel button */}
                    <div className="flex flex-row items-center justify-end gap-2">
                        <button className="capitalize cursor-pointer bg-(--brand) text-[13px]/[16px] font-body text-white rounded-[8px] py-2 px-4 hover:bg-[#21262D] transition-colors ease-linear duration-120 font-semibold h-11" type="button" onClick={() => closeModal()}>
                            cancel
                        </button>
                        <button className="capitalize cursor-pointer bg-(--brand) text-[13px]/[16px] font-body text-white rounded-[8px] py-2 px-4 hover:bg-[#21262D] transition-colors ease-linear duration-120 font-semibold h-11" type="submit">
                            add asset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddExitModal ;
