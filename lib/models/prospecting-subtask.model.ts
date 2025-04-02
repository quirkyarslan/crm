import mongoose, { Schema, Document } from 'mongoose';

export interface IProspectingSubtask extends Document {
  taskId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProspectingSubtaskSchema = new Schema<IProspectingSubtask>(
  {
    taskId: { type: Schema.Types.ObjectId, ref: 'ProspectingTask', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const ProspectingSubtask = mongoose.models.ProspectingSubtask || mongoose.model<IProspectingSubtask>('ProspectingSubtask', ProspectingSubtaskSchema); 