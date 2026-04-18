// -------------------------------------------------------------
// Context: TrackingProvider
// Purpose: Global, reliable tracking system that persists across
//          navigation and works consistently in iOS PWAs.
//
// Key Improvements:
// - "Permission priming" using getCurrentPosition() BEFORE
//   starting watchPosition() to fix iOS PWA cold‑start issues.
// -------------------------------------------------------------

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import type { TrackingSession } from "../hooks/useTrackingHistory";

// -------------------------------------------------------------
// Context Shape
// -------------------------------------------------------------
interface TrackingContextValue {
  isTracking: boolean;
  position: GeolocationPosition | null;
  lastUpdated: number | null;
  startTracking: () => void;
  stopTracking: () => void;
  activeSessionId: string | null;
  activeSession: TrackingSession | null;
}

const TrackingContext = createContext<TrackingContextValue | null>(null);

// -------------------------------------------------------------
// Provider
// -------------------------------------------------------------
export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const { startSession, endSession, addPoint, sessions } = useTrackingHistory();

  // Tracking state
  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Holds the active geolocation watcher ID
  const watchIdRef = useRef<number | null>(null);

  // Compute the active session object
  const activeSession = activeSessionId
    ? sessions.find((s) => s.id === activeSessionId) || null
    : null;

  // -------------------------------------------------------------
  // Start Tracking (iOS‑safe version)
  //
  // Why this works:
  // - iOS PWAs often ignore watchPosition() on first launch.
  // - Calling getCurrentPosition() first "wakes up" the permission
  //   layer and ensures watchPosition() works immediately.
  // -------------------------------------------------------------
  const startTracking = () => {
    if (isTracking) return;

    const sessionId = startSession();
    setActiveSessionId(sessionId);
    setIsTracking(true);

    // Step 1: Force iOS to initialize geolocation permissions
    navigator.geolocation.getCurrentPosition(
      () => {
        // Step 2: Now start continuous tracking
        watchIdRef.current = navigator.geolocation.watchPosition(
          (pos) => {
            setPosition(pos);
            setLastUpdated(Date.now());

            addPoint(
              sessionId,
              pos.coords.latitude,
              pos.coords.longitude,
              Date.now(),
            );
          },
          (err) => console.error("Geolocation error:", err),
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          },
        );
      },
      (err) => {
        console.error("Initial permission check failed:", err);
      },
    );
  };

  // -------------------------------------------------------------
  // Stop Tracking
  // -------------------------------------------------------------
  const stopTracking = () => {
    if (!isTracking) return;

    // Stop the geolocation watcher
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    // End the active session
    if (activeSessionId) {
      endSession(activeSessionId);
    }

    setIsTracking(false);
    setActiveSessionId(null);
  };

  // -------------------------------------------------------------
  // Cleanup on unmount
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
        activeSession,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

// -------------------------------------------------------------
// Hook: useTrackingContext
// -------------------------------------------------------------
export function useTrackingContext() {
  const ctx = useContext(TrackingContext);
  if (!ctx)
    throw new Error("useTrackingContext must be used inside TrackingProvider");
  return ctx;
}
