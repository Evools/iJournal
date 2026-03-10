import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    const isDashboard = nextUrl.pathname.startsWith("/dashboard");
    const isAuthPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/register";
    const isRoot = nextUrl.pathname === "/";

    // 1. Обработка корня (/)
    if (isRoot) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return Response.redirect(new URL("/login", nextUrl));
    }

    // 2. Если залогинен и пытается зайти на логин/регистрацию
    if (isAuthPage) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return;
    }

    // 3. Защита дашборда
    if (isDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
    }

    return;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};