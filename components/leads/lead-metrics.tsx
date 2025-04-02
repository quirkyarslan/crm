import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Target,
  Filter,
  Clock,
} from "lucide-react";

export function LeadMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">444</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">252</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +18.2%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <Filter className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24.3%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 font-medium inline-flex items-center">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              -2.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg. Response Time
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2 hrs</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 font-medium inline-flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +15%
            </span>{" "}
            faster than last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
