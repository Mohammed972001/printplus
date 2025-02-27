import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Debugging: Log the incoming request URL
  console.log("Middleware - Incoming Request URL:", req.url);

  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Debugging: Log the token (if it exists)
  console.log("Middleware - Token:", token);

  // Extract the pathname from the request URL
  const { pathname } = req.nextUrl;

  // Debugging: Log the current pathname
  console.log("Middleware - Pathname:", pathname);

  // Define protected routes (routes that require authentication)
  const protectedRoutes = ["/profile"]; // Add your protected routes here

  // Define public routes (routes that don't require authentication)
  const publicRoutes = ["/login", "/register", "/forgetpassword", "/resetpassword"]; // Add your public routes here

  // Debugging: Log the protected and public routes
  console.log("Middleware - Protected Routes:", protectedRoutes);
  console.log("Middleware - Public Routes:", publicRoutes);

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Debugging: Log whether the user is authenticated
  console.log("Middleware - Is Authenticated:", isAuthenticated);

  // Redirect authenticated users away from public routes
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    // Debugging: Log that the user is authenticated and trying to access a public route
    console.log(
      "Middleware - Authenticated user trying to access a public route. Redirecting to home."
    );

    // Redirect to the home page
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    // Debugging: Log that the route is public and allowing access
    console.log("Middleware - Public route. Allowing access.");

    // Allow access to public routes for unauthenticated users
    return NextResponse.next();
  }

  // Check if the route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Debugging: Log that the route is protected
    console.log("Middleware - Protected route detected.");

    if (!isAuthenticated) {
      // Debugging: Log that the user is not authenticated and redirecting to login
      console.log(
        "Middleware - User is not authenticated. Redirecting to login."
      );

      // Redirect to the login page
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Debugging: Log that the route is not explicitly protected or public
  console.log(
    "Middleware - Route is not explicitly protected or public. Allowing access."
  );

  // Allow access to other routes (e.g., public routes not explicitly listed)
  return NextResponse.next();
}

// Define the routes where the middleware should run
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|help-circle.svg|profile.svg|logo.svg|search.svg|headphones.svg|cart.svg|check-circle.svg|fonts/.*).*)",
  ],
};