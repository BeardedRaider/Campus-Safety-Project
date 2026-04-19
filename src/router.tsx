// -------------------------------------------------------------
// Router Configuration
// Purpose: Defines all public + authenticated routes.
//
// FIXED:
// - Router instance is now STABLE (created once only)
// - Prevents Vite HMR from recreating the router on navigation
// - Prevents full React remounts
// - Prevents TrackingProvider subtree from resetting
// -------------------------------------------------------------

import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// Public pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Authenticated pages
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import CheckIns from "./pages/CheckIns";
import Settings from "./pages/Settings";
import TrackingHistory from "./pages/TrackingHistory";
import TrackingSession from "./pages/TrackingSession";

// Route protection
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

// 404 page
import NotFoundPage from "./pages/NotFoundPage";

// -------------------------------------------------------------
// ⭐ STABLE ROUTER INSTANCE ⭐
// TypeScript-safe, Vite-safe, React Router-safe.
// -------------------------------------------------------------

const routes = [
  // -----------------------------------------------------------
  // Public Routes
  // -----------------------------------------------------------
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },

  // -----------------------------------------------------------
  // Authenticated App Routes
  // Wrapped inside <App /> layout
  // -----------------------------------------------------------
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "contacts", element: <Contacts /> },
      { path: "check-ins", element: <CheckIns /> },
      { path: "settings", element: <Settings /> },
      { path: "tracking-history", element: <TrackingHistory /> },
      { path: "tracking-history/:id", element: <TrackingSession /> },
    ],
  },

  // -----------------------------------------------------------
  // Catch-all Route (404)
  // -----------------------------------------------------------
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

// -------------------------------------------------------------
// Create router ONCE and export it
// -------------------------------------------------------------
export const router = createBrowserRouter(routes);
