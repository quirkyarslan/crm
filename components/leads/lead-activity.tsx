import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function LeadActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Lead Activity</CardTitle>
        <CardDescription>
          Latest lead interactions and status changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {[
            {
              name: "Robert Chen",
              email: "robert.c@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "RC",
              action: "Moved to Qualified",
              date: "2 hours ago",
              status: "Qualified",
            },
            {
              name: "Lisa Wong",
              email: "lisa.w@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "LW",
              action: "Added to Nurture Campaign",
              date: "5 hours ago",
              status: "Nurturing",
            },
            {
              name: "David Miller",
              email: "david.m@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "DM",
              action: "Scheduled Demo",
              date: "Yesterday",
              status: "Meeting",
            },
            {
              name: "Jennifer Lee",
              email: "jennifer.l@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "JL",
              action: "Submitted Contact Form",
              date: "2 days ago",
              status: "New",
            },
          ].map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar} alt={activity.name} />
                <AvatarFallback>{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.email}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-medium">{activity.action}</p>
                <div className="flex items-center justify-end gap-2">
                  <p className="text-sm text-muted-foreground">
                    {activity.date}
                  </p>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
