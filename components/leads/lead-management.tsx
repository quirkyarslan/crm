"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

export function LeadManagement() {
  const categories = [
    "Inbound",
    "Prospecting",
    "Customers",
    "Past Customers",
    "Disqualified",
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">LEAD MANAGEMENT</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Circle className="h-4 w-4 fill-blue-500 text-blue-500" />
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                </div>
                <div className="h-1 flex-1 bg-blue-200"></div>
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Network diagram */}
              <div className="h-32 w-32 rounded-full border-2 border-blue-200 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full border-2 border-blue-300 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-blue-500"></div>
                </div>
              </div>

              {/* Nodes around the circle */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <div
                  key={i}
                  className="absolute h-6 w-6 rounded-full bg-blue-300"
                  style={{
                    top: `calc(50% + ${
                      Math.sin((angle * Math.PI) / 180) * 60
                    }px - 12px)`,
                    left: `calc(50% + ${
                      Math.cos((angle * Math.PI) / 180) * 60
                    }px - 12px)`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
