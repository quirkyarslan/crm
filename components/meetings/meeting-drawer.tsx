'use client';

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
  Paperclip,
  Link,
  X,
  Plus,
  Trash,
} from 'lucide-react';

interface MeetingDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MeetingDrawer({ open, onClose }: MeetingDrawerProps) {
  const { selectedMeeting, updateMeeting, deleteMeeting, setSelectedMeeting } = useTasksMeetingsStore();
  const [editedMeeting, setEditedMeeting] = useState<Meeting | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedMeeting(selectedMeeting);
    setIsEditing(false);
  }, [selectedMeeting]);

  const handleClose = () => {
    setSelectedMeeting(null);
    onClose();
  };

  const handleSave = () => {
    if (editedMeeting && selectedMeeting) {
      updateMeeting(selectedMeeting.id, editedMeeting);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (selectedMeeting) {
      deleteMeeting(selectedMeeting.id);
      handleClose();
    }
  };

  if (!editedMeeting) return null;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-[600px] sm:w-[540px] overflow-hidden flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <SheetTitle>{isEditing ? 'Edit Meeting' : 'Meeting Details'}</SheetTitle>
            <Badge variant="outline">
              {editedMeeting.type === 'video' ? (
                <Video className="w-3 h-3 mr-1" />
              ) : editedMeeting.type === 'phone' ? (
                <Phone className="w-3 h-3 mr-1" />
              ) : (
                <MapPin className="w-3 h-3 mr-1" />
              )}
              {editedMeeting.type}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              {isEditing ? (
                <Input
                  value={editedMeeting.title}
                  onChange={(e) => setEditedMeeting({ ...editedMeeting, title: e.target.value })}
                />
              ) : (
                <p>{editedMeeting.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              {isEditing ? (
                <Textarea
                  value={editedMeeting.description}
                  onChange={(e) =>
                    setEditedMeeting({ ...editedMeeting, description: e.target.value })
                  }
                  rows={4}
                />
              ) : (
                <p className="text-sm text-gray-600">{editedMeeting.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time</label>
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(new Date(editedMeeting.date), 'PPP')}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={editedMeeting.startTime}
                      onChange={(e) =>
                        setEditedMeeting({ ...editedMeeting, startTime: e.target.value })
                      }
                      className="w-[120px]"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={editedMeeting.endTime}
                      onChange={(e) => setEditedMeeting({ ...editedMeeting, endTime: e.target.value })}
                      className="w-[120px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4" />
                    {format(new Date(editedMeeting.date), 'PPP')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {editedMeeting.startTime} - {editedMeeting.endTime} ({editedMeeting.duration})
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Type</label>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  {(['video', 'phone', 'in-person'] as MeetingType[]).map((type) => (
                    <Button
                      key={type}
                      variant={editedMeeting.type === type ? 'soft' : 'outline'}
                      size="sm"
                      onClick={() => setEditedMeeting({ ...editedMeeting, type })}
                    >
                      {type === 'video' ? (
                        <Video className="w-4 h-4 mr-1" />
                      ) : type === 'phone' ? (
                        <Phone className="w-4 h-4 mr-1" />
                      ) : (
                        <MapPin className="w-4 h-4 mr-1" />
                      )}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
              ) : (
                <Badge variant="outline">
                  {editedMeeting.type === 'video' ? (
                    <Video className="w-3 h-3 mr-1" />
                  ) : editedMeeting.type === 'phone' ? (
                    <Phone className="w-3 h-3 mr-1" />
                  ) : (
                    <MapPin className="w-3 h-3 mr-1" />
                  )}
                  {editedMeeting.type}
                </Badge>
              )}
            </div>

            {editedMeeting.type === 'in-person' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                {isEditing ? (
                  <Input
                    value={editedMeeting.location}
                    onChange={(e) =>
                      setEditedMeeting({ ...editedMeeting, location: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {editedMeeting.location}
                  </div>
                )}
              </div>
            )}

            {editedMeeting.type === 'video' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Meeting Link</label>
                {isEditing ? (
                  <Input
                    value={editedMeeting.meetingLink}
                    onChange={(e) =>
                      setEditedMeeting({ ...editedMeeting, meetingLink: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Link className="h-4 w-4" />
                    <a href={editedMeeting.meetingLink} className="text-blue-600 hover:underline">
                      Join Meeting
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Participants</label>
                {isEditing && (
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {editedMeeting.participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                    <span className="text-sm">{participant.name}</span>
                    {participant.response && (
                      <Badge
                        variant="outline"
                        className={
                          participant.response === 'accepted'
                            ? 'bg-green-100'
                            : participant.response === 'declined'
                            ? 'bg-red-100'
                            : 'bg-yellow-100'
                        }
                      >
                        {participant.response}
                      </Badge>
                    )}
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() =>
                          setEditedMeeting({
                            ...editedMeeting,
                            participants: editedMeeting.participants.filter(
                              (p) => p.id !== participant.id
                            ),
                          })
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {editedMeeting.agenda && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Agenda</label>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                      Add Item
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {editedMeeting.agenda.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{index + 1}.</span>
                      {isEditing ? (
                        <>
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              setEditedMeeting({
                                ...editedMeeting,
                                agenda: editedMeeting.agenda?.map((i) =>
                                  i.id === item.id ? { ...i, title: e.target.value } : i
                                ),
                              })
                            }
                            className="flex-1"
                          />
                          <Input
                            value={item.duration}
                            onChange={(e) =>
                              setEditedMeeting({
                                ...editedMeeting,
                                agenda: editedMeeting.agenda?.map((i) =>
                                  i.id === item.id ? { ...i, duration: e.target.value } : i
                                ),
                              })
                            }
                            className="w-[100px]"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() =>
                              setEditedMeeting({
                                ...editedMeeting,
                                agenda: editedMeeting.agenda?.filter((i) => i.id !== item.id),
                              })
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center justify-between flex-1">
                          <span className="text-sm">{item.title}</span>
                          <span className="text-sm text-gray-500">{item.duration}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {editedMeeting.attachments && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Attachments</label>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                      Add File
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {editedMeeting.attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 border rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() =>
                            setEditedMeeting({
                              ...editedMeeting,
                              attachments: editedMeeting.attachments?.filter((a) => a.id !== file.id),
                            })
                          }
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
} 