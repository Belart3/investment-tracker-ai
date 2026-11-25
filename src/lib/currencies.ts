// Currencies the app can show totals in. Add one here and it appears
// everywhere that lists currencies (onboarding, settings, debt forms).
export const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US dollar' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian naira' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British pound' },
] as const

// 'USD' | 'NGN' | 'EUR' | 'GBP' — worked out from the list above, so it never goes out of sync
export type CurrencyCode = (typeof CURRENCIES)[number]['code']
