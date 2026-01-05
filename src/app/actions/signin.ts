'use server';
import bcrypt from 'bcryptjs';
import { SigninFormSchema, FormState } from "../../lib/definitions";
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '../../lib/jwt';
import { cookies } from 'next/headers';

export async function signin(state: FormState, formData: FormData): Promise<FormState> {
    //first, validate the form data
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    //check if user exists and password matches
    try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            return {
                errors: {
                    email: ['Account not found!'],
                },
                error: 'Account not found!',
            }
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return {
                errors: {
                    password: ['Incorrect password!'],
                },
                error: 'Incorrect password!',
            }
        }
        const token = generateToken(user._id.toString());

        (await cookies()).set({
            name: 'token', 
            httpOnly: true,
            value: token,
            path: '/',
            maxAge: 60 * 60,
        })

        return { 
            message: `welcome back, ${user.name}! Sign in successful.`,
            userId: user._id.toString(),
        };
    } catch (error) {
        console.error('Error during user signin:', error);
        return {
            error: 'server error, please try again later',
        }
    }
    
}