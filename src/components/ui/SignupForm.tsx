'use client'
import { signup } from '@/app/actions/signup'
import { useActionState, useState } from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeClosed } from 'lucide-react';
import { AiOutlineDisconnect } from 'react-icons/ai';

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
        if (state.error) {
            toast.error(state.error, { position: 'bottom-right' });
        }

        if (state.message) {
            toast.info(state.message, { position: 'bottom-right' });
        }

        // Handle success and redirect
        if (state.message && state.userId) {
            setTimeout(() => router.push('/onboarding'), 1500);
        }
    }, [state, router]);
    const [showPassword, setShowPassword] = useState(false);
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
                <div className="relative">
                    <input id="password" name="password" className='border border-white bg-white pr-6' type={showPassword ? 'text' : 'password'} required />
                    <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-[2px] top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                    </button>
                </div>
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
        </form>
    )
}