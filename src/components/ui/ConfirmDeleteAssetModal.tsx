import React from 'react'

type Props = {
    showDeleteAssetModal: boolean;
    setShowDeleteAssetModal: React.Dispatch<React.SetStateAction<boolean>>;
    openPopover: boolean;
    setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
    assetId: string;
    deleteAsset: (assetId: string) => void;
}

const ConfirmDeleteAssetModal = (props: Props) => {
    const closeModal = () => {
        props.setShowDeleteAssetModal(false);
        props.setOpenPopover(false);
    }
    return (
        <div className={`${props.showDeleteAssetModal ? 'flex' : 'hidden'} flex-col gap-1 p-4`} onClick={
            (e) => e.stopPropagation()
        }>
            <div className="text-center">
                <h2 className="text-lg font-semibold text-white">Delete</h2>
                <p className="text-sm text-white">Are you sure you want to delete this asset? This action cannot be undone.</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
                <button className="bg-[#B91C1C] hover:bg-[#991B1B] transition-all  text-white py-2 px-4 cursor-pointer w-1/2" onClick={() => {
                    props.deleteAsset(props.assetId);
                    closeModal();
                }}>
                    Delete
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 transition-all  text-white py-2 px-4 cursor-pointer w-1/2" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ConfirmDeleteAssetModal