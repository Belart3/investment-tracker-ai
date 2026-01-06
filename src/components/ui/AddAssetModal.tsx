import { useMarketData } from '@/hooks/useMarketData';
import { Search } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react'
import { addAssetAction } from '@/app/actions/addAsset';
import { MdCancel, MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

type MarketDatum = {
    symbol: string;
    name: string;
    last_updated: string;
    quote: {
        USD: {
            price: number;
            percent_change_1h: number;
            percent_change_7d: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_60d: number;
            percent_change_90d: number;
        };
        latestPrice: number;
        percIncr: number;
        volume?: number; 
    },
}

type Props = {
    addAssetModalOpen: boolean;
    setAddAssetModalOpen: (isOpen: boolean) => void;
    handleRefresh?: () => void;
}

const AddAssetModal = (props: Props) => {
    const [state, action, pending] = useActionState( addAssetAction, { errors: {}, message: undefined, error: undefined, userId: undefined });
    const [value, setValue] = useState('');
    const [isControlled, setIsControlled] = useState(false);
    useEffect(() => {
        if (state.error) {
            toast.error(state.error, { position: 'bottom-right' });
            return;
        }

        if (state.message) {
            toast.info(state.message, { position: 'bottom-right' });
            props.setAddAssetModalOpen(false);
            return;
        }
    }, [state]);
    const {data: assets, loading, error} = useMarketData(); 
    const [SearchQuery, setSearchQuery] = useState('');
    const [selectedAsset, setSelectedAsset] = useState('');
    const assetPrice = assets.find((asset: MarketDatum) => asset.symbol === selectedAsset)?.quote.USD.price || 0;
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
                <form action={action} className="flex flex-col gap-4 mt-4">
                    <div className="relative">
                        {/* asset name input field */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="assetSymbol" className="text-sm text-white capitalize">Asset symbol*</label>
                            <div className="relative">
                                <input type="text" id="assetSymbol" name='assetSymbol' className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-sm ps-10 focus:ring-[#28C76F] focus:border-[#28C76F] block w-full p-3 outline-none" placeholder="Search for any cryptocurrency (BTC, ETH, SUI, etc.)" autoComplete='off' autoCorrect='off' value={isControlled ? selectedAsset : SearchQuery}
                                onChange={
                                (e) => {
                                    setSearchQuery(e.target.value);
                                }
                                } />
                                <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-[#6B7280]" size={20} />
                                <MdCancel className={`absolute top-1/2 -translate-y-1/2 right-3 text-[#6B7280] cursor-pointer hover:text-white transition-colors ease-linear duration-150 ${SearchQuery === '' ? 'hidden' : 'block'}`} size={20} onClick={() => {
                                    setSearchQuery('');
                                    setIsControlled(false);
                                    setSelectedAsset('')
                                }} />
                            </div>
                            {state?.errors?.assetSymbol && <p className='text-red-500'>{state.errors.assetSymbol}</p>}
                        </div>
                        <div className="flex flex-col w-full h-fit">
                            {
                                assets && assets.length > 0 && SearchQuery !== '' ? (
                                    <div className="absolute top-[105%] left-0 w-full max-h-40 scroll- overflow-y-scroll bg-[#0D1117] border border-t-0 border-[#374151] rounded-sm z-10">
                                        {assets.filter((asset: MarketDatum) => asset.symbol.toLowerCase().includes(SearchQuery.toLowerCase()) || asset.name.toLowerCase().includes(SearchQuery.toLowerCase())).map((asset: MarketDatum) => (
                                            <button type='button' key={asset.symbol} className={`px-3 py-2 hover:bg-[#28C76F] transition-all duration-150 cursor-pointer items-center gap-3 w-full text-left group ${selectedAsset === asset.symbol ? 'bg-[#28C76F]' : ''}`} onClick={()=> {
                                                setSelectedAsset(asset.symbol);
                                                setSearchQuery('');
                                                setIsControlled(true);
                                            }}>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium text-sm">{asset.symbol}</span>
                                                    <span className="text-[#9CA3AF] text-xs group-hover:text-white">{asset.name}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : null
                            }
                        </div>
                        {
                            selectedAsset &&
                            <p className="text-[#28C76F] text-sm mt-2"># Selected: {selectedAsset}</p>
                        }
                    </div>
                    {/* asset quantity and purchase price input fields */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="assetQuantity" className="text-sm text-white capitalize">quantity*</label>
                            <input type="number" id="assetQuantity" name='assetQuantity' className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-md focus:ring-[#28C76F] focus:border-[#28C76F] block w-full p-3 outline-none" required placeholder="0.00" />
                            {state?.errors?.quantity && <p className='text-red-500'>{state.errors.quantity}</p>}
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="purchasePrice" className="text-sm text-white capitalize">purchase price (USD)*</label>
                            <input type="number" id="purchasePrice" name='purchasePrice' className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-md focus:ring-[#28C76F] focus:border-[#28C76F] block w-full p-3 outline-none" required placeholder="0.00" value={Number(assetPrice).toFixed(2)} />
                            {state?.errors?.purchasePrice && <p className='text-red-500'>{state.errors.purchasePrice}</p>}
                        </div>
                    </div>
                    {/* transaction date and notes */}
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="transactionDate" className="text-sm text-white capitalize">Transaction Date & Time*</label>
                            <input type="date" id="transactionDate" name='transactionDate' className="bg-[#0D1117] border border-[#374151] text-white text-sm rounded-md focus:ring-[#28C76F] focus:border-[#28C76F] block w-full p-3 outline-none" required placeholder="0.00" />
                            {state?.errors?.transactionDate && <p className='text-red-500'>{state.errors.transactionDate}</p>}
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="notes" className="text-sm text-white capitalize">Notes</label>
                            <textarea id="notes" name='notes' className="bg-[#0D1117] border !border-[#374151] text-white text-sm rounded-md focus:!ring-[#28C76F] focus:!border-[#28C76F] block w-full p-3 outline-none" placeholder="Optional notes about this transaction" />
                        </div>
                    </div>
                    {/* divider line */}
                    <div className='bg-[#374151] h-px w-full'></div>
                    {/* submit and cancel button */}
                    <div className="flex flex-row items-center justify-end gap-2">
                        <button type='button' className="capitalize cursor-pointer border border-[#374151] bg-[#0D1117] text-sm text-[#6B7280] hover:text-white rounded-sm py-2 px-4 hover:bg-[#21262D] hover:border-transparent transition-colors ease-linear duration-150" onClick={() => props.setAddAssetModalOpen(false)}>
                            cancel
                        </button>
                        <button type='submit' className="capitalize cursor-pointer bg-[#28C76F] text-sm text-white rounded-sm py-2 px-4 hover:bg-[#21262D] transition-colors ease-linear duration-150" onClick={() => !pending && props.handleRefresh?.()}>
                            {
                                pending ? 'adding asset...' : 'add asset'
                            }
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddAssetModal