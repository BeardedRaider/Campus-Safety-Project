// -------------------------------------------------------------
// Hook: useTracking
// Purpose: Provides continuous geolocation tracking for the app.
//
// This hook:
// - Starts and stops a watchPosition listener
// - Stores the latest coordinates and timestamp
// - Cleans up the watcher on unmount
// - Keeps tracking logic separate from UI (SRP - Mosh style)
// -------------------------------------------------------------

import { useState, useRef, useEffect } from "react";

export function useTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const watchIdRef = useRef<number | null>(null);

  // Start continuous tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    setIsTracking(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
        setLastUpdated(new Date().toLocaleString());
      },
      (err) => console.error("Tracking error:", err),
      { enableHighAccuracy: true },
    );
  };

  // Stop tracking
  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setIsTracking(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    isTracking,
    position,
    lastUpdated,
    startTracking,
    stopTracking,
  };
}
