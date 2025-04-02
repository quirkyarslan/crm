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
import { Task, TaskPriority, TaskStatus } from '@/lib/types/task';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Clock,
  Tag,
  Users,
  Paperclip,
  CheckSquare,
  Plus,
  X,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  boardId: string;
}

export function CreateTaskDialog({ open, onClose, boardId }: CreateTaskDialogProps) {
  const { addTask } = useTasksMeetingsStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assignees, setAssignees] = useState<{ id: string; name: string; email: string }[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string; color: string }[]>([]);
  const [checklist, setChecklist] = useState<{ id: string; title: string; completed: boolean }[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !dueDate) return;

    try {
      setIsSubmitting(true);
      console.log('Creating task with data:', {
        title: title.trim(),
        description: description.trim(),
        status: 'todo',
        priority,
        dueDate: dueDate.toISOString(),
        assignees,
        tags,
        checklist,
        boardId,
      });

      const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
        title: title.trim(),
        description: description.trim(),
        status: 'todo' as TaskStatus,
        priority,
        dueDate: dueDate.toISOString(),
        assignees,
        tags,
        checklist,
        boardId,
      };

      console.log('Calling addTask from store...');
      const result = await addTask(newTask);
      console.log('Task created successfully:', result);
      handleClose();
    } catch (error) {
      console.error('Failed to create task:', error);
      // You might want to show an error toast here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDueDate(new Date());
    setPriority('medium');
    setAssignees([]);
    setTags([]);
    setChecklist([]);
    setShowCalendar(false);
    onClose();
  };

  const addChecklistItem = () => {
    setChecklist([...checklist, { id: uuidv4(), title: '', completed: false }]);
  };

  const removeChecklistItem = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const updateChecklistItem = (id: string, title: string) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, title: title.trim() } : item))
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[600px] pr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, 'PPP') : 'Pick a date'}
                </Button>
                {showCalendar && (
                  <div className="absolute top-full mt-2 z-50 bg-white border rounded-lg shadow-lg">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={(date) => {
                        setDueDate(date);
                        setShowCalendar(false);
                      }}
                      initialFocus
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <div className="flex items-center gap-2">
                {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
                  <Button
                    key={p}
                    variant={priority === p ? null : 'outline'}
                    size="sm"
                    onClick={() => setPriority(p)}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Checklist</label>
                <Button variant="ghost" size="sm" onClick={addChecklistItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Input
                      placeholder="Enter checklist item"
                      value={item.title}
                      onChange={(e) => updateChecklistItem(item.id, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChecklistItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!title.trim() || !description.trim() || !dueDate || isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 