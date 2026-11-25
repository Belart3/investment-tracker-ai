'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ChooseCurrency, { type CurrencyChoice } from './ChooseCurrency'
import ChooseExchange from './ChooseExchange'
import EnterApiKey, { type ApiKeyValue } from './EnterApiKey'
import { STEPS, stepIndex, type StepKey } from './steps'
import type { ExchangeId } from '@/lib/supportedExchanges'

const OnboardingFlow = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Everything picked so far. It lives here, not inside each step, so going
    // back and forth between steps never loses a choice.
    const [currency, setCurrency] = useState<CurrencyChoice>({ displayCurrency: 'USD', debtCurrency: 'NGN' })
    const [currencyDone, setCurrencyDone] = useState(false)
    const [exchange, setExchange] = useState<ExchangeId | null>(null) // nothing picked until they click one
    const [apiKeys, setApiKeys] = useState<ApiKeyValue>({ apiKey: '', apiSecret: '' })

    // The furthest step you may see = the first one that isn't finished yet
    const furthestAllowed: StepKey = !currencyDone ? 'currency' : !exchange ? 'exchange' : 'api-key'

    // The step the URL asks for (anything missing or unknown means the first step)
    const requested = STEPS.find((step) => step.key === searchParams.get('step'))?.key ?? 'currency'
    const isAllowed = stepIndex(requested) <= stepIndex(furthestAllowed)
    const step = isAllowed ? requested : furthestAllowed

    // The guard: if the URL skips ahead (e.g. someone types ?step=exchange),
    // swap the URL for the furthest step they've actually reached.
    // replace (not push) so the Back button doesn't return to the skipped URL.
    useEffect(() => {
        if (!isAllowed) router.replace(`/onboarding?step=${furthestAllowed}`)
    }, [isAllowed, furthestAllowed, router])

    const goTo = (key: StepKey) => router.push(`/onboarding?step=${key}`)

    return (
        <div className='w-full flex justify-center items-start pt-6'>
            {step === 'currency' && (
                <ChooseCurrency
                    value={currency}
                    onChange={setCurrency}
                    onNext={() => {
                        setCurrencyDone(true)
                        goTo('exchange')
                    }}
                />
            )}

            {step === 'exchange' && (
                <ChooseExchange
                    value={exchange}
                    onChange={setExchange}
                    onBack={() => goTo('currency')}
                    onNext={() => goTo('api-key')}
                />
            )}

            {/* The guard already guarantees an exchange here; the check just tells TypeScript */}
            {step === 'api-key' && exchange && (
                <EnterApiKey
                    exchange={exchange}
                    currency={currency}
                    value={apiKeys}
                    onChange={setApiKeys}
                    onBack={() => goTo('exchange')}
                />
            )}
        </div>
    )
}

export default OnboardingFlow
