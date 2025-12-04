"use server"
import { cookies } from "next/headers";
import { verifyToken } from "../jwt";
import { connectDB } from "../mongodb";
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
    console.log('user id ' + decoded.userId); // this is the userId
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