'use client'
import { Check } from 'lucide-react'
import { CURRENCIES, type CurrencyCode } from '@/lib/currencies'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type CurrencyChoice = {
    displayCurrency: CurrencyCode // totals and charts are shown in this
    debtCurrency: CurrencyCode    // pre-selected when logging a new debt
}

type Props = {
    value: CurrencyChoice
    onChange: (value: CurrencyChoice) => void
    onNext: () => void
}

// Step 1 of onboarding. It doesn't save anything itself: the page holds the
// choice and saves everything at the end.
const ChooseCurrency = ({ value, onChange, onNext }: Props) => {
    return (
        <section className='w-full max-w-[620px] flex flex-col gap-6 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8'>
            <div>
                <h1 className='font-display text-[26px] font-semibold text-[var(--text-primary)]'>Pick your currencies</h1>
                <p className='mt-1.5 text-[15px] text-[var(--text-secondary)]'>
                    Your net worth is shown in one currency. Debts can stay in the currency you borrowed in.
                </p>
            </div>

            <div className='flex flex-col gap-2'>
                <span id='display-currency-label' className='text-[13px] font-semibold text-[var(--text-primary)]'>Show totals in</span>
                <div role='radiogroup' aria-labelledby='display-currency-label' className='grid grid-cols-2 sm:grid-cols-4 gap-2.5'>
                    {CURRENCIES.map((currency) => {
                        const isSelected = value.displayCurrency === currency.code

                        return (
                            <button
                                key={currency.code}
                                type='button'
                                role='radio'
                                aria-checked={isSelected}
                                onClick={() => onChange({ ...value, displayCurrency: currency.code })}
                                className={`relative flex flex-col items-start gap-0.5 rounded-[12px] border-[1.5px] bg-[var(--bg-surface)] p-3.5 text-left cursor-pointer transition-colors ${
                                    isSelected
                                        ? 'border-[var(--brand)]'
                                        : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                                }`}
                            >
                                {/* Corner marker: filled check when picked, empty circle when not */}
                                <span className={`absolute top-3 right-3 grid place-items-center size-[18px] rounded-full ${
                                    isSelected ? 'bg-[var(--brand)] text-white' : 'border-[1.5px] border-[var(--border-strong)]'
                                }`}>
                                    {isSelected && <Check size={11} strokeWidth={3.5} />}
                                </span>
                                <span className='font-semibold text-[var(--text-primary)]'>{currency.code} {currency.symbol}</span>
                                <span className='text-[12px] text-[var(--text-secondary)]'>{currency.name}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className='flex flex-col gap-1.5'>
                <label htmlFor='debt-currency' className='text-[13px] font-semibold text-[var(--text-primary)]'>Default currency for debts</label>
                {/* Radix Select (via your shared ui/select.tsx), styled here so other dropdowns stay as they are */}
                <Select
                    value={value.debtCurrency}
                    onValueChange={(code) => onChange({ ...value, debtCurrency: code as CurrencyCode })}
                >
                    <SelectTrigger
                        id='debt-currency'
                        className='w-full data-[size=default]:h-12 rounded-[10px] border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-surface)] px-3.5 text-[14px] text-[var(--text-primary)] shadow-none cursor-pointer hover:border-[var(--text-tertiary)] data-[state=open]:border-[var(--brand)] focus-visible:border-[var(--brand)] focus-visible:ring-[3px] focus-visible:ring-[var(--brand-muted)]'
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                        position='popper'
                        sideOffset={6}
                        className='rounded-[12px] border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[0_12px_32px_rgba(28,25,23,0.14)]'
                    >
                        {CURRENCIES.map((currency) => (
                            <SelectItem
                                key={currency.code}
                                value={currency.code}
                                className='h-11 rounded-[8px] pl-3 pr-9 text-[14px] text-[var(--text-primary)] cursor-pointer focus:bg-[var(--bg-surface-2)] data-[state=checked]:font-semibold [&_svg]:!text-[var(--brand)]'
                            >
                                <span className='w-[64px] font-semibold'>{currency.code} {currency.symbol}</span>
                                <span className='text-[var(--text-secondary)] font-normal'>{currency.name}</span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <span className='text-[12px] text-[var(--text-secondary)]'>You can still pick a different currency for each debt.</span>
            </div>

            <div className='flex justify-end border-t border-[var(--border-subtle)] pt-5'>
                <button
                    type='button'
                    onClick={onNext}
                    className='h-10 px-5 rounded-[10px] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[14px] font-semibold text-white cursor-pointer transition-colors'
                >
                    Continue
                </button>
            </div>
        </section>
    )
}

export default ChooseCurrency
