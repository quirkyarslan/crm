import { NextResponse } from 'next/server';
import { ProspectingService } from '@/lib/services/prospecting.service';

const prospectingService = new ProspectingService();

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { taskId, boardId } = data;
    
    if (!taskId || !boardId) {
      return NextResponse.json(
        { error: 'Task ID and Board ID are required' },
        { status: 400 }
      );
    }

    const task = await prospectingService.moveTask(taskId, boardId);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to move task' }, { status: 500 });
  }
} 