import Link from "next/link";
import { Eye } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white shadow-sm">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center gap-2 mr-4">
          <Eye className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">Dashboard</span>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Leads
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Leads
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Prospecting
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Tasks
          </Link>
          <Link
            href="#"
            className="text-sm font-medium transition-colors hover:text-blue-600"
          >
            Meetings
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-8 w-20 rounded-full bg-blue-700"></div>
        </div>
      </div>
    </header>
  );
}
