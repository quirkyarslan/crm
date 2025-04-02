import { connectDB } from '@/lib/mongodb';
import { Board, IBoard } from '@/lib/models/board.model';
import { ProspectingTask, IProspectingTask } from '@/lib/models/prospecting-task.model';
import { ProspectingSubtask, IProspectingSubtask } from '@/lib/models/prospecting-subtask.model';
import { ProspectingComment, IProspectingComment } from '@/lib/models/prospecting-comment.model';

export class ProspectingService {
  // Board APIs
  async createBoard(data: { name: string; color: string; order: number }): Promise<IBoard> {
    await connectDB();
    return Board.create(data);
  }

  async getBoards(): Promise<IBoard[]> {
    await connectDB();
    return Board.find().sort({ order: 1 });
  }

  async updateBoard(id: string, data: Partial<IBoard>): Promise<IBoard | null> {
    await connectDB();
    return Board.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBoard(id: string): Promise<void> {
    await connectDB();
    await Board.findByIdAndDelete(id);
  }

  async updateBoardOrder(boards: { id: string; order: number }[]): Promise<void> {
    await connectDB();
    await Promise.all(
      boards.map(({ id, order }) => Board.findByIdAndUpdate(id, { order }))
    );
  }

  // Task APIs
  async createTask(data: Omit<IProspectingTask, keyof Document>): Promise<IProspectingTask> {
    await connectDB();
    return ProspectingTask.create(data);
  }

  async getTasks(boardId?: string): Promise<IProspectingTask[]> {
    await connectDB();
    const query = boardId ? { boardId } : {};
    return ProspectingTask.find(query).populate('assignees');
  }

  async updateTask(id: string, data: Partial<IProspectingTask>): Promise<IProspectingTask | null> {
    await connectDB();
    return ProspectingTask.findByIdAndUpdate(id, data, { new: true }).populate('assignees');
  }

  async deleteTask(id: string): Promise<void> {
    await connectDB();
    await ProspectingTask.findByIdAndDelete(id);
  }

  async moveTask(taskId: string, boardId: string): Promise<IProspectingTask | null> {
    await connectDB();
    return ProspectingTask.findByIdAndUpdate(
      taskId,
      { boardId },
      { new: true }
    ).populate('assignees');
  }

  // Subtask APIs
  async createSubtask(data: Omit<IProspectingSubtask, keyof Document>): Promise<IProspectingSubtask> {
    await connectDB();
    return ProspectingSubtask.create(data);
  }

  async getSubtasks(taskId: string): Promise<IProspectingSubtask[]> {
    await connectDB();
    return ProspectingSubtask.find({ taskId });
  }

  async updateSubtask(id: string, data: Partial<IProspectingSubtask>): Promise<IProspectingSubtask | null> {
    await connectDB();
    return ProspectingSubtask.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteSubtask(id: string): Promise<void> {
    await connectDB();
    await ProspectingSubtask.findByIdAndDelete(id);
  }

  // Comment APIs
  async createComment(data: Omit<IProspectingComment, keyof Document>): Promise<IProspectingComment> {
    await connectDB();
    return ProspectingComment.create(data);
  }

  async getComments(taskId: string): Promise<IProspectingComment[]> {
    await connectDB();
    return ProspectingComment.find({ taskId }).populate('userId');
  }

  async updateComment(id: string, data: Partial<IProspectingComment>): Promise<IProspectingComment | null> {
    await connectDB();
    return ProspectingComment.findByIdAndUpdate(id, data, { new: true }).populate('userId');
  }

  async deleteComment(id: string): Promise<void> {
    await connectDB();
    await ProspectingComment.findByIdAndDelete(id);
  }
} 