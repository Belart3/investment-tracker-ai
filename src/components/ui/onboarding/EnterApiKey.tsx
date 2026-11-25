'use client'
import { useActionState, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { SUPPORTED_EXCHANGES, type ExchangeId } from '@/lib/supportedExchanges'
import { completeOnboarding } from '@/app/actions/onboarding'
import ExchangeLogo from '@/components/ui/ExchangeLogo'
import type { CurrencyChoice } from './ChooseCurrency'

export type ApiKeyValue = {
    apiKey: string
    apiSecret: string
}

type Props = {
    exchange: ExchangeId
    currency: CurrencyChoice
    value: ApiKeyValue
    onChange: (value: ApiKeyValue) => void
    onBack: () => void
}

// How to create a read-only key, per exchange. Add an entry when an exchange goes live.
const KEY_GUIDES: Partial<Record<ExchangeId, string[]>> = {
    bybit: [
        'In Bybit, open your profile menu and choose API.',
        'Create a new key and pick “System-generated”.',
        'Set permissions to Read-Only. Don’t tick Trade, Transfer or Withdraw.',
        'Copy the key and secret into the fields below.',
    ],
}

const inputClass =
    'h-11 w-full rounded-[10px] border-[1.5px] bg-[var(--bg-surface)] px-3.5 font-mono text-[14px] text-[var(--text-primary)] placeholder:font-sans placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand)] focus:ring-[3px] focus:ring-[var(--brand-muted)]'

// Step 3 of onboarding. Submitting runs the completeOnboarding server action,
// which validates, encrypts and saves everything, then goes to the dashboard.
const EnterApiKey = ({ exchange, currency, value, onChange, onBack }: Props) => {
    const [showSecret, setShowSecret] = useState(false)
    const [state, formAction, pending] = useActionState(completeOnboarding, {})

    const exchangeName = SUPPORTED_EXCHANGES.find((e) => e.id === exchange)?.name ?? exchange
    const guide = KEY_GUIDES[exchange] ?? []
    const isComplete = value.apiKey.trim() !== '' && value.apiSecret.trim() !== ''

    const keyError = state.errors?.apiKey?.[0]
    const secretError = state.errors?.apiSecret?.[0]
    // Problems with the earlier steps' choices can't be shown next to a field here
    const choiceError = state.errors?.displayCurrency?.[0] ?? state.errors?.debtCurrency?.[0] ?? state.errors?.exchange?.[0]
    const generalError = state.error ?? choiceError

    return (
        <form
            action={formAction}
            className='w-full max-w-[620px] flex flex-col gap-6 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8'
        >
            {/* Choices from steps 1 and 2 travel with the form */}
            <input type='hidden' name='displayCurrency' value={currency.displayCurrency} />
            <input type='hidden' name='debtCurrency' value={currency.debtCurrency} />
            <input type='hidden' name='exchange' value={exchange} />

            <div className='flex items-start gap-3.5'>
                <ExchangeLogo id={exchange} size={40} />
                <div>
                    <h1 className='font-display text-[26px] font-semibold leading-tight text-[var(--text-primary)]'>Add your {exchangeName} API key</h1>
                    <p className='mt-1.5 text-[15px] text-[var(--text-secondary)]'>
                        Use a <span className='font-semibold text-[var(--text-primary)]'>read-only</span> key. We can see balances, never trade or withdraw.
                    </p>
                </div>
            </div>

            {guide.length > 0 && (
                <ol className='flex flex-col gap-2 rounded-[12px] border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] p-4 pl-9 list-decimal text-[14px] text-[var(--text-primary)] marker:font-semibold marker:text-[var(--text-secondary)]'>
                    {guide.map((line) => <li key={line} className='pl-1'>{line}</li>)}
                </ol>
            )}

            <div className='flex flex-col gap-1.5'>
                <label htmlFor='api-key' className='text-[13px] font-semibold text-[var(--text-primary)]'>API key</label>
                <input
                    id='api-key'
                    name='apiKey'
                    value={value.apiKey}
                    onChange={(event) => onChange({ ...value, apiKey: event.target.value })}
                    placeholder='Paste your API key'
                    autoComplete='off'
                    spellCheck={false}
                    aria-invalid={!!keyError}
                    aria-describedby={keyError ? 'api-key-error' : undefined}
                    className={`${inputClass} ${keyError ? 'border-[var(--negative)]' : 'border-[var(--border-strong)]'}`}
                />
                {keyError && <p id='api-key-error' className='text-[12px] text-[var(--negative)]'>{keyError}</p>}
            </div>

            <div className='flex flex-col gap-1.5'>
                <label htmlFor='api-secret' className='text-[13px] font-semibold text-[var(--text-primary)]'>API secret</label>
                <div className='relative'>
                    <input
                        id='api-secret'
                        name='apiSecret'
                        type={showSecret ? 'text' : 'password'}
                        value={value.apiSecret}
                        onChange={(event) => onChange({ ...value, apiSecret: event.target.value })}
                        placeholder='Paste your API secret'
                        autoComplete='off'
                        spellCheck={false}
                        aria-invalid={!!secretError}
                        aria-describedby={secretError ? 'api-secret-error' : undefined}
                        className={`${inputClass} pr-11 ${secretError ? 'border-[var(--negative)]' : 'border-[var(--border-strong)]'}`}
                    />
                    <button
                        type='button'
                        onClick={() => setShowSecret(!showSecret)}
                        aria-label={showSecret ? 'Hide secret' : 'Show secret'}
                        className='absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center size-8 rounded-[8px] text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--bg-surface-2)]'
                    >
                        {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {secretError
                    ? <p id='api-secret-error' className='text-[12px] text-[var(--negative)]'>{secretError}</p>
                    : <p className='text-[12px] text-[var(--text-secondary)]'>Encrypted before it&apos;s stored. You can remove it any time in Settings.</p>}
            </div>

            {generalError && (
                <p role='alert' className='rounded-[10px] border border-[var(--negative)] bg-[var(--negative-muted)] px-3.5 py-2.5 text-[13px] text-[var(--negative)]'>
                    {generalError}
                </p>
            )}

            <div className='flex justify-between border-t border-[var(--border-subtle)] pt-5'>
                <button
                    type='button'
                    onClick={onBack}
                    disabled={pending}
                    className='h-10 px-5 rounded-[10px] border border-[var(--border-strong)] text-[14px] font-semibold text-[var(--text-primary)] cursor-pointer hover:bg-[var(--bg-surface-2)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
                >
                    Back
                </button>
                <button
                    type='submit'
                    disabled={!isComplete || pending}
                    className='h-10 px-5 rounded-[10px] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[14px] font-semibold text-white cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[var(--brand)]'
                >
                    {pending ? 'Saving…' : 'Save and finish'}
                </button>
            </div>
        </form>
    )
}

export default EnterApiKey
