import { NextResponse } from "next/server";

import {
  AUTH_COOKIE_NAME,
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  ROUTES,
} from "./lib/endpoint";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token);

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/feed/:path*", "/login", "/register"],
};
