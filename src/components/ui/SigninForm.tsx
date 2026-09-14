'use client'
import { signin } from '@/app/actions/signin'
import { useActionState, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineDisconnect } from 'react-icons/ai';
import { Eye, EyeClosed } from 'lucide-react';

type Errors = {
    name?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
};


export default function SigninForm() {
    const [state, action, pending] = useActionState(signin, { errors: {}, message: undefined, error: undefined, userId: undefined })
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Handle custom error returned from server
        if (state.error) {
            toast.error(state.error, { position: 'bottom-right' });
        }

        if (state.message) {
            toast.info(state.message, { position: 'bottom-right' });
        }

        // Handle success and redirect
        if (state.message && state.userId) {
            setTimeout(() => router.push('/'), 1500);
        }
    }, [state, router]);

    return (
        <form action={action} className='flex flex-col space-y-4'>
            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="email" className='text-(--text-secondary) font-(--text-xs) tracking-(--ls-xs) font-semibold'>Email</label>
                <input id="email" name="email" className='w-full h-11 rounded-[8px] border border-(--border-strong) bg-(--bg-surface-2) text-(--text-primary) font-(--text-sm) font-(--font-body) px-4 py-6' type="email" placeholder="email" required />
            </div>
            {state?.errors?.email && <p className='text-red-500'>{state.errors.email}</p>}
            <div className='flex flex-col space-y-1.5'>
                <label htmlFor="password" className='text-(--text-secondary) font-(--text-xs) tracking-(--ls-xs) font-semibold'>Password</label>
                <div className="relative">
                    <input id="password" name="password" className='w-full h-11 rounded-[8px] border border-(--border-strong) bg-(--bg-surface-2) text-(--text-primary) font-(--text-sm) font-(--font-body) px-4 py-6' type={showPassword ? 'text' : 'password'} required />
                    <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                    </button>
                </div>
            </div>
            {state?.errors?.password && (
                <div>
                    <p className='text-(--text-secondary) font-(--text-xs) tracking-(--ls-xs) font-semibold'>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error} className='text-red-500'>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button type="submit" disabled={pending} className='bg-(--brand) hover:bg-(--brand-hover) ease-in duration-120 cursor-pointer rounded-[8px] h-11 text-white font-semibold mt-4'>{pending ? 'Signing in...' : 'Sign in'}</button>
            <ToastContainer theme='dark' icon={({ type, theme }) => {
                // theme is not used in this example but you could
                switch (type) {
                    case 'error':
                    return <AiOutlineDisconnect className="stroke-white" />;
                    default:
                    return null;
                }
                }} 
            />
        </form>
    )
}