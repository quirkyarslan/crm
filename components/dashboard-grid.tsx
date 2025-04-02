import { SalesDonutChart } from "@/components/charts/sales-donut-chart";
import { SalesLineChart } from "@/components/charts/sales-line-chart";
import { SalesTeam } from "@/components/sales-team";
import { ContactTasks } from "@/components/contact-tasks";
import { ContactManagement } from "@/components/contact-management";
import { SalesManagement } from "@/components/sales-management";
import { SalesPerformance } from "@/components/sales-performance";
import { TasksList } from "@/components/tasks-list";
import { ProspectingWidget } from "@/components/prospecting-widget";
import { SocialInvolvement } from "@/components/social-involvement";
import { MeetingsWidget } from "@/components/meetings-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* First row */}
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {["Overview", "Analytics", "Reports", "Customers", "Products"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  {item}
                </li>
              )
            )}
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesDonutChart />
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader className="pb-2">
          <CardTitle>Sales Management</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesLineChart />
        </CardContent>
      </Card>

      {/* Second row */}
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Sales Team</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesTeam />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Sales Management</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesManagement />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Contact Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactTasks />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Contact Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactManagement />
        </CardContent>
      </Card>

      {/* Third row */}
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesPerformance />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Sales Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              "Sales Process",
              "Sales Funnel",
              "Sales Management",
              "Sales Performance",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full border-2 border-blue-500"></div>
                {item}
                <div className="ml-auto text-xs text-gray-500">4 hrs</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TasksList />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[1, 2, 3].map((item) => (
              <li key={item} className="text-sm border-b pb-1">
                Task {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Fourth row */}
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Prospecting</CardTitle>
        </CardHeader>
        <CardContent>
          <ProspectingWidget />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Prospecting</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-r-transparent rotate-45"></div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Meetings</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <MeetingsWidget />
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Social Involvement</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <SocialInvolvement />
        </CardContent>
      </Card>
    </div>
  );
}
