"use server"
import { connectDB } from "@/lib/mongodb";
import { DebtFormSchema, FormState } from "@/lib/definitions";
import { addDebt } from "@/lib/debts";

export async function addDebtAction(state: FormState, formData: FormData): Promise<FormState> {

    const validatedFields = DebtFormSchema.safeParse({
        name: formData.get('name'),
        item: formData.get('item'),
        amount: formData.get('amount') ? Number(formData.get('amount')) : NaN ,
    })

    if (!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const {name, item, amount} = validatedFields.data;

    try {
        await connectDB();
        const newDebt = await addDebt(name, item, amount);
        console.log('Saved debt:', newDebt);
        if (!newDebt) {
            return {
                error: 'Failed to add debt. Please try again.',
            }
        }
        return {
            message: 'Debt added successfully',
        };
    } catch (error) {
        console.error('Error adding debt:', error);
        return {
            error: 'An unexpected error occurred. Please try again later.',
        };
    }
}