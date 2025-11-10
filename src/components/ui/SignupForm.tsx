'use client'
import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)
    return (
        <form action={action} className='flex flex-col space-y-2'>
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

            <button type="submit" className='bg-white py-2 cursor-pointer'>Sign Up</button>
        </form>
    )
}