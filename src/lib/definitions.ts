import * as z from 'zod'

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

export type FormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        general?: string[];
        item?: string[];
        amount?: string[];
    };
    error?: string;
    message?: string;
    userId?: string;
    token?: string;
};
