'use server';
import bcrypt from 'bcryptjs';
import { SignupFormSchema, FormState } from "../../lib/definitions";
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
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

    const { name, email, password } = validatedFields.data
    const hashpassword = await bcrypt.hash(password, 10)

    //insert user into database
    try {
        await connectDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                errors: {
                    email: ['An Account already exists with this Email.'],
                },
                error: 'An Account already exists with this Email',
            }
        }
        const user = {
            name,
            email,
            password: hashpassword,
        }

        const newUser = new User(user);
        await User.create(newUser);

        const token = generateToken(newUser._id.toString());

        (await cookies()).set({
            name: 'token',
            httpOnly: true,
            value: token,
            path: '/',
            maxAge: 60 * 120,
        })
        
        return { 
            message: 'Account created successfully',
            userId: newUser._id.toString(),
        };
    } catch (error) {
        console.error('Error during user signup:', error);
        return {
            error: 'Internal server error during signup.',
        }
    }
    
}