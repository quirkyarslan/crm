'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTasksMeetingsStore } from '@/store/tasks-meetings.store';
import { Meeting, MeetingType } from '@/lib/types/meeting';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Clock,
  Video,
  Phone,
  MapPin,
  Users,
  Link,
  Plus,
  X,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface CreateMeetingDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateMeetingDialog({ open, onClose }: CreateMeetingDialogProps) {
  const { addMeeting } = useTasksMeetingsStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [type, setType] = useState<MeetingType>('video');
  const [location, setLocation] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [participants, setParticipants] = useState<
    { id: string; name: string; email: string; response?: 'accepted' | 'declined' | 'pending' }[]
  >([]);
  const [agenda, setAgenda] = useState<{ id: string; title: string; duration: string }[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeZones, setShowTimeZones] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !date) return;

    const duration = calculateDuration(startTime, endTime);
    const newMeeting: Omit<Meeting, 'id'> = {
      title: title.trim(),
      description: description.trim(),
      date: date.toISOString().split('T')[0],
      startTime,
      endTime,
      duration,
      type,
      status: 'upcoming',
      location: type === 'in-person' ? location : undefined,
      meetingLink: type === 'video' ? meetingLink : undefined,
      participants,
      organizer: {
        id: 'current-user',
        name: 'Current User',
        email: 'user@example.com',
      },
      agenda,
      notifications: [
        { type: 'notification', time: 15 },
        { type: 'email', time: 15 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addMeeting(newMeeting);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDate(new Date());
    setStartTime('10:00');
    setEndTime('11:00');
    setType('video');
    setLocation('');
    setMeetingLink('');
    setParticipants([]);
    setAgenda([]);
    setShowCalendar(false);
    setShowTimeZones(false);
    onClose();
  };

  const calculateDuration = (start: string, end: string) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} minutes` : ''}` : `${minutes} minutes`;
  };

  const addAgendaItem = () => {
    setAgenda([...agenda, { id: uuidv4(), title: '', duration: '15 minutes' }]);
  };

  const removeAgendaItem = (id: string) => {
    setAgenda(agenda.filter((item) => item.id !== id));
  };

  const updateAgendaItem = (id: string, updates: Partial<{ title: string; duration: string }>) => {
    setAgenda(
      agenda.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] afslkasjf md:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[600px] pr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Add title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  {date ? format(date, 'PPP') : 'Select date'}
                </Button>
              </div>
              {showCalendar && (
                <div className="relative">
                  <div className="absolute top-2 z-50 bg-white border rounded-lg shadow-lg">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => {
                        setDate(date);
                        setShowCalendar(false);
                      }}
                      initialFocus
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTimeZones(!showTimeZones)}
                  className="text-blue-600"
                >
                  Show time zones
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Add participants"
                  value=""
                  onChange={() => {}}
                  className="flex-1"
                />
              </div>
              {participants.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-300" />
                      <span className="text-sm">{participant.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() =>
                          setParticipants(participants.filter((p) => p.id !== participant.id))
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Add location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600"
                  onClick={() => {
                    // Add Zoom meeting integration
                  }}
                >
                  Add Zoom meeting
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <select className="w-full p-2 border rounded-md">
                  <option value="notification">notification</option>
                  <option value="email">email</option>
                </select>
                <Input
                  type="number"
                  className="w-[80px]"
                  value="15"
                  onChange={() => {}}
                />
                <select className="w-[150px] p-2 border rounded-md">
                  <option value="minutes">minutes before</option>
                  <option value="hours">hours before</option>
                  <option value="days">days before</option>
                </select>
                <Button variant="ghost" size="sm" className="p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Add notification
              </Button>
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim() || !date}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 