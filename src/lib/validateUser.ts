import { redirect } from 'next/navigation';
import { getCurrentUser } from './auth';

export async function validateUser() {
    const user = await getCurrentUser();
    if (!user) redirect('/signin');
    return user;
}
