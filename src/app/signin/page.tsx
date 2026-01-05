import React from 'react'
import SigninForm  from '@/components/ui/SigninForm'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center gap-2'>
            <SigninForm />
            <p className="text-[14px]/[21px] tracking-[-0.56px] font-normal text-white capitalize">
                Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">sign up</a>
            </p>
        </div>
    )
}

export default page
