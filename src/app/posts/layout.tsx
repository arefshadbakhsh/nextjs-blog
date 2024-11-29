import React from "react";

import { Inter } from "next/font/google";
import "@/app/globals.css";
import AuthProvider from "@/component/auth/auth-provider";
import { MegaNavbar } from "@/component/navbar";
import { getCurrentUser } from "@/app/actions/user";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <html lang="en">
    <body className={inter.className}>
    <AuthProvider>
      <MegaNavbar username={user.username} email={user.email} />
      {children}
    </AuthProvider>
    </body>
    </html>
  );
}
