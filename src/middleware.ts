import { NextRequest, NextResponse } from "next/server";

type User = {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  photo: string;
  phone?: string;
  email: string;
  bio?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const cookies = response.cookies;
  const session = request.cookies.get("session")?.value;
  const searchParams = new URLSearchParams(request.nextUrl.searchParams);
  const searchQuery = searchParams.get("q");
  const page = request.cookies.get("page")?.value;

  let user: User | undefined;

  if (session) {
    try {
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + session);

      const userDataResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          method: "GET",
          headers: headers,
          credentials: "include",
        }
      );

      if (userDataResponse.ok) {
        const data = await userDataResponse.json();
        response.cookies.set("firstName", data.firstName);
        user = data;
      }
    } catch (_) {}
  }

  if (!user && session) {
    cookies.delete("session");
  }

  const isAuth = session && user !== undefined;

  if (isAuth) {
    cookies.set("page", pathname);
  }

  if (!isAuth && pathname !== "/login") {
    const redirectUrl = new URL(
      pathname === "/" ? `/login` : `/login?next=${pathname}`,
      request.nextUrl
    );
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuth && ["/login"].includes(pathname)) {
    const next = searchParams.get("next") || "/";
    const redirectUrl = new URL(`/redirect?to=${next}`, request.nextUrl);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith("/search") && searchQuery) {
    const urlPattern = /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i;
    const url = `https://www.google.com/search?q=${searchQuery}`;

    if (urlPattern.test(searchQuery)) {
      return NextResponse.redirect(searchQuery);
    }

    return NextResponse.redirect(url);
  }

  if (isAuth && pathname.startsWith("/redirect")) {
    const to = searchParams.get("to") || "/";
    const redirectUrl = new URL(to, request.nextUrl);

    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|terms-of-service.pdf|privacy-policy.pdf|static|favicon.ico).*)",
  ],
};
