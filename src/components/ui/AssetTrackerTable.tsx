import React from 'react'

type Props = {
    setIsAddAssetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAssetModalOpen: boolean;
}

const AssetTrackerTable = (props: Props) => {
    return (
        <div className="max-h-[600px] overflow-y-scroll">
            <table className="table-auto w-full border border-(--border-subtle) bg-(--bg-surface)">
                <thead className="sticky top-0  z-10">
                    <tr className="">
                        <th className='text-left text-[12px]/[16px] font-semibold trackng-[1px] text-(--text-secondary) py-3 px-4'>Asset</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default AssetTrackerTable