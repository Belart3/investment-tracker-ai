'use client'
import { useSearchParams } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { Check, TrendingUp } from 'lucide-react'
import { skipOnboarding } from '@/app/actions/onboarding'
// The current step lives in the URL as ?step=<key>, e.g. /onboarding?step=exchange
import { STEPS } from './steps'

// useFormStatus only works in a component *inside* the <form>, hence its own component
const SkipButton = () => {
    const { pending } = useFormStatus()
    return (
        <button
            type='submit'
            disabled={pending}
            className='text-[13px] font-semibold text-[var(--brand)] cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-wait disabled:no-underline'
        >
            {pending ? 'Skipping…' : 'Skip setup'}
        </button>
    )
}

const OnboardingHeader = () => {
    const searchParams = useSearchParams()
    const currentStep = searchParams.get('step')

    // No ?step, or one we don't recognise, counts as the first step
    const foundIndex = STEPS.findIndex((step) => step.key === currentStep)
    const activeIndex = foundIndex === -1 ? 0 : foundIndex

    return (
        <header className='w-full max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 px-8 py-5'>
            <div className='flex items-center gap-3'>
                <span className='grid place-items-center size-9 rounded-[8px] bg-[var(--brand)] text-white'>
                    <TrendingUp size={18} />
                </span>
                <span className='font-display text-[16px] font-semibold text-[var(--text-primary)]'>Investment Tracker</span>
            </div>

            <ol className='flex items-center gap-6' aria-label='Setup progress'>
                {STEPS.map((step, index) => {
                    const isDone = index < activeIndex
                    const isActive = index === activeIndex

                    return (
                        <li
                            key={step.key}
                            aria-current={isActive ? 'step' : undefined}
                            className={`flex items-center gap-2.5 text-[13px] font-semibold ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}
                        >
                            <span className={`grid place-items-center size-[26px] rounded-full border-[1.5px] text-[12px] ${
                                isDone ? 'bg-[var(--positive)] border-[var(--positive)] text-white'
                                : isActive ? 'bg-[var(--brand)] border-[var(--brand)] text-white'
                                : 'bg-[var(--bg-surface)] border-[var(--border-strong)]'
                            }`}>
                                {isDone ? <Check size={14} strokeWidth={3} /> : index + 1}
                            </span>
                            {step.label}
                        </li>
                    )
                })}
            </ol>

            <form action={skipOnboarding}>
                <SkipButton />
            </form>
        </header>
    )
}

export default OnboardingHeader
