'use server';
import React from 'react'
import DebtTracker from '@/components/pages/DebtTracker'
import { validateUser } from '@/lib/validateUser'

type Props = {}

const page = async (props: Props) => {
    const user = await validateUser();
    return (
        <div>
            <DebtTracker user={user} />
        </div>
    )
}

export default page