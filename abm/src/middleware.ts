import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { LAUNCH_DATE } from "./constants/envs";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/(.*)",
  process.env.PUBLIC_VIEW_URL_1!,
  process.env.PUBLIC_VIEW_URL_2!,
  "/test/:user",
  "/test/:user/:path(all|combo|confirmation)/:combo(1|2|3|4)?",
]);

const launchDate = new Date(LAUNCH_DATE!);

export default clerkMiddleware(async (auth, request) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (!isPublicRoute(request)) await auth.protect();

  const now = new Date();

  const isAfterLaunch = now >= launchDate;
  const isWaitlistPage = request.nextUrl.pathname.startsWith("/waitlist");

  if (!isAfterLaunch && !isWaitlistPage) {
    const waitlistUrl = request.nextUrl.clone();
    waitlistUrl.pathname = "/waitlist";
    return NextResponse.redirect(waitlistUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/dashboard/",
  ],
};
