import mongoose, { Document, Schema, models } from "mongoose";

export interface IPortfolioSnapshot extends Document {
    userId: string;
    date: Date;
    totalValue: number;
    accountType?: string;
    assets: {
        coin: string;
        usdValue: number;
        walletBalance: number;
    }[];
}

const PortfolioSnapshotSchema = new Schema<IPortfolioSnapshot>(
    {
        userId: {
        type: String,
        required: true,
        index: true,
        },
        date: {
        type: Date,
        required: true,
        },
        totalValue: {
        type: Number,
        required: true,
        },
        accountType: String,
        assets: [
        {
            coin: { type: String, required: true },
            usdValue: { type: Number, required: true },
            walletBalance: { type: Number, required: true },
        },
        ],
    },
    { timestamps: true, collection: "portfolioSnapshots" }
);

PortfolioSnapshotSchema.index({ userId: 1, date: 1 }, { unique: true });

const PortfolioSnapshot =
    models.PortfolioSnapshot ||
    mongoose.model<IPortfolioSnapshot>("PortfolioSnapshot", PortfolioSnapshotSchema);

export default PortfolioSnapshot;
