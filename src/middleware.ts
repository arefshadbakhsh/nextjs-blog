import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value; // Extract JWT from cookies

  if (!token) {
    // Redirect to login if the token is missing
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach the user information to the request (optional)
    req.headers.set("x-user", JSON.stringify(decoded));
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Configuring paths the middleware should run on
export const config = {
  matcher: ["/protected-path/:path*"], // Apply middleware only to these paths
};