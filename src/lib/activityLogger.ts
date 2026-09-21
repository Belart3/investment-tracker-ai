import { connectDB } from '../../lib/db';
import Activity, { ActivityActionType } from '../models/Activity';

interface LogUserActivityInput {
  userId: string;
  actionType: ActivityActionType;
  description: string;
  metadata?: Record<string, unknown>;
}

export async function logUserActivity({
  userId,
  actionType,
  description,
  metadata = {},
}: LogUserActivityInput): Promise<void> {
  try {
    await connectDB();
    await Activity.create({
      userId,
      actionType,
      description,
      metadata,
    });
  } catch (error) {
    console.error('Failed to log user activity:', error);
  }
}
