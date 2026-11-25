import mongoose, { Schema, Document, models } from "mongoose";
import { SUPPORTED_EXCHANGES, type ExchangeId } from "@/lib/supportedExchanges";

export interface IExchangeCredential extends Document {
    userId: mongoose.Types.ObjectId;
    exchange: ExchangeId;
    apiKey: string;     
    apiSecret: string;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const ExchangeCredentialSchema = new Schema<IExchangeCredential>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exchange: {
        type: String,
        required: true,
        enum: SUPPORTED_EXCHANGES.map((exchange) => exchange.id),
    },
    apiKey: {
        type: String,
        required: true,
    },
    apiSecret: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
})

ExchangeCredentialSchema.index({ userId: 1, exchange: 1 }, { unique: true });

const ExchangeCredential = models.ExchangeCredential || mongoose.model<IExchangeCredential>('ExchangeCredential', ExchangeCredentialSchema);

export default ExchangeCredential;