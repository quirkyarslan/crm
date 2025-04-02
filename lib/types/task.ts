export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'default';

export interface TaskTag {
  id: string;
  name: string;
  color: string;
}

export interface TaskAssignee {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

export interface Task {
  id: string;
  boardId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  assignees: TaskAssignee[];
  tags: TaskTag[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  checklist?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
} 