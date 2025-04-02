"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "@/components/ui/chart";

export function SalesPerformance() {
  const data = [
    { name: "Completed", value: 75, color: "#2563eb" },
    { name: "Remaining", value: 25, color: "#e2e8f0" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="h-[120px] w-[120px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={45}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={10}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">75%</div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-center text-gray-500">
        <div>Target Completion</div>
      </div>
    </div>
  );
}
