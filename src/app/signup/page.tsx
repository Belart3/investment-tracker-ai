import SignupForm from '../components/signupForm'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <SignupForm />
        </div>
    )
}

export default page