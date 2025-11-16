'use client'
import { signin } from '@/app/actions/signin'
import { useActionState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Errors = {
    name?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
};


export default function SigninForm() {
    const [state, action, pending] = useActionState(signin, { errors: {}, message: undefined, error: undefined, userId: undefined })
    const router = useRouter();

    useEffect(() => {
        // Handle custom error returned from server
        if (state.error) {
            toast.error(state.error, { position: 'bottom-right' });
        }

        if (state.message) {
            toast.error(state.message, { position: 'bottom-right' });
        }

        // Handle success and redirect
        if (state.message && state.userId) {
            setTimeout(() => router.push('/'), 1500);
        }
    }, [state, router]);

    return (
        <form action={action} className='flex flex-col space-y-2 border border-white p-6 rounded-md bg-gray-800'>
            <div className='flex flex-col space-y-1'>
                <label htmlFor="email" className='text-white'>Email</label>
                <input id="email" name="email" className='border border-white bg-white' type="email" placeholder="email" required />
            </div>
            {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
            <div className='flex flex-col space-y-1'>
                <label htmlFor="password" className='text-white'>Password</label>
                <input id="password" name="password" className='border border-white bg-white' type="password" required />
            </div>
            {state?.errors?.password && (
                <div>
                    <p className='text-white'>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error} className='text-red-500'>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button type="submit" disabled={pending} className='bg-white py-2 cursor-pointer'>{pending ? 'Signing in...' : 'Sign In'}</button>
            <ToastContainer />
        </form>
    )
}