import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth, res) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    // Solo super-admin (o el rol que definas como "ADMIN") puede entrar a /admin
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    // Dentro de /panel: el super-admin entra a todo (incluida la raíz /panel).
    // Un "user" común solo puede ver /panel/informes y /panel/informe/[uid].
    if (pathname.startsWith("/panel") && role !== "ADMIN") {
      const isInformesList = pathname === "/panel/informes";
      const isInformeDetail = /^\/panel\/informe\/[^/]+$/.test(pathname);

      if (!isInformesList && !isInformeDetail) {
        return NextResponse.rewrite(new URL("/panel/informes", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/panel/:path*", "/admin/:path*"],
};
