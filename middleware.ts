import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/session";

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

  const session = await getSession();
  const userId = session?.payload.sub;

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && userId && path !== "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
