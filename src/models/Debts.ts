import mongoose, {Schema, Document, models} from "mongoose";

export interface IDebt extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    item: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

const DebtSchema: Schema = new Schema<IDebt>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    item: {
        type: String,
        required: true,
    }, 
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})

const Debt = models.Debt || mongoose.model<IDebt>('Debt', DebtSchema)

export default Debt;