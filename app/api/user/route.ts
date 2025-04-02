import { NextResponse } from 'next/server';
import { UserService } from './service';
import { CreateUserDto, UpdateUserDto } from './types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const userService = new UserService();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await userService.getUserByEmail(session.user.email);
    if (!currentUser || currentUser.role !== 'superuser') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const users = await userService.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await userService.getUserByEmail(session.user.email);
    if (!currentUser || currentUser.role !== 'superuser') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data: CreateUserDto = await request.json();
    const user = await userService.createUser(data);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 