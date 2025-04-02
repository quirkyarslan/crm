import mongoose, { Schema, Document } from 'mongoose';

export interface IProspectingTask extends Document {
  _id: mongoose.Types.ObjectId;
  boardId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  assignees: mongoose.Types.ObjectId[];
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  date: Date;
  storyPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProspectingTaskSchema = new Schema<IProspectingTask>(
  {
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true, default: 'low' },
    tags: [{ type: String }],
    date: { type: Date, default: new Date() },
    storyPoints: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const ProspectingTask = mongoose.models.ProspectingTask || mongoose.model<IProspectingTask>('ProspectingTask', ProspectingTaskSchema); 