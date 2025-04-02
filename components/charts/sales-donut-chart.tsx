"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

export function SalesDonutChart() {
  const data = [
    { name: "Completed", value: 75, color: "#2563eb" },
    { name: "Remaining", value: 25, color: "#e2e8f0" },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="h-[150px] w-[150px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={0} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Status</span>
                          <span className="font-bold text-muted-foreground">{payload[0].name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Value</span>
                          <span className="font-bold">{payload[0].value}%</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-800">75%</div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-center text-gray-500">
        <div>Sales Target</div>
        <div>Q1 2025</div>
      </div>
    </div>
  )
}

