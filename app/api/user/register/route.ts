import { NextResponse } from 'next/server';
import { UserService } from '../service';
import { CreateUserDto } from '../types';
import { Document } from 'mongoose';
import { IUser } from '@/models/User';

const userService = new UserService();

export async function POST(request: Request) {
  try {
    const data: CreateUserDto = await request.json();

    console.log("[REGISTER USER]", data);

    // Validate required fields
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userService.getUserByEmail(data.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await userService.createUser({
      ...data,
      role: data.role || 'user',
    });

    console.log("[REGISTER USER]", user);

    // Remove password from response
    const { password, ...userWithoutPassword } = (user as Document & IUser).toObject();

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
