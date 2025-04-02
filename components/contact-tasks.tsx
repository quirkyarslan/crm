export function ContactTasks() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl font-bold text-blue-600">29</div>
      <div className="text-sm text-gray-500">Open Tasks</div>

      <div className="mt-4 flex gap-4">
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-blue-600">35</div>
          <div className="text-xs text-gray-500">Due Today</div>
        </div>
      </div>
    </div>
  );
}
