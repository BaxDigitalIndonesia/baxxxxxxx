import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookies = req.cookies.getAll();
  const accessToken = req.cookies.get("accessToken")?.value;
  
  console.log("Middleware path:", req.nextUrl.pathname);
  console.log("AccessToken:", req.cookies.get("accessToken")?.value);
  console.log("All Cookies:", cookies);

  
  if (accessToken && req.nextUrl.pathname.startsWith("/auth")) {
       console.log("Redirecting to dashboard...");
    return NextResponse.redirect(new URL("/dashboard/overview", req.url));
  }

  if (!accessToken && !req.nextUrl.pathname.startsWith("/auth")) {
   
     console.log("Redirecting to login...");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
