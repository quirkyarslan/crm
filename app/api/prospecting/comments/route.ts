import { NextResponse } from 'next/server';
import { ProspectingService } from '@/lib/services/prospecting.service';
import { comments } from '../../comments/data';
const prospectingService = new ProspectingService();

export async function GET(request: Request) {
  try {
    // const { searchParams } = new URL(request.url);
    // const taskId = searchParams.get('taskId');
    // if (!taskId) {
    //   return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    // }
    // const comments = await prospectingService.getComments(taskId);
    // return NextResponse.json(comments);
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const comment = await prospectingService.createComment(data);
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    const comment = await prospectingService.updateComment(id, updateData);
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Comment ID is required' }, { status: 400 });
    }
    await prospectingService.deleteComment(id);
    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
} 