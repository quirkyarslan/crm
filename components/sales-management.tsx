export function SalesManagement() {
  const metrics = [
    { id: 1, value: 19 },
    { id: 2, value: 24 },
    { id: 3, value: 16 },
    { id: 4, value: 15 },
    { id: 5, value: 23 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium"
          >
            {metric.value}
          </div>
        ))}
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-xs">Sales Process</span>
          <span className="ml-auto text-xs">4 hrs</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-xs">Sales Funnel</span>
          <span className="ml-auto text-xs">6 hrs</span>
        </div>
      </div>
    </div>
  );
}
