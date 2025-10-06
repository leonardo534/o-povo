import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import routes from "./configs/routes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (
    token &&
    (request.nextUrl.pathname === routes.AUTH.LOGIN ||
      request.nextUrl.pathname === routes.AUTH.REGISTER)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (
    !token &&
    (request.nextUrl.pathname === routes.AUTH.LOGIN ||
      request.nextUrl.pathname === routes.AUTH.REGISTER)
  ) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL(routes.AUTH.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-posts/:path*", "/login", "/register"],
};
