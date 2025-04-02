import mongoose, { Schema, Document } from 'mongoose';

export interface IProspectingComment extends Document {
  taskId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProspectingCommentSchema = new Schema<IProspectingComment>(
  {
    taskId: { type: Schema.Types.ObjectId, ref: 'ProspectingTask', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ProspectingComment = mongoose.models.ProspectingComment || mongoose.model<IProspectingComment>('ProspectingComment', ProspectingCommentSchema); 