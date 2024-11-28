import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma"; // Replace with your Prisma instance

const SECRET_KEY = process.env.SECRET_KEY!;
const AUTH_TOKEN_NAME = process.env.AUTH_TOKEN_NAME!;

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_TOKEN_NAME)?.value;

  if (!token) {
    console.log("Token not found");
    return null; // No token means no authenticated user
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string };

    // Fetch the user from the database using the ID in the token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      console.log("User not found");
      return null; // Token is valid, but user doesn't exist
    }

    // Return the user details
    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null; // Invalid or expired token
  }
}