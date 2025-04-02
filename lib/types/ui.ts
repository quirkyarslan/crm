import { StaticImageData } from 'next/image';
import { IAssignee } from '@/lib/models/task.model';
import { IUser } from '@/models/User';
import { IProspectingTask } from '@/lib/models/prospecting-task.model';
import { IProspectingSubtask } from '@/lib/models/prospecting-subtask.model';
import { IProspectingComment } from '@/lib/models/prospecting-comment.model';
import { Types } from 'mongoose';

export interface UITask extends Omit<IProspectingTask, 'assignees'> {
  assignees: IUser[];
  status: string;
  priority: 'low' | 'medium' | 'high';
  image?: string;
  category?: string;
  list?: any[];
}

export interface UISubtask extends Omit<IProspectingSubtask, 'assignees'> {
  _id: Types.ObjectId;
  assignees: IUser[];
  status: string;
  priority: 'low' | 'medium' | 'high';
  image?: string;
  completed: boolean;
  assignDate: string;
  dueDate: string;
  logo: null;
}

export interface UIComment extends IProspectingComment {
  user: IUser;
}