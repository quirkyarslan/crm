import { NextResponse } from 'next/server';
import { ProspectingService } from '@/lib/services/prospecting.service';

const prospectingService = new ProspectingService();

export async function GET() {
  try {
    const boards = await prospectingService.getBoards();
    return NextResponse.json(boards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch boards' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // determine the order
    const order = await prospectingService.getBoards();
    const newOrder = order.length + 1;
    data.order = newOrder;
    const board = await prospectingService.createBoard(data);
    return NextResponse.json(board);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create board' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    const board = await prospectingService.updateBoard(id, updateData);
    return NextResponse.json(board);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update board' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Board ID is required' }, { status: 400 });
    }
    await prospectingService.deleteBoard(id);
    return NextResponse.json({ message: 'Board deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete board' }, { status: 500 });
  }
} 