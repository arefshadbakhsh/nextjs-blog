// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getCookie } from "cookies-next"; // For client-side cookie access
// import jwt from "jsonwebtoken"; // Validate token if needed
//
// const AuthContext = createContext(null);
//
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     // Check cookies for existing session
//     const token = getCookie("auth-token"); // Replace with your cookie name
//     if (token) {
//       try {
//         const decoded = jwt.decode(token); // Validate token as needed
//         setUser(decoded);
//       } catch (error) {
//         console.error("Invalid token:", error);
//       }
//     }
//     setLoading(false);
//   }, []);
//
//   const login = (user) => {
//     setUser(user); // Update context on login
//   };
//
//   const logout = () => {
//     setUser(null);
//     // Clear cookies manually
//   };
//
//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useAuth = () => useContext(AuthContext);