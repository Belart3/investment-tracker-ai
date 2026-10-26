import { requireUser } from "@/lib/requireUser";
import { connectDB } from "@/lib/mongodb";
import Debts from "@/models/Debts";
import mongoose from "mongoose";

// GET debts for current user
export async function GET() {
    const auth = await requireUser();
    if (!auth.ok) return auth.response;

    try {
        await connectDB();
        const debts = await Debts.find({ userId: new mongoose.Types.ObjectId(auth.userId) }).sort({ createdAt: -1 });
        return new Response(JSON.stringify(debts), { status: 200 });
    } catch (error: any) {
        console.error('Failed to fetch debts:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch debts' }), { status: 500 });
    }
}

// POST a new debt
export async function POST(req: Request) {
    const auth = await requireUser();
    if (!auth.ok) return auth.response;

    try {
        const { name, item, amount } = await req.json();
        await connectDB();

        const newDebt = new Debts({
            userId: new mongoose.Types.ObjectId(auth.userId),
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
