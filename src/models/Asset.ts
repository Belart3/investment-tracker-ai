import mongoose, { Document, Schema, models } from "mongoose";

export type AssetStatus = "live" | "closed" | "deleted";

export interface IAsset extends Document {
    userId: mongoose.Types.ObjectId;
    symbol: string;
    quantity: number;
    purchasePrice: number;
    transactionDate: Date;
    notes?: string;
    status: AssetStatus;
    createdAt: Date;
    updatedAt: Date;
}

const AssetSchema = new Schema<IAsset>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        purchasePrice: {
            type: Number,
            required: true,
            min: 0,
        },
        transactionDate: {
            type: Date,
            required: true,
        },
        notes: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["live", "closed", "deleted"],
            default: "live",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
        collection: "assets",
    }
);

const Asset = models.Asset || mongoose.model<IAsset>("Asset", AssetSchema);

export default Asset;