// -------------------------------------------------------------
// main.tsx
// Purpose: App entry point. Ensures AuthProvider wraps
// TrackingProvider, and TrackingProvider wraps RouterProvider.
// -------------------------------------------------------------

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import { AuthProvider, useAuth } from "./context/AuthProvider";
import { TrackingProvider } from "./context/TrackingProvider";

import SessionExpiredModal from "./components/auth/SessionExpiredModal";

import "./styles/index.css";
import "./styles/safe-area.css";

const root = document.getElementById("root") as HTMLElement;

// -------------------------------------------------------------
// Wrapper for global modals
// -------------------------------------------------------------
function AppWithModals() {
  const { sessionExpired, closeSessionExpired } = useAuth();

  return (
    <>
      <RouterProvider router={router} />
      {sessionExpired && <SessionExpiredModal onClose={closeSessionExpired} />}
    </>
  );
}

ReactDOM.createRoot(root).render(
  // -------------------------------------------------------------
  // Correct Provider Order
  //
  // 1. AuthProvider (must wrap TrackingProvider because
  //    useTrackingHistory → useAuth)
  //
  // 2. TrackingProvider (must wrap RouterProvider so tracking
  //    persists across navigation)
  //
  // 3. RouterProvider (must NOT wrap providers)
  // -------------------------------------------------------------
  <AuthProvider>
    <TrackingProvider>
      <AppWithModals />
    </TrackingProvider>
  </AuthProvider>,
);
