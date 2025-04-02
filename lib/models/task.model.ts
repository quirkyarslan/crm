import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignee {
  id: string;
  name: string;
  image?: string;
}

export interface ITag {
  id: string;
  name: string;
  color: string;
}

export interface ITask extends Document {
  boardId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignees: IAssignee[];
  tags: ITag[];
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  image?: string;
  category?: string;
  subTasks?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

const taskSchema = new Schema<ITask>(
  {
    boardId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignees: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      image: { type: String },
    }],
    tags: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      color: { type: String, required: true },
    }],
    dueDate: { type: String, required: true },
    createdBy: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    subTasks: [{
      id: { type: String, required: true },
      title: { type: String, required: true },
      completed: { type: Boolean, default: false },
    }],
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema); 