import { Meeting } from '@/lib/types/meeting';

class MeetingsService {
  private baseUrl = '/api/meetings';

  async getMeetings(): Promise<Meeting[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch meetings');
    }
    return response.json();
  }

  async getMeeting(id: string): Promise<Meeting> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch meeting');
    }
    return response.json();
  }

  async createMeeting(meeting: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meeting> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meeting),
    });
    if (!response.ok) {
      throw new Error('Failed to create meeting');
    }
    return response.json();
  }

  async updateMeeting(id: string, updates: Partial<Meeting>): Promise<Meeting> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update meeting');
    }
    return response.json();
  }

  async deleteMeeting(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete meeting');
    }
  }
}

export const meetingsService = new MeetingsService(); 