// -------------------------------------------------------------
// Page: Home Dashboard
// Purpose: Main landing page showing stats, location, and actions.
//
// Updates:
// - Adds a "Tracking Ready" indicator to show when geolocation
//   is available BEFORE the user starts tracking.
// - Clean Mosh-style comments.
// -------------------------------------------------------------

import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";

import Greeting from "../components/ui/Greeting";
import StatsGrid from "../components/ui/StatsGrid";
import CurrentLocationCard from "../components/ui/CurrentLocationCard";
import RecentCheckInsPreview from "../components/ui/RecentCheckInsPreview";
import SafetyTip from "../components/ui/SafetyTip";

import TrackingButtons from "../components/home/TrackingButtons";

import { useTrackingContext } from "../context/TrackingProvider";
import { useAuth } from "../context/AuthProvider";

export default function Home() {
  const {
    isTracking,
    position,
    lastUpdated,
    activeSession,
    startTracking: trackingStart,
    stopTracking: trackingStop,
  } = useTrackingContext();

  const { startTracking: authStartTracking, stopTracking: authStopTracking } =
    useAuth();

  // -------------------------------------------------------------
  // Tracking Ready Indicator
  //
  // Why this exists:
  // - iOS PWAs sometimes delay geolocation availability on first load.
  // - This indicator shows the user when geolocation is ready.
  // -------------------------------------------------------------
  const [trackingReady, setTrackingReady] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => setTrackingReady(true),
      () => setTrackingReady(false),
    );
  }, []);

  // -------------------------------------------------------------
  // Start/Stop handlers
  // -------------------------------------------------------------
  const handleStartTracking = () => {
    trackingStart();
    authStartTracking();
  };

  const handleStopTracking = () => {
    trackingStop();
    authStopTracking();
  };

  return (
    <PageContainer>
      <Greeting />
      <StatsGrid />

      {/* ---------------------------------------------------------
         Tracking Ready Indicator
         --------------------------------------------------------- */}
      <div
        className={`mt-2 mb-4 text-sm font-medium transition-colors ${
          trackingReady ? "text-green-400" : "text-yellow-400"
        }`}
      >
        {trackingReady ? "✓ Tracking Ready" : "… Preparing GPS"}
      </div>

      {/* Start/Stop Buttons */}
      <TrackingButtons
        isTracking={isTracking}
        startTracking={handleStartTracking}
        stopTracking={handleStopTracking}
      />

      {/* Live Location Card */}
      <CurrentLocationCard
        isTracking={isTracking}
        position={position}
        lastUpdated={lastUpdated}
        startedAt={activeSession?.startedAt ?? null}
      />

      <RecentCheckInsPreview />
      <SafetyTip />
    </PageContainer>
  );
}
