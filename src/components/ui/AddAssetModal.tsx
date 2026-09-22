import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { addAsset } from '../../lib/asset';
import { fetchAssetLivePrice } from '../../lib/fetchAssetLivePrice';

type Props = {
    addAssetModalOpen: boolean;
    setAddAssetModalOpen: (isOpen: boolean) => void;
}

const AddAssetModal = (props: Props) => {
    const [assetSymbol, setAssetSymbol] = useState('');
    const [assetQuantity, setAssetQuantity] = useState('');
    const [assetPurchasePrice, setAssetPurchasePrice] = useState('');
    const [assetTransactionDate, setAssetTransactionDate] = useState('');
    const [assetNotes, setAssetNotes] = useState('');

    useEffect(() => {
        if (!assetSymbol) {
            setAssetPurchasePrice('');
            return;
        }

        let requestIsCurrent = true;
        const timeoutId = window.setTimeout(async () => {
            try {
                const price = await fetchAssetLivePrice(assetSymbol);
                if (requestIsCurrent) {
                    setAssetPurchasePrice(price.toString());
                }
            } catch (error) {
                console.error("Error fetching asset price:", error);
                if (requestIsCurrent) {
                    setAssetPurchasePrice('');
                }
            }
        }, 400);

        return () => {
            requestIsCurrent = false;
            window.clearTimeout(timeoutId);
        };
    }, [assetSymbol]);

    const handleAssetSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssetSymbol(event.target.value.toUpperCase());
    };

    const closeModal = () => {
        props.setAddAssetModalOpen(false);
        setAssetSymbol('');
        setAssetQuantity('');
        setAssetPurchasePrice('');
        setAssetTransactionDate('');
        setAssetNotes('');
    }

    const handleAddAsset = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!assetSymbol || !assetQuantity || !assetPurchasePrice || !assetTransactionDate) {
            alert('Please fill in all required fields');
            return;
        }
        const quantity = parseFloat(assetQuantity);
        const purchasePrice = parseFloat(assetPurchasePrice);
        const transactionDate = new Date(assetTransactionDate);
        closeModal();
        await addAsset(assetSymbol, quantity, purchasePrice, transactionDate);
    }

    return (
        <div className={`fixed top-0 left-0 h-screen w-full inset-0 bg-black/50 bg-opacity-50 items-center justify-center z-[99999999] backdrop-blur-xs ${props.addAssetModalOpen ? 'flex' : 'hidden'}`} onClick={() => props.setAddAssetModalOpen(false)}>
            <div className="w-[550px] h-fit bg-(--bg-surface) border border-(--border-subtle) p-5 flex flex-col rounded-[16px]" onClick={(e) => e.stopPropagation()}>
                <div className='flex items-center justify-between w-full'>
                    <h2 className='capitalize text-(--text-primary) text-[18px]/[24px] font-semibold'>
                        Add Portfolio Asset
                    </h2>
                    <button className='outline-none border-none bg-transparent cursor-pointer text-(--text-secondary) hover:text-(--text-primary) transition-colors ease-linear duration-150' onClick={() => closeModal()}>
                        <MdClose className="inline-block" size={20} />
                    </button>
                </div>

                <form className="flex flex-col gap-4 mt-4" onSubmit={handleAddAsset}>
                    {/* asset name input field */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="asset-name" className="text-sm text-(--text-primary) capitalize">Asset symbol*</label>
                        <input type="text" id="asset-name" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px px-3 outline-none h-11" required placeholder="Search for any cryptocurrency (BTC, ETH, SUI, etc.)" value={assetSymbol} onChange={handleAssetSymbolChange} />
                    </div>
                    {/* asset quantity and purchase price input fields */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-quantity" className="text-sm text-(--text-primary) capitalize">quantity*</label>
                            <input type="number" id="asset-quantity" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px px-3 outline-none h-11" value={assetQuantity} onChange={(e) => setAssetQuantity(e.target.value)} required placeholder="0.00" />
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-purchase-price" className="text-sm text-(--text-primary) capitalize">purchase price (USD)*</label>
                            <input type="number" id="asset-purchase-price" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px px-3 outline-none h-11" value={assetPurchasePrice} onChange={(e) => setAssetPurchasePrice(e.target.value)} required placeholder="0.00" />
                        </div>
                    </div>
                    {/* transaction date and notes */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-purchase-time" className="text-sm text-(--text-primary) capitalize">Transaction Date & Time*</label>
                            <input type="date" id="asset-purchase-time" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px px-3 outline-none h-11" value={assetTransactionDate} onChange={(e) => setAssetTransactionDate(e.target.value)} required placeholder="0.00" />
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="asset-transaction-note" className="text-sm text-(--text-primary) capitalize">Notes</label>
                            <textarea id="asset-transaction-note" className="bg-(--bg-surface-2) border border-(--border-strong) text-(--text-primary) text-[13px]/[16px] rounded-[8px] font-medium focus:ring-(--accent) focus:border-(--accent) block w-full py-px h-11 px-3 outline-none" value={assetNotes} onChange={(e) => setAssetNotes(e.target.value)} placeholder="Optional notes about this transaction" />
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

export default AddAssetModal