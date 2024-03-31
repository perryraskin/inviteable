import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  // publicRoutes: req =>
  //   req.url === "/" || (req.url !== "/events/" && req.url.includes("/events/"))
  publicRoutes: ["/", "/events/(.*)", "/api/event/(.*)", "/api/events"],
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+.[w]+$)",
    "/invite/(.*)",
    "/api/invite/(.*)"
  ]
  // debug: true
  // afterAuth(auth, req, evt) {
  //   // Handle users who aren't authenticated
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }
  //   // Redirect logged in users to organization selection page if they are not active in an organization
  //   if (
  //     auth.userId &&
  //     !auth.orgId &&
  //     req.nextUrl.pathname !== "/org-selection"
  //   ) {
  //     const orgSelection = new URL("/org-selection", req.url);
  //     return NextResponse.redirect(orgSelection);
  //   }
  //   // If the user is logged in and trying to access a protected route, allow them to access route
  //   if (auth.userId && !auth.isPublicRoute) {
  //     return NextResponse.next();
  //   }
  //   // Allow users visiting public routes to access them
  //   return NextResponse.next();
  // },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}
