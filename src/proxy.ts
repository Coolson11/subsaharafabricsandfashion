import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "./lib/auth";

const SESSION_COOKIE_NAME = "admin_session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all CMS routes except the login page
  const isCmsRoute = pathname.startsWith("/cms");
  const isLoginRoute = pathname.startsWith("/cms/login");

  if (isCmsRoute && !isLoginRoute) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    
    if (!token) {
      const loginUrl = new URL("/cms/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    const isValid = await verifySessionToken(token);
    if (!isValid) {
      const loginUrl = new URL("/cms/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*"],
};
