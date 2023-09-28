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
  firstName: string | null;
  lastName: string | null;
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
  const page = request.cookies.get("page")?.value;

  let user: User | undefined;

  if (user) {
    cookies.set("page", pathname);
    cookies.set("email", user.email);
  }

  if (token?.tokens.access_token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.tokens.access_token}`,
            baseurl: `${process.env.NEXT_PUBLIC_API_URL}`,
          },
        }
      );

      const responseData = await response.json();

      if (responseData.statusCode === 401) {
        request.cookies.getAll().map((cookie) => cookies.delete(cookie.name));
      }

      user = responseData;
    } catch (_) {}
  }

  if (user && pathname.startsWith("/login")) {
    const redirectUrl = new URL(page ? page : "/", url);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    !user &&
    ["/profile", "/profile/photos", "/blog", "/gallery"].includes(pathname)
  ) {
    const redirectUrl = new URL(`/login?next=${pathname}`, url);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|favicon.ico).*)",
};
