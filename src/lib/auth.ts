'use server';
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import User from "@/models/User";
import { connectDB } from "./mongodb";

export async function getCurrentUser() {
    await connectDB();

    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return null;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return null;
    }

    const user = await User.findById(decoded.userId).select('-password');
    return user;
}