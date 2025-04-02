'use client';

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useTasksMeetingsStore } from '@/store/tasks-meetings.store';
import { Task, TaskPriority } from '@/lib/types/task';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Clock,
  Tag,
  Users,
  Paperclip,
  CheckSquare,
  Trash,
  X,
  Plus,
} from 'lucide-react';

interface TaskDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function TaskDrawer({ open, onClose }: TaskDrawerProps) {
  const { selectedTask, updateTask, deleteTask, setSelectedTask } = useTasksMeetingsStore();
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedTask(selectedTask);
    setIsEditing(false);
  }, [selectedTask]);

  const handleClose = () => {
    setSelectedTask(null);
    onClose();
  };

  const handleSave = () => {
    if (editedTask && selectedTask) {
      updateTask(selectedTask.id, editedTask);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      handleClose();
    }
  };

  if (!editedTask) return null;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-[600px] sm:w-[540px] overflow-hidden flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <SheetTitle>{isEditing ? 'Edit Task' : 'Task Details'}</SheetTitle>
            <Badge variant="outline">{editedTask.status}</Badge>
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
                <Button variant="outline" size="sm" onClick={handleDelete}>
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
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                />
              ) : (
                <p>{editedTask.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              {isEditing ? (
                <Textarea
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  rows={4}
                />
              ) : (
                <p className="text-sm text-gray-600">{editedTask.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editedTask.dueDate ? format(new Date(editedTask.dueDate), 'PPP') : 'Pick a date'}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4" />
                  {format(new Date(editedTask.dueDate), 'PPP')}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  {(['low', 'medium', 'high'] as TaskPriority[]).map((priority) => (
                    <Button
                      key={priority}
                      variant={editedTask.priority === priority ? 'outline' : 'outline'}
                      size="sm"
                      onClick={() => setEditedTask({ ...editedTask, priority })}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Button>
                  ))}
                </div>
              ) : (
                <Badge variant="outline">{editedTask.priority}</Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Assignees</label>
                {isEditing && (
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {editedTask.assignees.map((assignee) => (
                  <div
                    key={assignee.id}
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                    <span className="text-sm">{assignee.name}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() =>
                          setEditedTask({
                            ...editedTask,
                            assignees: editedTask.assignees.filter((a) => a.id !== assignee.id),
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Tags</label>
                {isEditing && (
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {editedTask.tags.map((tag) => (
                  <Badge key={tag.id} variant="outline" style={{ backgroundColor: tag.color }}>
                    {tag.name}
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() =>
                          setEditedTask({
                            ...editedTask,
                            tags: editedTask.tags.filter((t) => t.id !== tag.id),
                          })
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {editedTask.checklist && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Checklist</label>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                      Add Item
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {editedTask.checklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={(checked) =>
                          setEditedTask({
                            ...editedTask,
                            checklist: editedTask.checklist?.map((i) =>
                              i.id === item.id ? { ...i, completed: checked as boolean } : i
                            ),
                          })
                        }
                        disabled={!isEditing}
                      />
                      {isEditing ? (
                        <Input
                          value={item.title}
                          onChange={(e) =>
                            setEditedTask({
                              ...editedTask,
                              checklist: editedTask.checklist?.map((i) =>
                                i.id === item.id ? { ...i, title: e.target.value } : i
                              ),
                            })
                          }
                          className="h-8"
                        />
                      ) : (
                        <span className="text-sm">{item.title}</span>
                      )}
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() =>
                            setEditedTask({
                              ...editedTask,
                              checklist: editedTask.checklist?.filter((i) => i.id !== item.id),
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

            {editedTask.attachments && (
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
                  {editedTask.attachments.map((file) => (
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
                            setEditedTask({
                              ...editedTask,
                              attachments: editedTask.attachments?.filter((a) => a.id !== file.id),
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