import { Calendar } from "lucide-react";

export function MeetingsWidget() {
  return (
    <div className="flex flex-col items-center">
      <Calendar className="h-10 w-10 text-blue-500" />
      <div className="mt-2 text-xs text-center">
        <div>Upcoming Meetings</div>
        <div className="font-medium">3 Today</div>
      </div>
    </div>
  );
}
