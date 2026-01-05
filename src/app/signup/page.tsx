import React from 'react'
import SignupForm  from '@/components/ui/SignupForm'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center gap-2'>
            <SignupForm />
            <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-white capitalize">
                already have an account? <a href="/signin" className="text-blue-500 hover:underline">sign in</a>
            </p>
        </div>
    )
}

export default page