'use server';
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import User from "@/models/User";
import { connectDB } from "./mongodb";

export type SafeUser = {
    _id?: string;
    name?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
};

export async function getCurrentUser(): Promise<SafeUser | null> {
    await connectDB();

    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return null;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return null;
    }

    const user = await User.findById(decoded.userId).select('-password').lean();
    if (!user || typeof user !== 'object' || Array.isArray(user)) {
        return null;
    }

    return {
        _id: user._id ? String(user._id) : undefined,
        name: typeof user.name === 'string' ? user.name : undefined,
        email: typeof user.email === 'string' ? user.email : undefined,
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : undefined,
        updatedAt: user.updatedAt ? new Date(user.updatedAt).toISOString() : undefined,
    };
}