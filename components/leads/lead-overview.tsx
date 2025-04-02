"use client";
import { Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "@/components/ui/chart";

export function LeadOverview() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">LEAD OVERVIEW</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-blue-500" />
                <div className="text-sm flex-1">Lead Category {i}</div>
                <div className="text-xs text-gray-500">12</div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                </div>
              </div>

              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-[200px] w-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Completed", value: 75, color: "#2563eb" },
                      { name: "Remaining", value: 25, color: "#e2e8f0" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {[
                      { name: "Completed", value: 75, color: "#2563eb" },
                      { name: "Remaining", value: 25, color: "#e2e8f0" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-800">444</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-blue-500" />
                <div className="h-2 flex-1 bg-blue-200 rounded-full"></div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-blue-500 flex items-center justify-center"
                >
                  <div className="h-5 w-5 rounded-full bg-blue-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
