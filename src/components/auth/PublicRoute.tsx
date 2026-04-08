// -------------------------------------------------------------
// Component: PublicRoute
// Purpose: Prevent logged-in users from accessing public pages
//          such as /login and /register.
//
// How it works:
// - Checks if a user exists in localStorage
// - If logged in → redirect to /app
// - If NOT logged in → allow access
//
// Notes:
// - Wraps /login and /register routes
// -------------------------------------------------------------

import { Navigate } from "react-router-dom";
import React from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const user = localStorage.getItem("user");

  // Already logged in → redirect to dashboard
  if (user) {
    return <Navigate to="/app" replace />;
  }

  // Not logged in → allow access
  return children;
}
