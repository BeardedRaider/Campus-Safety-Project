// -------------------------------------------------------------
// Component: ProtectedRoute
// Purpose: Restrict access to authenticated-only pages (/app/*).
//
// How it works:
// - Checks if a user exists in localStorage
// - If NOT logged in → redirect to /login
// - If logged in → allow access to the protected page
//
// Notes:
// - Used to wrap all /app/* routes
// -------------------------------------------------------------

import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = localStorage.getItem("user");

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return children;
}
