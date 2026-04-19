// -------------------------------------------------------------
// Context: TrackingProvider
// Purpose: Global tracking system that persists across navigation.
// -------------------------------------------------------------

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useTrackingHistory } from "../hooks/useTrackingHistory";
import type { TrackingSession } from "../hooks/useTrackingHistory";

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

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const { startSession, endSession, addPoint, sessions } = useTrackingHistory();

  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);

  // Compute active session
  const activeSession = activeSessionId
    ? sessions.find((s) => s.id === activeSessionId) || null
    : null;

  // -------------------------------------------------------------
  // Start tracking
  // -------------------------------------------------------------
  const startTracking = () => {
    if (isTracking) return;

    const sessionId = startSession();
    setActiveSessionId(sessionId);
    setIsTracking(true);

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
  };

  // -------------------------------------------------------------
  // Stop tracking
  // -------------------------------------------------------------
  const stopTracking = () => {
    if (!isTracking) return;

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    if (activeSessionId) {
      endSession(activeSessionId);
    }

    setIsTracking(false);
    setActiveSessionId(null);
  };

  // Cleanup on unmount
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

export function useTrackingContext() {
  const ctx = useContext(TrackingContext);
  if (!ctx)
    throw new Error("useTrackingContext must be used inside TrackingProvider");
  return ctx;
}
