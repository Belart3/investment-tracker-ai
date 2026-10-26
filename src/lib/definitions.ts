import * as z from 'zod'
import { CURRENCIES, type CurrencyCode } from './currencies'
import { SUPPORTED_EXCHANGES, type ExchangeId } from './supportedExchanges'

const CURRENCY_CODES = CURRENCIES.map((currency) => currency.code) as [CurrencyCode, ...CurrencyCode[]]
const CONNECTABLE_EXCHANGES = SUPPORTED_EXCHANGES
    .filter((exchange) => exchange.available)
    .map((exchange) => exchange.id) as [ExchangeId, ...ExchangeId[]]

export const SignupFormSchema = z.object({
    name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
    })
    .trim(),
})

export const SigninFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
    })
    .trim(),
})

export const DebtFormSchema = z.object({
    name: z.string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
    item: z.string()
    .min(2, {error: 'Item must be at least 2 characters long.' })
    .trim(),
    amount: z.number({ message: 'Amount must be a number.' })
})

export const OnboardingFormSchema = z.object({
    displayCurrency: z.enum(CURRENCY_CODES, { error: 'Pick a currency from the list.' }),
    debtCurrency: z.enum(CURRENCY_CODES, { error: 'Pick a currency from the list.' }),
    exchange: z.enum(CONNECTABLE_EXCHANGES, { error: 'This exchange can’t be connected yet.' }),
    apiKey: z.string({ error: 'Paste your API key.' })
    .trim()
    .min(1, { error: 'Paste your API key.' })
    .max(200, { error: 'That doesn’t look like an API key.' }),
    apiSecret: z.string({ error: 'Paste your API secret.' })
    .trim()
    .min(1, { error: 'Paste your API secret.' })
    .max(200, { error: 'That doesn’t look like an API secret.' }),
})

export type FormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        general?: string[];
        item?: string[];
        amount?: string[];
        displayCurrency?: string[];
        debtCurrency?: string[];
        exchange?: string[];
        apiKey?: string[];
        apiSecret?: string[];
    };
    error?: string;
    message?: string;
    userId?: string;
    token?: string;
};
