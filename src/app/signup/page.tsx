import React from 'react'
import SignupForm  from '@/components/ui/SignupForm'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <SignupForm />
        </div>
    )
}

export default page