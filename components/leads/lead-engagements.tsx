"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer } from "@/components/ui/chart";

export function LeadEngagements() {
  const data = [
    { name: "Jan", value: 35 },
    { name: "Feb", value: 45 },
    { name: "Mar", value: 55 },
    { name: "Apr", value: 40 },
    { name: "May", value: 50 },
    { name: "Jun", value: 60 },
    { name: "Jul", value: 45 },
    { name: "Aug", value: 55 },
    { name: "Sep", value: 65 },
    { name: "Oct", value: 50 },
    { name: "Nov", value: 60 },
    { name: "Dec", value: 70 },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          LEAD ENGAGEMENTS & INTERACTIONS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  <div className="text-xs">Engagement {i}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center"
                  >
                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
