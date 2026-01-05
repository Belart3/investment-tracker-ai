"use server"
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import Debts from "@/models/Debts";
import mongoose from "mongoose";

// Helper: Get userId from cookie token
async function getUserIdFromCookies() {
    const token = (await cookies()).get('token')?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded?.userId || null;
}

// GET debts for current user
export async function GET() {
    try {
        const userId = await getUserIdFromCookies();
        if (!userId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        await connectDB();
        const debts = await Debts.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
        return new Response(JSON.stringify(debts), { status: 200 });
    } catch (error: any) {
        console.error('Failed to fetch debts:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch debts' }), { status: 500 });
    }
}

// POST a new debt
export async function POST(req: Request) {
    try {
        const userId = await getUserIdFromCookies();
        if (!userId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const { name, item, amount } = await req.json();
        await connectDB();

        const newDebt = new Debts({
            userId: new mongoose.Types.ObjectId(userId),
            name,
            item,
            amount
        });

        await newDebt.save();
        return new Response(JSON.stringify(newDebt), { status: 201 });
    } catch (error: any) {
        console.error('Failed to add debt:', error);
        return new Response(JSON.stringify({ error: 'Failed to add debt' }), { status: 500 });
    }
}
