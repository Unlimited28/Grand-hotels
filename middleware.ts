import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isChangePasswordPage = req.nextUrl.pathname === "/admin/change-password";

    // If must_change_password is true and not on change-password page, redirect there
    if (token?.must_change_password && !isChangePasswordPage) {
      return NextResponse.redirect(new URL("/admin/change-password", req.url));
    }

    // If on change-password page but must_change_password is false, redirect to dashboard
    if (!token?.must_change_password && isChangePasswordPage) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin",
    },
  }
);

export const config = {
  matcher: ["/admin/((?!login).*)", "/api/admin/:path*"],
};
