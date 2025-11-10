'use server';
import bcrypt from 'bcryptjs';
import { SignupFormSchema, FormState } from "../lib/definitions";

export async function signup(state: FormState, formData: FormData) {
    //first, validate the form data
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    //simulate user creation
    const { name, email, password } = validatedFields.data
    const hashpassword = await bcrypt.hash(password, 10)
}