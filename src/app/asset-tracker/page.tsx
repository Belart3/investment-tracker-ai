import React from 'react'
import { validateUser } from '@/lib/validateUser'
import AssetTracker from '@/components/pages/AssetTracker'

type Props = {}

const page = async (props: Props) => {
    const user = await validateUser();
    return (
        <div>
            <AssetTracker />
        </div>
    )
}

export default page