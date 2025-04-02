export function ContactManagement() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl font-bold text-blue-600">25</div>
      <div className="text-sm text-gray-500">Active Contacts</div>

      <div className="mt-4 flex gap-4">
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-blue-600">320</div>
          <div className="text-xs text-gray-500">Total Contacts</div>
        </div>
      </div>
    </div>
  );
}
