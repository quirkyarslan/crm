import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBoard } from '@/lib/models/board.model';
import { IProspectingTask } from '@/lib/models/prospecting-task.model';
import { IProspectingSubtask } from '@/lib/models/prospecting-subtask.model';
import { IProspectingComment } from '@/lib/models/prospecting-comment.model';
import mongoose from 'mongoose';

export interface ProspectingState {
  boards: IBoard[];
  tasks: IProspectingTask[];
  subtasks: { [key: string]: IProspectingSubtask[] };
  comments: { [key: string]: IProspectingComment[] };
  loading: boolean;
  error: string | null;
}

const initialState: ProspectingState = {
  boards: [],
  tasks: [],
  subtasks: {},
  comments: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchBoards = createAsyncThunk(
  'prospecting/fetchBoards',
  async () => {
    const response = await fetch('/api/prospecting/boards');
    const data = await response.json();
    return data;
  }
);

export const createBoard = createAsyncThunk(
  'prospecting/createBoard',
  async (boardData: { name: string; color: string; order: number }) => {
    const response = await fetch('/api/prospecting/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(boardData),
    });
    const data = await response.json();
    return data;
  }
);

export const updateBoard = createAsyncThunk(
  'prospecting/updateBoard',
  async ({ id, data }: { id: string; data: Partial<IBoard> }) => {
    const response = await fetch('/api/prospecting/boards', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    const result = await response.json();
    return result;
  }
);

export const deleteBoard = createAsyncThunk(
  'prospecting/deleteBoard',
  async (id: string) => {
    await fetch(`/api/prospecting/boards?id=${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

export const updateBoardOrder = createAsyncThunk(
  'prospecting/updateBoardOrder',
  async (boards: { id: string; order: number }[]) => {
    await fetch('/api/prospecting/boards/order', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(boards),
    });
    return boards;
  }
);

export const fetchTasks = createAsyncThunk(
  'prospecting/fetchTasks',
  async (boardId?: string) => {
    const url = boardId 
      ? `/api/prospecting/tasks?boardId=${boardId}`
      : '/api/prospecting/tasks';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

export const createTask = createAsyncThunk(
  'prospecting/createTask',
  async (taskData: Omit<IProspectingTask, keyof Document>) => {
    const response = await fetch('/api/prospecting/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    return data;
  }
);

export const updateTask = createAsyncThunk(
  'prospecting/updateTask',
  async ({ id, data }: { id: string; data: Partial<IProspectingTask> }) => {
    const response = await fetch('/api/prospecting/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    const result = await response.json();
    return result;
  }
);

export const deleteTask = createAsyncThunk(
  'prospecting/deleteTask',
  async (id: string) => {
    await fetch(`/api/prospecting/tasks?id=${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

export const moveTask = createAsyncThunk(
  'prospecting/moveTask',
  async ({ taskId, boardId }: { taskId: string; boardId: string }) => {
    const response = await fetch('/api/prospecting/tasks/move', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, boardId }),
    });
    const data = await response.json();
    return data;
  }
);

export const fetchSubtasks = createAsyncThunk(
  'prospecting/fetchSubtasks',
  async (taskId: string) => {
    const response = await fetch(`/api/prospecting/subtasks?taskId=${taskId}`);
    const data = await response.json();
    return { taskId, subtasks: data };
  }
);

export const createSubtask = createAsyncThunk(
  'prospecting/createSubtask',
  async (subtaskData: Omit<IProspectingSubtask, keyof Document>) => {
    const response = await fetch('/api/prospecting/subtasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subtaskData),
    });
    const data = await response.json();
    return data;
  }
);

export const updateSubtask = createAsyncThunk(
  'prospecting/updateSubtask',
  async ({ id, data }: { id: string; data: Partial<IProspectingSubtask> }) => {
    const response = await fetch('/api/prospecting/subtasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    const result = await response.json();
    return result;
  }
);

export const deleteSubtask = createAsyncThunk(
  'prospecting/deleteSubtask',
  async (id: string) => {
    await fetch(`/api/prospecting/subtasks?id=${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

export const fetchComments = createAsyncThunk(
  'prospecting/fetchComments',
  async (taskId: string) => {
    const response = await fetch(`/api/prospecting/comments?taskId=${taskId}`);
    const data = await response.json();
    return { taskId, comments: data };
  }
);

export const createComment = createAsyncThunk(
  'prospecting/createComment',
  async (commentData: Omit<IProspectingComment, keyof Document>) => {
    const response = await fetch('/api/prospecting/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });
    const data = await response.json();
    return data;
  }
);

export const updateComment = createAsyncThunk(
  'prospecting/updateComment',
  async ({ id, data }: { id: string; data: Partial<IProspectingComment> }) => {
    const response = await fetch('/api/prospecting/comments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    const result = await response.json();
    return result;
  }
);

export const deleteComment = createAsyncThunk(
  'prospecting/deleteComment',
  async (id: string) => {
    await fetch(`/api/prospecting/comments?id=${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

const prospectingSlice = createSlice({
  name: 'prospecting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Boards
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch boards';
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const index = state.boards.findIndex(board => board._id === action.payload._id);
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(board => board._id.toString() !== action.payload);
      })
      .addCase(updateBoardOrder.fulfilled, (state, action) => {
        action.payload.forEach(({ id, order }) => {
          const board = state.boards.find(b => b._id.toString() === id);
          if (board) {
            board.order = order;
          }
        });
        state.boards.sort((a, b) => a.order - b.order);
      })
      // Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id.toString() !== action.payload);
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      // Subtasks
      .addCase(fetchSubtasks.fulfilled, (state, action) => {
        state.subtasks[action.payload.taskId] = action.payload.subtasks;
      })
      .addCase(createSubtask.fulfilled, (state, action) => {
        const taskId = action.payload.taskId.toString();
        if (!state.subtasks[taskId]) {
          state.subtasks[taskId] = [];
        }
        state.subtasks[taskId].push(action.payload);
      })
      .addCase(updateSubtask.fulfilled, (state, action) => {
        const taskId = action.payload.taskId.toString();
        if (state.subtasks[taskId]) {
          const index = state.subtasks[taskId].findIndex(subtask => subtask._id === action.payload._id);
          if (index !== -1) {
            state.subtasks[taskId][index] = action.payload;
          }
        }
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        Object.keys(state.subtasks).forEach(taskId => {
          state.subtasks[taskId] = state.subtasks[taskId].filter(subtask => subtask._id !== action.payload);
        });
      })
      // Comments
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments[action.payload.taskId] = action.payload.comments;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const taskId = action.payload.taskId.toString();
        if (!state.comments[taskId]) {
          state.comments[taskId] = [];
        }
        state.comments[taskId].push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const taskId = action.payload.taskId.toString();
        if (state.comments[taskId]) {
          const index = state.comments[taskId].findIndex(comment => comment._id === action.payload._id);
          if (index !== -1) {
            state.comments[taskId][index] = action.payload;
          }
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        Object.keys(state.comments).forEach(taskId => {
          state.comments[taskId] = state.comments[taskId].filter(comment => comment._id !== action.payload);
        });
      });
  },
});

export default prospectingSlice.reducer; 