// -------------------------------------------------------------
// Context: TrackingProvider
// Purpose: Global tracking system that persists across navigation.
//
// Handles:
// - Starting/stopping tracking
// - Creating sessions
// - Saving breadcrumb points
// - Exposing live tracking state
// - Ensuring tracking continues even when leaving Home page
//
// -------------------------------------------------------------

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useTrackingHistory } from "../hooks/useTrackingHistory";

interface TrackingContextValue {
  isTracking: boolean;
  position: GeolocationPosition | null;
  lastUpdated: number | null;
  startTracking: () => void;
  stopTracking: () => void;
  activeSessionId: string | null;
}

const TrackingContext = createContext<TrackingContextValue | null>(null);

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  // -------------------------------------------------------------
  // Tracking history functions (session + point saving)
  // -------------------------------------------------------------
  const { startSession, endSession, addPoint } = useTrackingHistory();

  // -------------------------------------------------------------
  // Global tracking state
  // -------------------------------------------------------------
  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  // Session ID is a string everywhere
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Geolocation watch ID
  const watchIdRef = useRef<number | null>(null);

  // -------------------------------------------------------------
  // Start tracking
  // -------------------------------------------------------------
  const startTracking = () => {
    if (isTracking) return;

    // Create a new session and store its ID
    const sessionId = startSession(); // string
    setActiveSessionId(sessionId);
    setIsTracking(true);

    // Begin geolocation watch
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
        setLastUpdated(Date.now());

        // Save breadcrumb point
        if (sessionId) {
          addPoint(
            sessionId,
            pos.coords.latitude,
            pos.coords.longitude,
            Date.now(), // timestamp
          );
        }
      },
      (err) => console.error("Geolocation error:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );
  };

  // -------------------------------------------------------------
  // Stop tracking
  // -------------------------------------------------------------
  const stopTracking = () => {
    if (!isTracking) return;

    // Stop geolocation watcher
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    // Close the active session
    if (activeSessionId) {
      endSession(activeSessionId);
    }

    setIsTracking(false);
    setActiveSessionId(null);
  };

  // -------------------------------------------------------------
  // Cleanup on unmount (rare, but safe)
  // -------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        isTracking,
        position,
        lastUpdated,
        startTracking,
        stopTracking,
        activeSessionId,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

// -------------------------------------------------------------
// Hook: useTrackingContext
// Purpose: Access tracking state anywhere in the app
// -------------------------------------------------------------
export function useTrackingContext() {
  const ctx = useContext(TrackingContext);
  if (!ctx) {
    throw new Error("useTrackingContext must be used inside TrackingProvider");
  }
  return ctx;
}
