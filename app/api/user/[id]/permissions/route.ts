import { NextResponse } from 'next/server';
import { UserService } from '../../service';
import { getServerSession } from 'next-auth';
// import { authOptions } from '../../../auth/[...nextauth]/route';
import { UserPermission } from '../../types';
import { authOptions } from '@/lib/auth';

const userService = new UserService();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const currentUser = await userService.getUserByEmail(session.user.email!);
    if (!currentUser || currentUser.role !== 'superuser') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { permissions } = await request.json();
    if (!Array.isArray(permissions)) {
      return NextResponse.json({ error: 'Permissions must be an array' }, { status: 400 });
    }

    // Validate permissions
    const validPermissions: UserPermission[] = [
      'manage_dashboard',
      'manage_leads',
      'manage_prospecting',
      'manage_tasks',
      'manage_meetings',
      'manage_users'
    ];

    const invalidPermissions = permissions.filter(p => !validPermissions.includes(p));
    if (invalidPermissions.length > 0) {
      return NextResponse.json({ 
        error: 'Invalid permissions', 
        invalidPermissions 
      }, { status: 400 });
    }

    const user = await userService.updateUserPermissions(params.id, permissions);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 