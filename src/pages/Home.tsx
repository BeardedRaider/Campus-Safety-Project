// -------------------------------------------------------------
// Page: Home Dashboard
// Purpose: Main user dashboard showing stats, tracking controls,
//          location status, recent check-ins, and safety info.
//
// Notes:
// - Uses PageContainer for consistent vertical spacing
// - All components follow the global design system
// - Tracking state comes from useTracking hook
// - AuthProvider is notified when tracking starts/stops so
//   inactivity auto-logout is paused during tracking
// -------------------------------------------------------------

import PageContainer from "../components/PageContainer";
import Greeting from "../components/home/Greeting";
import StatsGrid from "../components/home/StatsGrid";
import TrackingButtons from "../components/home/TrackingButtons";
import CurrentLocationCard from "../components/home/CurrentLocationCard";
import RecentCheckInsPreview from "../components/home/RecentCheckInsPreview";
import SafetyTip from "../components/home/SafetyTip";

import { useTracking } from "../hooks/useTracking";
import { useAuth } from "../context/AuthProvider";

export default function Home() {
  // -------------------------------------------------------------
  // Tracking state + actions from custom hook (geolocation only)
  // -------------------------------------------------------------
  const {
    isTracking,
    position,
    lastUpdated,
    startTracking: trackingStart,
    stopTracking: trackingStop,
  } = useTracking();

  // -------------------------------------------------------------
  // AuthProvider controls session + inactivity timer
  // We notify it when tracking starts/stops
  // -------------------------------------------------------------
  const { startTracking: authStartTracking, stopTracking: authStopTracking } =
    useAuth();

  // -------------------------------------------------------------
  // Combined handlers
  // These ensure BOTH systems stay in sync:
  // - useTracking handles geolocation
  // - AuthProvider pauses/resumes inactivity timer
  // -------------------------------------------------------------
  const handleStartTracking = () => {
    trackingStart(); // start geolocation
    authStartTracking(); // pause inactivity timer
  };

  const handleStopTracking = () => {
    trackingStop(); // stop geolocation
    authStopTracking(); // resume inactivity timer
  };

  return (
    <PageContainer>
      {/* ---------------------------------------------------------
         Greeting Header
      ---------------------------------------------------------- */}
      <Greeting />

      {/* ---------------------------------------------------------
         Stats Overview (Check-ins, Tracking Time, Contacts)
      ---------------------------------------------------------- */}
      <StatsGrid />

      {/* ---------------------------------------------------------
         Tracking Controls (Start / Stop / New Check-In)
      ---------------------------------------------------------- */}
      <TrackingButtons
        isTracking={isTracking}
        startTracking={handleStartTracking}
        stopTracking={handleStopTracking}
      />

      {/* ---------------------------------------------------------
         Current Location Status (Active/Inactive + Coordinates)
      ---------------------------------------------------------- */}
      <CurrentLocationCard
        isTracking={isTracking}
        position={position}
        lastUpdated={lastUpdated}
      />

      {/* ---------------------------------------------------------
         Recent Check-Ins Preview (3 most recent)
      ---------------------------------------------------------- */}
      <RecentCheckInsPreview />

      {/* ---------------------------------------------------------
         Safety Tip (highlighted purple card)
      ---------------------------------------------------------- */}
      <SafetyTip />
    </PageContainer>
  );
}
