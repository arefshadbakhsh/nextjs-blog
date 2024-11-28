import React from "react";
import { validateUserSession } from "@/app/actions/auth";

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
  await validateUserSession();
  return <>{children}</>;
}
