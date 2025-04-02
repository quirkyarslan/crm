'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Search, Filter, Calendar as CalendarIcon, Clock, Users, Tag } from 'lucide-react';
import { CreateTaskDialog } from '@/components/tasks/create-task-dialog';
import { TaskDrawer } from '@/components/tasks/task-drawer';
import { useTasksMeetingsStore } from '@/store/tasks-meetings.store';
import { Task, TaskStatus } from '@/lib/types/task';
import { format } from 'date-fns';

export default function TasksPage() {
  const { tasks, setSelectedTask, taskFilters, setTaskFilters, moveTask, getTasks } = useTasksMeetingsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = taskFilters.priority === 'all' || task.priority === taskFilters.priority;
    
    const matchesAssignee = taskFilters.assignee === 'all' ||
      task.assignees.some(a => a.id === taskFilters.assignee);
    
    const matchesDate = taskFilters.date === 'all' ||
      (taskFilters.date === 'today' && task.dueDate === format(new Date(), 'yyyy-MM-dd')) ||
      (taskFilters.date === 'week' && isWithinWeek(task.dueDate)) ||
      (taskFilters.date === 'month' && isWithinMonth(task.dueDate));
    
    const matchesTags = taskFilters.tags.length === 0 ||
      task.tags.some(t => taskFilters.tags.includes(t.id));

    return matchesSearch && matchesPriority && matchesAssignee && matchesDate && matchesTags;
  });

  console.log("[FILTERED TASKS]", filteredTasks);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  // Get tasks for selected date in calendar view
  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  useEffect(() => {
    getTasks();
  }, []);


  // Check if a date has tasks
  const hasDateTasks = (date: Date) => {
    return tasks.some(task => task.dueDate === format(date, 'yyyy-MM-dd'));
  };

  // Helper functions for date filtering
  const isWithinWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(now.getDate() + 7);
    return date >= now && date <= weekFromNow;
  };

  const isWithinMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const monthFromNow = new Date();
    monthFromNow.setMonth(now.getMonth() + 1);
    return date >= now && date <= monthFromNow;
  };

  // Handle drag and drop between columns
  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();
    console.log('Drop event:', e);
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, newStatus);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              className="w-full p-2 border rounded-md"
              value={taskFilters.priority}
              onChange={(e) => setTaskFilters({ priority: e.target.value as any })}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <select 
              className="w-full p-2 border rounded-md"
              value={taskFilters.assignee}
              onChange={(e) => setTaskFilters({ assignee: e.target.value })}
            >
              <option value="all">All Assignees</option>
              {tasks.flatMap(t => t.assignees).filter((a, i, arr) => 
                arr.findIndex(a2 => a2.id === a.id) === i
              ).map(assignee => (
                <option key={assignee.id} value={assignee.id}>{assignee.name}</option>
              ))}
            </select>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <select 
              className="w-full p-2 border rounded-md"
              value={taskFilters.date}
              onChange={(e) => setTaskFilters({ date: e.target.value as any })}
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="board" className="space-y-4">
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="board">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="p-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'todo')}
            >
              <h3 className="font-semibold mb-4">To Do</h3>
              <ScrollArea className="h-[600px]">
                {filteredTasks
                  .filter((task) => task.boardId === 'todo' || task.boardId === "default")
                  .map((task) => (
                    <Card 
                      key={task.id} 
                      className="p-4 mb-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleTaskClick(task)}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline"
                            color={task.priority === 'high' ? 'destructive' : undefined}
                          >
                            {task.priority}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {format(new Date(task.dueDate), 'MMM dd')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {task.assignees.map((assignee) => (
                              <div
                                key={assignee.id}
                                className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                                title={assignee.name}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {task.tags.map((tag) => (
                            <Badge 
                              key={tag.id} 
                              variant="soft"
                              color="default"
                              style={{ backgroundColor: tag.color }}
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
              </ScrollArea>
            </Card>

            <Card 
              className="p-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'in-progress')}
            >
              <h3 className="font-semibold mb-4">In Progress</h3>
              <ScrollArea className="h-[600px]">
                {filteredTasks
                  .filter((task) => task.boardId === 'in-progress')
                  .map((task) => (
                    <Card 
                      key={task.id} 
                      className="p-4 mb-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleTaskClick(task)}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline"
                            color={task.priority === 'high' ? 'destructive' : undefined}
                          >
                            {task.priority}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {format(new Date(task.dueDate), 'MMM dd')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {task.assignees.map((assignee) => (
                              <div
                                key={assignee.id}
                                className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                                title={assignee.name}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {task.tags.map((tag) => (
                            <Badge 
                              key={tag.id} 
                              variant="soft"
                              color="default"
                              style={{ backgroundColor: tag.color }}
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
              </ScrollArea>
            </Card>

            <Card 
              className="p-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'done')}
            >
              <h3 className="font-semibold mb-4">Done</h3>
              <ScrollArea className="h-[600px]">
                {filteredTasks
                  .filter((task) => task.boardId === 'done')
                  .map((task) => (
                    <Card 
                      key={task.id} 
                      className="p-4 mb-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleTaskClick(task)}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline"
                            color={task.priority === 'high' ? 'destructive' : undefined}
                          >
                            {task.priority}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {format(new Date(task.dueDate), 'MMM dd')}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {task.assignees.map((assignee) => (
                              <div
                                key={assignee.id}
                                className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                                title={assignee.name}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {task.tags.map((tag) => (
                            <Badge 
                              key={tag.id} 
                              variant="soft"
                              color="default"
                              style={{ backgroundColor: tag.color }}
                            >
                              {tag.name}
                            </Badge>
                          ))}
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
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant="outline"
                      color={task.priority === 'high' ? 'destructive' : 'default'}
                    >
                      {task.priority}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      {format(new Date(task.dueDate), 'MMM dd')}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {task.assignees.map((assignee) => (
                          <div
                            key={assignee.id}
                            className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                            title={assignee.name}
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

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  modifiers={{
                    hasTask: (date) => hasDateTasks(date),
                  }}
                  modifiersStyles={{
                    hasTask: {
                      textDecoration: 'underline',
                      textDecorationColor: 'red',
                      textDecorationThickness: '2px',
                      position: 'relative'
                    }
                  }}
                />
              </Card>
            </div>
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Tasks for {selectedDate?.toLocaleDateString()}</h3>
              <ScrollArea className="h-[400px]">
                {getTasksForDate(selectedDate || new Date()).map((task) => (
                  <Card 
                    key={task.id} 
                    className="p-4 mb-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="space-y-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-500">{task.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline"
                          color={task.priority === 'high' ? 'destructive' : undefined}
                        >
                          {task.priority}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          {format(new Date(task.dueDate), 'MMM dd')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {task.assignees.map((assignee) => (
                            <div
                              key={assignee.id}
                              className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                              title={assignee.name}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {task.tags.map((tag) => (
                          <Badge 
                            key={tag.id} 
                            variant="soft"
                            color="default"
                            style={{ backgroundColor: tag.color }}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        boardId="default"
      />

      <TaskDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
} 