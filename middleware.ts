import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";

export async function middleware(req: NextRequest) {
    console.log("Middleware: Requesting path", req.nextUrl.pathname);
    console.log("Middleware: Cookies:", req.cookies.getAll().map(c => c.name));
    const user = await stackServerApp.getUser();
    console.log("Middleware: User found?", !!user);
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin") || path.startsWith("/dashboard")) {
        if (!user) {
            // Redirect to sign-in if not authenticated
            // Assuming Stack Auth handles sign-in at a specific route or we use the stack-theme sign-in
            return NextResponse.redirect(new URL("/handler/sign-in", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};
