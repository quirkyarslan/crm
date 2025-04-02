"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Eye,
  BarChart3,
  Users,
  Calendar,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/accesslog";
import Image from "next/image";
import { Button } from "react-day-picker";
import { signOut, useSession } from "next-auth/react";
import { UserPermission } from "@/app/api/user/types";

interface NavRoute {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  permission?: UserPermission;
  role?: string[];
}

interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  permissions?: UserPermission[];
}

interface Session {
  user?: SessionUser;
}

export function MainNav() {
  const { data: session } = useSession() as { data: Session | null };
  let pathname = usePathname();
  // remove the lang from the pathname -> /en/crm -> /crm, /es/crm -> /crm
  pathname = pathname.replace(/^\/[a-z]{2}/, "");

  const userPermissions = session?.user?.permissions || [];
  const userRole = session?.user?.role;

  const routes: NavRoute[] = [
    {
      href: "/crm",
      label: "Dashboard",
      icon: BarChart3,
      active: pathname === "/crm",
      permission: "manage_dashboard",
      role: ["superuser", "admin"],
    },
    {
      href: "/leads",
      label: "Leads",
      icon: Users,
      active: pathname === "/leads",
      permission: "manage_leads",
      role: ["superuser", "admin"],
    },
    {
      href: "/prospecting",
      label: "Prospecting",
      icon: Eye,
      active: pathname === "/prospecting",
      permission: "manage_prospecting",
      role: ["superuser", "admin", "user"],
    },
    {
      href: "/tasks",
      label: "Tasks",
      icon: Calendar,
      active: pathname === "/tasks",
      permission: "manage_tasks",
      role: ["superuser", "admin", "user"],
    },
    {
      href: "/meetings",
      label: "Meetings",
      icon: Calendar,
      active: pathname === "/meetings",
      permission: "manage_meetings",
      role: ["superuser", "admin", "user"],
    },
    {
      href: "/users",
      label: "Users",
      icon: User,
      active: pathname === "/users",
      permission: "manage_users",
      role: ["superuser", "admin"],
    },
  ];

  // Filter routes based on permissions
  const filteredRoutes = routes.filter((route) => {
    // Superuser has access to all routes
    if (userRole === "superuser") return true;
    // If route requires no permission, show it
    if (!route.permission) return true;
    if (route.role && route.role.includes(userRole!)) return true;
      // Check if user has the required permission
      console.log(route.permission, userPermissions);
    const hasPermission = userPermissions.includes(route.permission);
    return hasPermission;
  });

  const routesToShowNavBar = filteredRoutes.map((r) => r.href);
  console.log(routesToShowNavBar, pathname);
  // don't show navbar
  if (!routesToShowNavBar.includes(pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-6">
          {/* <Eye className="h-6 w-6 text-primary" /> */}
          <Image
            src={"/icon-dark.png"}
            alt="logo"
            className="h-6 w-20 text-primary bg-black"
            width={100}
            height={56}
          />
          <span className="text-xl font-bold hidden md:inline-block">
            CRM DashboarduserPermissions
          </span>
        </div>

        <nav className="flex items-center space-x-4 lg:space-x-6">
          {filteredRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              <span>{route.label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
            onClick={() => {
              signOut();
            }}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline-block">LogOut</span>
          </button>
        </div>
      </div>
    </header>
  );
}
