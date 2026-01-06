import mongoose, {Schema, Document, models} from "mongoose";

export interface IAsset extends Document {
    userId: mongoose.Types.ObjectId;
    assetSymbol: string;
    quantity: number;
    purchasePrice: number;
    transactionDate: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AssetSchema: Schema = new Schema<IAsset>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    assetSymbol: {
        type: String,
        required: true,
    }, 
    quantity: {
        type: Number,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    transactionDate: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
})

const Asset = models.Asset || mongoose.model<IAsset>('Asset', AssetSchema)

export default Asset;