import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest customer interactions and sales activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {[
            {
              name: "John Smith",
              email: "john.smith@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "JS",
              action: "Purchased Premium Plan",
              date: "2 hours ago",
              amount: "$299.00",
            },
            {
              name: "Sarah Johnson",
              email: "sarah.j@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "SJ",
              action: "Requested Demo",
              date: "5 hours ago",
              amount: null,
            },
            {
              name: "Michael Brown",
              email: "m.brown@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "MB",
              action: "Upgraded Subscription",
              date: "Yesterday",
              amount: "$199.00",
            },
            {
              name: "Emily Davis",
              email: "emily.d@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              initials: "ED",
              action: "Submitted Support Ticket",
              date: "2 days ago",
              amount: null,
            },
          ].map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar} alt={activity.name} />
                <AvatarFallback>{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.name}</p>
                <p className="text-sm text-muted-foreground">{activity.email}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-medium">{activity.action}</p>
                <div className="flex items-center justify-end gap-2">
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                  {activity.amount && <p className="text-sm font-medium text-emerald-500">{activity.amount}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

