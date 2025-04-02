import { NextResponse } from 'next/server';
import { UserService } from '../../service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const userService = new UserService();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await userService.getUserByEmail(session.user.email);
    if (!currentUser || currentUser.role !== 'superuser') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { status } = await request.json();
    if (!['active', 'inactive', 'pending', 'suspended'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const user = await userService.updateUserStatus(params.id, status);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 