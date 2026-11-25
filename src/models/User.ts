import mongoose, {Schema, Document, models} from 'mongoose';
import { CURRENCIES, type CurrencyCode } from '@/lib/currencies';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    displayCurrency: CurrencyCode;  
    debtCurrency: CurrencyCode;    
    onboardedAt: Date | null;       
    createdAt: Date;
    updatedAt: Date;
}

const CURRENCY_CODES = CURRENCIES.map((currency) => currency.code);

const UserSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    displayCurrency: {
        type: String,
        enum: CURRENCY_CODES,
        default: 'USD',
    },
    debtCurrency: {
        type: String,
        enum: CURRENCY_CODES,
        default: 'NGN',
    },
    onboardedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
})

const User = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;