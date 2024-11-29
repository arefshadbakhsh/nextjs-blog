// // context/AuthContext.tsx
// "use client";
//
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { User } from "@prisma/client";
// import { cookies } from "next/headers";
//
// interface AuthContextType {
//   user: Partial<Omit<User, "password">> | null;
//   token: string | null;
//   login: (token: string, userData: Omit<User, "password">) => void;
//   logout: () => void;
//   isAuthenticated: boolean;
// }
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
//
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<Partial<Omit<User, "password">> | null>(null);
//   const router = useRouter();
//
//   useEffect(() => {
//     const savedToken = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("authToken="))
//       ?.split("=")[1];
//
//     if (savedToken) {
//       setToken(savedToken);
//       fetchUserData(savedToken);
//     }
//   }, []);
//
//   const fetchUserData = async (token: string) => {
//     try {
//       const response = await fetch("/api/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//       } else {
//         logout();
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       logout();
//     }
//   };
//
//   const login = (token: string, userData: User) => {
//     setToken(token);
//     setUser(userData);
//   };
//
//   const logout = () => {
//     cookies().delete("auth");
//     setToken(null);
//     setUser(null);
//     router.push("/login");
//   };
//
//   const isAuthenticated = !!token;
//
//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };