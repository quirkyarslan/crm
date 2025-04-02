import { NextResponse } from 'next/server';
import { ProspectingService } from '@/lib/services/prospecting.service';
import { tasks } from './data';

const prospectingService = new ProspectingService();

export async function GET(request: Request) {
  try {
    // const { searchParams } = new URL(request.url);
    // const boardId = searchParams.get('boardId');
    // const tasks = await prospectingService.getTasks(boardId || undefined);
    // return NextResponse.json(tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const task = await prospectingService.createTask(data);
    return NextResponse.json(task);
  } catch (error) {
    console.log("[POST] create task error", error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    const task = await prospectingService.updateTask(id, updateData);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }
    await prospectingService.deleteTask(id);
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
} 