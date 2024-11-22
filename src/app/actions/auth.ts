"use server";

import { LoginRequestDto } from "@/lib/models/login.model";
import prisma from "@/lib/prisma";
import { RegisterRequestDto } from "@/lib/models/register.model";
import bcrypt from "bcryptjs";
import { emailStandard } from "@/lib/utill-functions/standard-email";
import { usernameStandard } from "@/lib/utill-functions/standard-username";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "@prisma/client";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("Missing SECRET_KEY environment variable");
}

export async function registerUser(body: RegisterRequestDto) {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const _user = await prisma.user.create({
    data: {
      email: emailStandard(body.email),
      password: hashedPassword,
      username: usernameStandard(body.username),
      firstName: "",
      lastName: "",
    },
  });

  // Generate a JWT token
  const token = jwt.sign(
      { id: _user.id, email: _user.email }, // Payload
      SECRET_KEY!, // Secret key
      { expiresIn: process.env.EXPIRE_IN }, // Token expiration
  );

  // Remove sensitive data from user before returning
  const safeUser = sanitizeUser(_user);

  // Return a success response
  return {
    status: 200,
    message: "Login successful.",
    user: safeUser,
    token,
  };
}

export async function login(body: LoginRequestDto) {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: emailStandard(body.email) },
    });

    if (!user) {
      return {
        status: 404,
        message: "User not found. Please check your email or register.",
      };
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid email or password.",
      };
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      SECRET_KEY!, // Secret key
      { expiresIn: process.env.EXPIRE_IN }, // Token expiration
    );

    // Remove sensitive data from user before returning
    const safeUser = sanitizeUser(user);

    // Return a success response
    return {
      status: 200,
      message: "Login successful.",
      user: safeUser,
      token,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      status: 500,
      message: "An error occurred while processing your request.",
    };
  }
}

const sanitizeUser = (user: User) => {
  // Destructure the password, but use an underscore to indicate it's intentionally unused
  const { password: _password, ...sanitizedUser } = user;
  return sanitizedUser;
};