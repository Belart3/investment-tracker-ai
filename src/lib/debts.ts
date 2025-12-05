"use server"
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import Debts from "@/models/Debts";
import mongoose from "mongoose";

export async function addDebt (name: string, item: string, amount: number) {
    await connectDB();

    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return null;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return null;
    }
    if (decoded) {
    console.log('user id ' + decoded.userId); 
    }

    const newDebt = new Debts({
        userId: new mongoose.Types.ObjectId(decoded.userId),
        name,
        item,
        amount
    });
    await newDebt.save();
    return newDebt;
}

export async function getDebtsByUserId (userId: string) {
    await connectDB();
    const debts = await Debts.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
    return debts;
}