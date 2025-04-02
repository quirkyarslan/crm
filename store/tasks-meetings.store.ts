import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus, TaskPriority } from '@/lib/types/task';
import { Meeting, MeetingType, MeetingStatus } from '@/lib/types/meeting';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './index';
import { tasksService } from '@/lib/services/tasks.service';
import { meetingsService } from '@/lib/services/meetings.service';

interface TaskFilters {
  search: string;
  priority: TaskPriority | 'all';
  assignee: string | 'all';
  date: 'all' | 'today' | 'week' | 'month';
  tags: string[];
}

interface MeetingFilters {
  search: string;
  type: MeetingType | 'all';
  time: 'all' | 'upcoming' | 'past';
  participant: string | 'all';
  date: 'all' | 'today' | 'week' | 'month';
}

export interface TasksMeetingsState {
  tasks: Task[];
  selectedTask: Task | null;
  isTaskDrawerOpen: boolean;
  taskFilters: TaskFilters;
  meetings: Meeting[];
  selectedMeeting: Meeting | null;
  isMeetingDrawerOpen: boolean;
  meetingFilters: MeetingFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksMeetingsState = {
  tasks: [],
  selectedTask: null,
  isTaskDrawerOpen: false,
  taskFilters: {
    search: '',
    priority: 'all',
    assignee: 'all',
    date: 'all',
    tags: [],
  },
  meetings: [],
  selectedMeeting: null,
  isMeetingDrawerOpen: false,
  meetingFilters: {
    search: '',
    type: 'all',
    time: 'all',
    participant: 'all',
    date: 'all',
  },
  isLoading: false,
  error: null,
};

const tasksMeetingsSlice = createSlice({
  name: 'tasksMeetings',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.error = null;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask: Task = {
        ...action.payload,
        id: action.payload.id,
        createdAt: new Date(action.payload.createdAt).toISOString(),
        updatedAt: new Date(action.payload.updatedAt).toISOString(),
      };
      state.tasks.push(newTask);
      state.error = null;
    },
    updateTask: (state, action: PayloadAction<{ taskId: string; updates: Partial<Task> }>) => {
      const { taskId, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { 
          ...state.tasks[taskIndex], 
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      state.error = null;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.error = null;
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; newBoardId: string }>) => {
      const { taskId, newBoardId } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].boardId = newBoardId as TaskStatus;
        state.tasks[taskIndex].updatedAt = new Date().toISOString();
      }
      state.error = null;
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setIsTaskDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isTaskDrawerOpen = action.payload;
    },
    setTaskFilters: (state, action: PayloadAction<Partial<TaskFilters>>) => {
      state.taskFilters = { ...state.taskFilters, ...action.payload };
    },
    setMeetings: (state, action: PayloadAction<Meeting[]>) => {
      state.meetings = action.payload;
      state.error = null;
    },
    addMeeting: (state, action: PayloadAction<Meeting>) => {
      state.meetings.push(action.payload);
      state.error = null;
    },
    updateMeeting: (state, action: PayloadAction<{ meetingId: string; updates: Partial<Meeting> }>) => {
      const { meetingId, updates } = action.payload;
      const meetingIndex = state.meetings.findIndex(meeting => meeting.id === meetingId);
      if (meetingIndex !== -1) {
        state.meetings[meetingIndex] = { 
          ...state.meetings[meetingIndex], 
          ...updates,
        };
      }
      state.error = null;
    },
    deleteMeeting: (state, action: PayloadAction<string>) => {
      state.meetings = state.meetings.filter(meeting => meeting.id !== action.payload);
      state.error = null;
    },
    setSelectedMeeting: (state, action: PayloadAction<Meeting | null>) => {
      state.selectedMeeting = action.payload;
    },
    setIsMeetingDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isMeetingDrawerOpen = action.payload;
    },
    setMeetingFilters: (state, action: PayloadAction<Partial<MeetingFilters>>) => {
      state.meetingFilters = { ...state.meetingFilters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  setSelectedTask,
  setIsTaskDrawerOpen,
  setTaskFilters,
  setMeetings,
  addMeeting,
  updateMeeting,
  deleteMeeting,
  setSelectedMeeting,
  setIsMeetingDrawerOpen,
  setMeetingFilters,
  setLoading,
  setError,
} = tasksMeetingsSlice.actions;

export const tasksMeetingsReducer = tasksMeetingsSlice.reducer;

export const useTasksMeetingsStore = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasksMeetings?.tasks || []);
  const selectedTask = useSelector((state: RootState) => state.tasksMeetings?.selectedTask || null);
  const isTaskDrawerOpen = useSelector((state: RootState) => state.tasksMeetings?.isTaskDrawerOpen || false);
  const taskFilters = useSelector((state: RootState) => state.tasksMeetings?.taskFilters || initialState.taskFilters);
  const meetings = useSelector((state: RootState) => state.tasksMeetings?.meetings || []);
  const selectedMeeting = useSelector((state: RootState) => state.tasksMeetings?.selectedMeeting || null);
  const isMeetingDrawerOpen = useSelector((state: RootState) => state.tasksMeetings?.isMeetingDrawerOpen || false);
  const meetingFilters = useSelector((state: RootState) => state.tasksMeetings?.meetingFilters || initialState.meetingFilters);
  const isLoading = useSelector((state: RootState) => state.tasksMeetings?.isLoading || false);
  const error = useSelector((state: RootState) => state.tasksMeetings?.error || null);

  return {
    tasks,
    selectedTask,
    isTaskDrawerOpen,
    taskFilters,
    meetings,
    selectedMeeting,
    isMeetingDrawerOpen,
    meetingFilters,
    isLoading,
    error,
    setTasks: (tasks: Task[]) => dispatch(setTasks(tasks)),
    getTasks: async () => {
      try {
        dispatch(setLoading(true));
        const tasks = await tasksService.getTasks();
        dispatch(setTasks(tasks));
        return tasks;
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch tasks'));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    addTask: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        dispatch(setLoading(true));
        const newTask = await tasksService.createTask(task);
        dispatch(addTask(newTask));
        return newTask;
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to create task'));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    updateTask: async (taskId: string, updates: Partial<Task>) => {
      try {
        dispatch(setLoading(true));
        const updatedTask = await tasksService.updateTask(taskId, updates);
        dispatch(updateTask({ taskId, updates: updatedTask }));
        return updatedTask;
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to update task'));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    deleteTask: async (taskId: string) => {
      try {
        dispatch(setLoading(true));
        await tasksService.deleteTask(taskId);
        dispatch(deleteTask(taskId));
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to delete task'));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    moveTask: async (taskId: string, newBoardId: string) => {
      try {
        dispatch(setLoading(true));
        await tasksService.moveTask(taskId, newBoardId as TaskStatus);
        dispatch(moveTask({ taskId, newBoardId }));
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to move task'));
      }
    },
    setSelectedTask: (task: Task | null) => dispatch(setSelectedTask(task)),
    setIsTaskDrawerOpen: (isOpen: boolean) => dispatch(setIsTaskDrawerOpen(isOpen)),
    setTaskFilters: (filters: Partial<TaskFilters>) => dispatch(setTaskFilters(filters)),
    setMeetings: (meetings: Meeting[]) => dispatch(setMeetings(meetings)),
    getMeetings: async () => {
      try {
        dispatch(setLoading(true));
        const meetings = await meetingsService.getMeetings();
        dispatch(setMeetings(meetings));
        return meetings;
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch meetings'));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    addMeeting: async (meeting: Omit<Meeting, 'id'>) => {
      try {
        dispatch(setLoading(true));
        const newMeeting = await meetingsService.createMeeting(meeting);
        dispatch(addMeeting(newMeeting));
        return newMeeting;
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to create meeting'));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    updateMeeting: async (meetingId: string, updates: Partial<Meeting>) => {
      try {
        dispatch(setLoading(true));
        const updatedMeeting = await meetingsService.updateMeeting(meetingId, updates);
        dispatch(updateMeeting({ meetingId, updates: updatedMeeting }));
        return updatedMeeting;
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to update meeting'));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    deleteMeeting: async (meetingId: string) => {
      try {
        dispatch(setLoading(true));
        await meetingsService.deleteMeeting(meetingId);
        dispatch(deleteMeeting(meetingId));
      } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : 'Failed to delete meeting'));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    setSelectedMeeting: (meeting: Meeting | null) => dispatch(setSelectedMeeting(meeting)),
    setIsMeetingDrawerOpen: (isOpen: boolean) => dispatch(setIsMeetingDrawerOpen(isOpen)),
    setMeetingFilters: (filters: Partial<MeetingFilters>) => dispatch(setMeetingFilters(filters)),
  };
}; 