import 'server-only';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { decrypt } from '@/lib/encryption';
import ExchangeCredential from '@/models/ExchangeCredential';
import type { ExchangeId } from '@/lib/supportedExchanges';

export type Credentials = {
    apiKey: string;
    apiSecret: string;
    expiresAt: Date | null;
};

type StoredCredential = { apiKey: string; apiSecret: string; expiresAt?: Date | null };

// A user's saved key for one exchange, unlocked and ready to use.
// null = they haven't connected that exchange.
export async function getCredentials(userId: string, exchange: ExchangeId): Promise<Credentials | null> {
    await connectDB();

    const record = await ExchangeCredential.findOne({ userId: new mongoose.Types.ObjectId(userId), exchange })
        .select('apiKey apiSecret expiresAt')
        .lean<StoredCredential>();

    if (!record) return null;

    return {
        apiKey: decrypt(record.apiKey),
        apiSecret: decrypt(record.apiSecret),
        expiresAt: record.expiresAt ?? null,
    };
}
