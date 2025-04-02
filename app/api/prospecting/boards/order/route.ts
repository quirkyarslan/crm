import { NextResponse } from 'next/server';
import { ProspectingService } from '@/lib/services/prospecting.service';

const prospectingService = new ProspectingService();

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    await prospectingService.updateBoardOrder(data);
    return NextResponse.json({ message: 'Board order updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update board order' }, { status: 500 });
  }
} 