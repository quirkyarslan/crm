import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Meeting } from '@/lib/models/meeting.model';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();
    let meetings = await Meeting.find({ userId: session.user.email })
      .populate('participants', 'id name email')
      .sort({ date: 1 }).lean();
    
    meetings = meetings.map((meeting) => ({
      ...meeting,
      id: meeting?._id?.toString(),
      createdAt: meeting?.createdAt?.toISOString(),
      updatedAt: meeting?.updatedAt?.toISOString(),
    }));

    return NextResponse.json(meetings);
  } catch (error) {
    console.error('[MEETINGS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    let { title, description, date, time, duration, type, participants, status } = body;
    if (!time) {
      time = new Date().toISOString();
    }

    await connectDB();
    const meeting = await Meeting.create({
      title,
      description,
      date,
      time,
      duration,
      type,
      status,
      userId: session.user.email,
      participants,
    });

    await meeting.populate('participants', 'id name email');

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('[MEETINGS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 