'use client'
import { Check } from 'lucide-react'
import { SUPPORTED_EXCHANGES, type ExchangeId } from '@/lib/supportedExchanges'
import ExchangeLogo from '@/components/ui/ExchangeLogo'

type Props = {
    value: ExchangeId | null
    onChange: (exchange: ExchangeId) => void
    onBack: () => void
    onNext: () => void
}

// Step 2 of onboarding. Like the currency step, it only reports the choice;
// the page holds it.
const ChooseExchange = ({ value, onChange, onBack, onNext }: Props) => {
    return (
        <section className='w-full max-w-[620px] flex flex-col gap-6 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8'>
            <div>
                <h1 className='font-display text-[26px] font-semibold text-[var(--text-primary)]'>Connect an exchange</h1>
                <p className='mt-1.5 text-[15px] text-[var(--text-secondary)]'>
                    We&apos;ll pull your balances automatically with a read-only key.
                </p>
            </div>

            <div className='flex flex-col gap-2.5'>
                <div role='radiogroup' aria-label='Exchange' className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
                    {SUPPORTED_EXCHANGES.map((exchange) => {
                        const isSelected = value === exchange.id

                        // Coming-soon exchanges: visible, but can't be picked or focused
                        if (!exchange.available) {
                            return (
                                <button
                                    key={exchange.id}
                                    type='button'
                                    role='radio'
                                    aria-checked={false}
                                    disabled
                                    className='flex items-center gap-3 rounded-[12px] border-[1.5px] border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-3.5 text-left cursor-not-allowed'
                                >
                                    <ExchangeLogo id={exchange.id} className='opacity-40 grayscale' />
                                    <span className='flex-1 font-medium text-[var(--text-secondary)]'>{exchange.name}</span>
                                    <span className='rounded-full bg-[var(--bg-surface-3)] px-2 py-0.5 text-[11px] font-semibold text-[var(--text-secondary)]'>Coming soon</span>
                                </button>
                            )
                        }

                        return (
                            <button
                                key={exchange.id}
                                type='button'
                                role='radio'
                                aria-checked={isSelected}
                                onClick={() => onChange(exchange.id)}
                                className={`flex items-center gap-3 rounded-[12px] border-[1.5px] bg-[var(--bg-surface)] p-3.5 text-left cursor-pointer transition-colors ${
                                    isSelected
                                        ? 'border-[var(--brand)]'
                                        : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                                }`}
                            >
                                <ExchangeLogo id={exchange.id} />
                                <span className='flex-1 font-semibold text-[var(--text-primary)]'>{exchange.name}</span>
                                {/* Same corner marker as the currency cards */}
                                <span className={`grid place-items-center size-[18px] shrink-0 rounded-full ${
                                    isSelected ? 'bg-[var(--brand)] text-white' : 'border-[1.5px] border-[var(--border-strong)]'
                                }`}>
                                    {isSelected && <Check size={11} strokeWidth={3.5} />}
                                </span>
                            </button>
                        )
                    })}
                </div>
                <p className='text-[13px] text-[var(--text-secondary)]'>More exchanges are on the way.</p>
            </div>

            <div className='flex justify-between border-t border-[var(--border-subtle)] pt-5'>
                <button
                    type='button'
                    onClick={onBack}
                    className='h-10 px-5 rounded-[10px] border border-[var(--border-strong)] text-[14px] font-semibold text-[var(--text-primary)] cursor-pointer hover:bg-[var(--bg-surface-2)] transition-colors'
                >
                    Back
                </button>
                <button
                    type='button'
                    onClick={onNext}
                    disabled={!value}
                    className='h-10 px-5 rounded-[10px] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[14px] font-semibold text-white cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--brand)]'
                >
                    Continue
                </button>
            </div>
        </section>
    )
}

export default ChooseExchange
