import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Meeting } from '@/lib/models/meeting.model';

export async function GET(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();
    const meeting = await Meeting.findOne({
      _id: params.meetingId,
      userId: session.user.email,
    }).populate('participants', 'id name email');

    if (!meeting) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('[MEETING_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { title, description, date, time, duration, type, participants, status } = body;

    await connectDB();
    const meeting = await Meeting.findOneAndUpdate(
      {
        _id: params.meetingId,
        userId: session.user.email,
      },
      {
        title,
        description,
        date,
        time,
        duration,
        type,
        status,
        participants,
      },
      { new: true }
    ).populate('participants', 'id name email');

    if (!meeting) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('[MEETING_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();
    const meeting = await Meeting.findOneAndDelete({
      _id: params.meetingId,
      userId: session.user.email,
    });

    if (!meeting) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[MEETING_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 