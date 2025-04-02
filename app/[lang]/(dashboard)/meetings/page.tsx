'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Search, Video, Phone, MapPin, Clock, Users, Calendar as CalendarIcon } from 'lucide-react';
import { CreateMeetingDialog } from '@/components/meetings/create-meeting-dialog';
import { MeetingDrawer } from '@/components/meetings/meeting-drawer';
import { useTasksMeetingsStore } from '@/store/tasks-meetings.store';
import { Meeting } from '@/lib/types/meeting';
import { format } from 'date-fns';

export default function MeetingsPage() {
  const { 
    meetings, 
    setSelectedMeeting, 
    meetingFilters, 
    setMeetingFilters,
    getMeetings,
    isLoading,
    error 
  } = useTasksMeetingsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    getMeetings();
  }, []);

  // Filter meetings based on search query and filters
  const filteredMeetings = (meetings || []).filter((meeting: Meeting) => {
    if (!meeting) return false;
    
    const matchesSearch = meeting.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      meeting.description?.toLowerCase().includes(searchQuery?.toLowerCase());
    
    const matchesType = meetingFilters.type === 'all' || meeting.type === meetingFilters.type;
    
    // Handle time filtering based on meeting date and current date
    const meetingDate = meeting.date ? new Date(meeting.date) : null;
    const now = new Date();
    const matchesTime = meetingFilters.time === 'all' ||
      (meetingFilters.time === 'upcoming' && meetingDate && meetingDate >= now) ||
      (meetingFilters.time === 'past' && meetingDate && meetingDate < now);
    
    const matchesParticipant = meetingFilters.participant === 'all' ||
      (meeting.participants || []).some((p: { id: string }) => p?.id === meetingFilters.participant);

    return matchesSearch && matchesType && matchesTime && matchesParticipant;
  });

  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsDrawerOpen(true);
  };

  // Get meetings for selected date in calendar view
  const getMeetingsForDate = (date: Date) => {
    return meetings.filter((meeting: Meeting) => meeting.date === format(date, 'yyyy-MM-dd'));
  };

  // Check if a date has meetings
  const hasDateMeetings = (date: Date) => {
    return meetings.some((meeting: Meeting) => meeting.date === format(date, 'yyyy-MM-dd'));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-500">Loading meetings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meetings</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <select 
              className="w-full p-2 border rounded-md"
              value={meetingFilters.type}
              onChange={(e) => setMeetingFilters({ type: e.target.value as any })}
            >
              <option value="all">All Types</option>
              <option value="video">Video</option>
              <option value="in-person">In-person</option>
              <option value="phone">Phone</option>
            </select>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <select 
              className="w-full p-2 border rounded-md"
              value={meetingFilters.time}
              onChange={(e) => setMeetingFilters({ time: e.target.value as any })}
            >
              <option value="all">All Times</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <select 
              className="w-full p-2 border rounded-md"
              value={meetingFilters.participant}
              onChange={(e) => setMeetingFilters({ participant: e.target.value })}
            >
              <option value="all">All Participants</option>
              {meetings
                .flatMap((m: Meeting) => m.participants || [])
                .filter((p: { id: string }, i: number, arr: { id: string }[]) => 
                  p && p.id && arr.findIndex((p2: { id: string }) => p2?.id === p.id) === i
                )
                .map((p: { id: string, name: string }) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    hasMeeting: (date) => hasDateMeetings(date),
                  }}
                  modifiersStyles={{
                    hasMeeting: {
                      position: 'relative',
                      textDecoration: 'underline',
                      textDecorationColor: 'red',
                      textDecorationThickness: '2px',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)'
                    },
                  }}
                />
              </Card>
            </div>
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Meetings for {selectedDate?.toLocaleDateString()}</h3>
              <ScrollArea className="h-[400px]">
                {getMeetingsForDate(selectedDate || new Date()).map((meeting: Meeting) => (
                  <Card 
                    key={meeting.id} 
                    className="p-4 mb-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleMeetingClick(meeting)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <Badge variant="outline">
                          {meeting.type === 'video' ? (
                            <Video className="w-3 h-3 mr-1" />
                          ) : meeting.type === 'phone' ? (
                            <Phone className="w-3 h-3 mr-1" />
                          ) : (
                            <MapPin className="w-3 h-3 mr-1" />
                          )}
                          {meeting.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{meeting.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {meeting.startTime} - {meeting.endTime} ({meeting.duration})
                      </div>
                      {meeting.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {meeting.location}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-gray-500" />
                        <div className="flex -space-x-2">
                          {meeting.participants.map((participant: { id: string, name: string }, index: number) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                              title={participant.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card className="p-4">
            <div className="space-y-4">
              {filteredMeetings.map((meeting: Meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleMeetingClick(meeting)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{meeting.title}</h4>
                      <Badge variant="outline">
                        {meeting.type === 'video' ? (
                          <Video className="w-3 h-3 mr-1" />
                        ) : meeting.type === 'phone' ? (
                          <Phone className="w-3 h-3 mr-1" />
                        ) : (
                          <MapPin className="w-3 h-3 mr-1" />
                        )}
                        {meeting.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{meeting.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <CalendarIcon className="w-3 h-3" />
                      {meeting.date}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      {meeting.startTime} - {meeting.endTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-gray-500" />
                      <div className="flex -space-x-2">
                        {meeting.participants.map((participant: { id: string, name: string }, index: number) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                            title={participant.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card className="p-4">
            <div className="space-y-4">
              {filteredMeetings
                .filter((meeting: Meeting) => {
                  const meetingDate = new Date(meeting.date);
                  const now = new Date();
                  return meetingDate >= now;
                })
                .map((meeting: Meeting) => (
                  <Card 
                    key={meeting.id} 
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleMeetingClick(meeting)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <Badge variant="outline">
                          {meeting.type === 'video' ? (
                            <Video className="w-3 h-3 mr-1" />
                          ) : meeting.type === 'phone' ? (
                            <Phone className="w-3 h-3 mr-1" />
                          ) : (
                            <MapPin className="w-3 h-3 mr-1" />
                          )}
                          {meeting.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{meeting.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CalendarIcon className="w-3 h-3" />
                        {meeting.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {meeting.startTime} - {meeting.endTime} ({meeting.duration})
                      </div>
                      {meeting.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {meeting.location}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-gray-500" />
                        <div className="flex -space-x-2">
                          {meeting.participants.map((participant: { id: string, name: string }, index: number) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                              title={participant.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateMeetingDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      <MeetingDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
} 