import { Circle } from "lucide-react";

export function TasksList() {
  const tasks = [
    { id: 1, title: "Follow up with client" },
    { id: 2, title: "Send proposal" },
    { id: 3, title: "Schedule meeting" },
  ];

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-2 text-sm">
          <Circle className="h-4 w-4 text-blue-500" />
          <span>{task.title}</span>
        </li>
      ))}
    </ul>
  );
}
