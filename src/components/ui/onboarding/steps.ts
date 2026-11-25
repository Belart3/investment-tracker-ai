// The onboarding steps, in order. The header and the flow both read this list,
// so they always agree on what the steps are called and which comes first.
export const STEPS = [
    { key: 'currency', label: 'Currency' },
    { key: 'exchange', label: 'Exchange' },
    { key: 'api-key', label: 'API key' },
] as const

// 'currency' | 'exchange' | 'api-key'
export type StepKey = (typeof STEPS)[number]['key']

export const stepIndex = (key: StepKey) => STEPS.findIndex((step) => step.key === key)
