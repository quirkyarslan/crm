"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "@/components/ui/chart";

export function ProspectingWidget() {
  const data = [
    { name: "Completed", value: 65, color: "#2563eb" },
    { name: "Remaining", value: 35, color: "#e2e8f0" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm mb-2">Leads Generated</div>
      <div className="h-[80px] w-[80px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={35}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold">65%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
