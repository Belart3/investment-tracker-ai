import React from 'react'
import SignupForm  from '@/components/ui/SignupForm'

type Props = {}

const page = (props: Props) => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center bg-(--bg-canvas) p-6'>
            <div className="px-6 py-8 bg-(--bg-surface) rounded-[14px] min-w-[300px] max-w-[400px] w-full flex flex-col shadow-(--shadow-card-lg)">
                <div className="flex flex-col gap-1.5 mb-8">
                    <h1 className="font-display text-[24px] leading-(--lh-lg) tracking-(--ls-lg) font-semibold text-start">
                        Create your account
                    </h1>
                    <p className="text-[14px]/[21px] tracking-[-0.56px] text-(--text-secondary) text-[13px] font-medium text-start capitalize">
                        Start tracking your assets and debts in one place.
                    </p>
                </div>
                <SignupForm />
                <p className="text-[14px]/[21px] tracking-[-0.56px] text-(--text-secondary) text-center font-medium mt-4">
                    Already have an account? <a href="/signin" className="text-(--brand) hover:underline font-semibold">Sign in</a>
                </p>
            </div>
        </div>
    )
}

export default page