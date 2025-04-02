export type MeetingType = 'video' | 'in-person' | 'phone';
export type MeetingStatus = 'upcoming' | 'completed' | 'cancelled';

export interface MeetingParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  response?: 'accepted' | 'declined' | 'pending';
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  type: MeetingType;
  status: MeetingStatus;
  location?: string;
  meetingLink?: string;
  dialInNumber?: string;
  participants: MeetingParticipant[];
  organizer: MeetingParticipant;
  agenda?: {
    id: string;
    title: string;
    duration: string;
  }[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  notifications: {
    type: 'email' | 'notification';
    time: number; // minutes before
  }[];
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
    endAfterOccurrences?: number;
  };
  createdAt: string;
  updatedAt: string;
} 