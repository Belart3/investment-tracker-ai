'use client'
import { signup } from '@/app/actions/signup'
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



export default function SignupForm() {
    const [state, action, pending] = useActionState(signup, { errors: {}, message: undefined, error: undefined, userId: undefined })
    const router = useRouter();
    useEffect(() => {
        if (!state?.message) return;

        if (state?.message) {
            toast.success(state.message, { position: 'bottom-right' });
        } else if (state?.error) {
            toast.error(state.error, { position: 'bottom-right' });
        }
        if (state?.message.includes('Account created successfully')) {
        setTimeout(() => router.push('/onboarding'), 1500); 
        }
    }, [state?.message]);
    return (
        <form action={action} className='flex flex-col space-y-2 border border-white p-6 rounded-md bg-gray-800'>
            <div className='flex flex-col space-y-1'>
                <label htmlFor="name" className='text-white'>Name</label>
                <input id="name" name="name" className='border border-white bg-white' placeholder="Name" required />
            </div>
            {state?.errors?.name && <p className='text-red-500'>{state.errors.name}</p>}
            <div className='flex flex-col space-y-1'>
                <label htmlFor="email" className='text-white'>Email</label>
                <input id="email" name="email" className='border border-white bg-white' type="email" placeholder="Email" required />
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

            <button type="submit" disabled={pending} className='bg-white py-2 cursor-pointer'>{pending ? 'Creating Account...' : 'Sign Up'}</button>
            <ToastContainer />
        </form>
    )
}