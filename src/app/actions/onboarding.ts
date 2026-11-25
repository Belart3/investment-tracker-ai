'use server';
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import ExchangeCredential from "@/models/ExchangeCredential";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import { encrypt } from "@/lib/encryption";
import { verifyBybitKey } from "@/lib/exchanges/bybit/verifyKey";
import { OnboardingFormSchema, FormState } from "@/lib/definitions";

export async function completeOnboarding(state: FormState, formData: FormData): Promise<FormState> {
    // 1. who is this?
    const user = await getCurrentUser();
    if (!user?._id) {
        redirect('/signin?next=/onboarding');
    }

    // 2. is everything valid?
    const validatedFields = OnboardingFormSchema.safeParse({
        displayCurrency: formData.get('displayCurrency'),
        debtCurrency: formData.get('debtCurrency'),
        exchange: formData.get('exchange'),
        apiKey: formData.get('apiKey'),
        apiSecret: formData.get('apiSecret'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { displayCurrency, debtCurrency, exchange, apiKey, apiSecret } = validatedFields.data;
    const userId = new mongoose.Types.ObjectId(user._id);

    // 2b. does the key really work with Bybit, and is it read-only?
    // (Bybit is the only connectable exchange today; with more, pick the checker by `exchange`)
    const keyCheck = await verifyBybitKey(apiKey, apiSecret);
    if (!keyCheck.ok) {
        return keyCheck.field === 'general'
            ? { error: keyCheck.message }
            : { errors: { [keyCheck.field]: [keyCheck.message] } };
    }

    try {
        await connectDB();

        // 3 + 4. lock the keys, then save them: update this user's record for
        // this exchange if it exists, otherwise create it
        await ExchangeCredential.findOneAndUpdate(
            { userId, exchange },
            { apiKey: encrypt(apiKey), apiSecret: encrypt(apiSecret), expiresAt: keyCheck.expiresAt },
            { upsert: true, runValidators: true },
        );

        // 5. save the profile, and mark onboarding as done (only after the keys are safely saved)
        await User.findByIdAndUpdate(
            userId,
            { displayCurrency, debtCurrency, onboardedAt: new Date() },
            { runValidators: true },
        );
    } catch (error) {
        console.error('Error during onboarding:', error);
        return {
            error: 'We couldn’t save your details. Please try again.',
        };
    }

    // 6. done: off to the dashboard (must be outside try/catch, see notes)
    redirect('/');
}

export async function skipOnboarding(): Promise<void> {
    const user = await getCurrentUser();
    if (!user?._id) {
        redirect('/signin?next=/onboarding');
    }

    try {
        await connectDB();
        // Only marks onboarding as done; currencies keep the User model defaults (USD / NGN)
        await User.findByIdAndUpdate(user._id, { onboardedAt: new Date() });
    } catch (error) {
        // Not worth blocking them over: worst case they see onboarding again next time
        console.error('Error skipping onboarding:', error);
    }

    redirect('/');
}
