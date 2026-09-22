import mongoose, { Document, Schema, models } from 'mongoose';

export type ActivityActionType =
  | 'ASSET_CREATED'
  | 'TARGET_CREATED'
  | 'TARGET_MET'
  | 'TRADE_BUY'
  | 'TRADE_SELL';

export interface IActivity extends Document {
  userId: string;
  actionType: ActivityActionType;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  actionType: {
    type: String,
    enum: ['ASSET_CREATED', 'TARGET_CREATED', 'TARGET_MET', 'TRADE_BUY', 'TRADE_SELL'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: undefined,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ActivitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

const Activity =
  models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);

export default Activity;
