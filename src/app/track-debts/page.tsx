'use server';
import React from 'react'
import DebtTracker from '@/components/pages/DebtTracker'
import { validateUser } from '@/lib/validateUser'
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { getDebtsByUserId } from '@/lib/debts';
import { redirect } from 'next/navigation';

type Props = {}

const page = async (props: Props) => {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        redirect('/signin');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        redirect('/signin');
    }

    const debts = await getDebtsByUserId(decoded.userId);
    const user = await validateUser();
    return (
        <div>
            <DebtTracker user={user} debts={debts} />
        </div>
    )
}

export default page