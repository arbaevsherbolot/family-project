import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

type User = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isVerified: boolean;
  email: string;
  password: string;
  resetPasswordSecret?: string | null;
  role: UserRole;
  requests: number;
  lastRequest?: Date | null;
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  photo?: string | null;
  phone?: string | null;
  refreshToken?: string | null;
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = new URLSearchParams(url.searchParams);
  const cookies = response.cookies;
  const token = await getToken({ req: request });

  let user: User | undefined;

  if (token?.user) {
    user = token?.user;
    cookies.set("email", user.email);
  }

  if (user && pathname.startsWith("/login")) {
    const redirectUrl = new URL("/", url);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    !user &&
    (pathname.startsWith("/blog") || pathname.startsWith("/profile"))
  ) {
    const redirectUrl = new URL(`/login?next=${pathname}`, url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/profile", "/blog", "/login"],
};
