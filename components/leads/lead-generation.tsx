"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "@/components/ui/chart";

export function LeadGeneration() {
  const data = [
    { name: "Jan", value: 25 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 30 },
    { name: "Apr", value: 45 },
    { name: "May", value: 35 },
    { name: "Jun", value: 55 },
    { name: "Jul", value: 30 },
    { name: "Aug", value: 45 },
    { name: "Sep", value: 50 },
    { name: "Oct", value: 35 },
    { name: "Nov", value: 40 },
    { name: "Dec", value: 60 },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">LEAD GENERATION</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-center">
              <div className="h-[80px] w-[80px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Completed", value: 75, color: "#2563eb" },
                        { name: "Remaining", value: 25, color: "#e2e8f0" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
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
                    <div className="text-xl font-bold">276</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-[80px] w-[80px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Completed", value: 75, color: "#2563eb" },
                        { name: "Remaining", value: 25, color: "#e2e8f0" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
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
                    <div className="text-xl font-bold">348</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
