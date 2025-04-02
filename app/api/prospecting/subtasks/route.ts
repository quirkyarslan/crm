import { NextResponse } from 'next/server';
import { ProspectingService } from '@/lib/services/prospecting.service';
import { subTasks } from '../tasks/data';

const prospectingService = new ProspectingService();

export async function GET(request: Request) {
  try {
    // const { searchParams } = new URL(request.url);
    // const taskId = searchParams.get('taskId');
    // if (!taskId) {
    //   return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    // }
    // const subtasks = await prospectingService.getSubtasks(taskId);
    // return NextResponse.json(subtasks);
    return NextResponse.json(subTasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subtasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const subtask = await prospectingService.createSubtask(data);
    return NextResponse.json(subtask);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subtask' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    const subtask = await prospectingService.updateSubtask(id, updateData);
    return NextResponse.json(subtask);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subtask' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Subtask ID is required' }, { status: 400 });
    }
    await prospectingService.deleteSubtask(id);
    return NextResponse.json({ message: 'Subtask deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete subtask' }, { status: 500 });
  }
} 