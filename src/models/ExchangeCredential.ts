import mongoose, { Schema, Document, models } from "mongoose";

export interface IExchangeCredential extends Document {
    userId: mongoose.Types.ObjectId;
    exchange: string;
    apiKey: string;
    apiSecret: string;
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
        enum: ['binance', 'coinbase', 'bybit', 'bitfinex'], 
    },
    apiKey: {
        type: String,
        required: true,
    },
    apiSecret: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

const ExchangeCredential = models.ExchangeCredential || mongoose.model<IExchangeCredential>('ExchangeCredential', ExchangeCredentialSchema);

export default ExchangeCredential;