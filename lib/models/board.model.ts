import mongoose, { Schema, Document } from 'mongoose';

export interface IBoard extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  color: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema = new Schema<IBoard>(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Board = mongoose.models.Board || mongoose.model<IBoard>('Board', BoardSchema); 