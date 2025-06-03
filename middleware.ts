import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();

  // Untuk protected routes, kita akan membiarkan halaman dimuat
  // dan handle authentication di client side dengan modal
  // Ini memungkinkan modal login muncul di halaman dashboard

  // Jika user sudah login dan mengakses protected route, izinkan akses
  if (isProtectedRoute(req) && authObject.userId) {
    return;
  }

  // Untuk route lainnya, biarkan akses normal
  // Modal akan handle authentication check di client side
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
