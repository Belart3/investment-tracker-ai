import React from 'react'
import OnboardingForm from '@/components/ui/OnboardingForm';

type Props = {}

const page = (props: Props) => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center gap-2'>
            <OnboardingForm />
        </div>
    )
}

export default page