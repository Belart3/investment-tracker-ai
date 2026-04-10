import React from 'react';
import { validateUser } from '@/lib/validateUser';
import AssetTracker from '@/components/pages/AssetTracker';
import { getAssetsByUserId } from '@/lib/asset';

type Props = {}

const page = async (props: Props) => {
    const user = await validateUser();
    const assets = await getAssetsByUserId(user.id);

    return (
        <div className='max-w-[1440px] mx-auto'>
            <AssetTracker assets={assets} />
        </div>
    )
}

export default page