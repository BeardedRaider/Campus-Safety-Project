// -------------------------------------------------------------
// TrackingProvider (FINAL, STABLE, WORKING)
// -------------------------------------------------------------
// This version:
// - Replaces the old useTracking hook entirely
// - Saves breadcrumb points correctly (sessionIdRef FIXED)
// - Auto-stops using a safe tick loop
// - Retries watcher on error
// - Tracks duration reliably
// - Works with per-user settings
// - Does NOT reset on activity events
// -------------------------------------------------------------

import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useTrackingHistory } from "../hooks/useTrackingHistory";
import { useSettings } from "../hooks/useSettings";
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
  const { settings } = useSettings();
  const { startSession, endSession, addPoint, sessions } = useTrackingHistory();

  // Core state
  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // ⭐ NEW: session ID ref (fixes breadcrumb saving)
  const activeSessionIdRef = useRef<string | null>(null);

  // Refs
  const watchIdRef = useRef<number | null>(null);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ⭐ Stable session start timestamp
  const sessionStartRef = useRef<number | null>(null);

  // Active session lookup
  const activeSession = activeSessionId
    ? sessions.find((s) => s.id === activeSessionId) || null
    : null;

  // -------------------------------------------------------------
  // Helper: Restart ONLY the watcher (NOT the whole engine)
  // -------------------------------------------------------------
  const restartWatcher = () => {
    // Clear old watcher
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    // Start new watcher
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
        setLastUpdated(Date.now());

        // ⭐ ALWAYS use the ref (state is stale inside callbacks)
        const sessionId = activeSessionIdRef.current;
        if (sessionId) {
          addPoint(
            sessionId,
            pos.coords.latitude,
            pos.coords.longitude,
            Date.now(),
          );
        }
      },
      (err) => {
        console.error("Geolocation error:", err);

        // Retry after user-selected interval
        retryTimeoutRef.current = setTimeout(
          restartWatcher,
          settings.retryInterval,
        );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );
  };

  // -------------------------------------------------------------
  // Start tracking
  // -------------------------------------------------------------
  const startTracking = () => {
    if (isTracking) return;

    const sessionId = startSession();

    // ⭐ Set both state AND ref
    setActiveSessionId(sessionId);
    activeSessionIdRef.current = sessionId;

    setIsTracking(true);

    // ⭐ Record session start time
    sessionStartRef.current = Date.now();

    // Clear retry timer
    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);

    // Start GPS watcher
    restartWatcher();
  };

  // -------------------------------------------------------------
  // Stop tracking
  // -------------------------------------------------------------
  const stopTracking = () => {
    if (!isTracking) return;

    // Stop watcher
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    // Stop retry timer
    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);

    // End session
    if (activeSessionIdRef.current) {
      endSession(activeSessionIdRef.current);
    }

    setIsTracking(false);
    setActiveSessionId(null);

    // ⭐ Clear ref
    activeSessionIdRef.current = null;

    sessionStartRef.current = null;
  };

  // -------------------------------------------------------------
  // ⭐ AUTO-STOP INTERVAL (safe tick loop)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isTracking) return;
    if (settings.trackingInterval <= 0) return; // "Until stopped"

    const tick = setInterval(() => {
      if (!sessionStartRef.current) return;

      const elapsed = Date.now() - sessionStartRef.current;

      if (elapsed >= settings.trackingInterval) {
        stopTracking();
      }
    }, 1000);

    return () => clearInterval(tick);
  }, [isTracking, settings.trackingInterval]);

  // -------------------------------------------------------------
  // Cleanup on unmount
  // -------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
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
