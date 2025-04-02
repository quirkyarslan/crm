import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getToken } from "next-auth/jwt";

let defaultLocale = "en";
let locales = ["bn", "en", "ar"];

// Get the preferred locale, similar to above or using a library
function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

// Define public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/register",
  "/api/auth",
  "/api/user/register",
];

// Define route permissions
const routePermissions: Record<string, string[]> = {
  '/dashboard': ['manage_dashboard'],
  '/leads': ['manage_leads'],
  '/prospecting': ['manage_prospecting'],
  '/tasks': ['manage_tasks'],
  '/meetings': ['manage_meetings'],
  '/users': ['manage_users'],
};

export async function middleware(request: any) {
  const pathname = request.nextUrl.pathname;

  // Check if the path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname.includes(route) || pathname.endsWith(route)
  );

  // Handle locale redirection
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For private routes, check authentication
  const token = await getToken({ req: request });
  console.log("token: ", token);
  
  if (!token) {
    // Redirect to login page with the current locale
    const locale = pathname.split('/')[1] || defaultLocale;
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  // Get user permissions from token
  const userRole = token.role as string;
  const userPermissions = token.permissions as string[];

  // Superuser has access to all routes
  if (userRole === 'superuser') {
    return NextResponse.next();
  }

  // Check route permissions
  const requiredPermissions = routePermissions[pathname] || [];

  // If no permissions required for this route, allow access
  if (requiredPermissions.length === 0) {
    return NextResponse.next();
  }

  // Check if user has required permissions
  const hasPermission = requiredPermissions.every(permission => 
    userPermissions.includes(permission)
  );

  if (!hasPermission) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|assets|docs|.*\\..*|_next).*)",
  ],
};
