import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/session";
import { hasNextAuthSessionCookie } from "./lib/auth/nextAuth";

const protectedRoutes = [
  "/dashboard",
  "/create-plan",
  "/explore",
  "/plans",
  "/profile",
];

const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession(req.cookies);
  const customUserId = session?.payload.sub;

  const hasNextAuthSession = hasNextAuthSessionCookie(req);

  const isAuthenticated = !!customUserId || hasNextAuthSession;

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && isAuthenticated && path !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
