// -------------------------------------------------------------
// Page: Home Dashboard
// Purpose: Main user dashboard showing stats, tracking controls,
//          location status, recent check-ins, and safety info.
//
// Notes:
// - Uses PageContainer for consistent vertical spacing
// - All components follow the global design system
// - Tracking state comes from useTracking hook
// -------------------------------------------------------------

import PageContainer from "../components/PageContainer";
import Greeting from "../components/home/Greeting";
import StatsGrid from "../components/home/StatsGrid";
import TrackingButtons from "../components/home/TrackingButtons";
import CurrentLocationCard from "../components/home/CurrentLocationCard";
import RecentCheckInsPreview from "../components/home/RecentCheckInsPreview";
import SafetyTip from "../components/home/SafetyTip";
import { useTracking } from "../hooks/useTracking";

export default function Home() {
  // -------------------------------------------------------------
  // Tracking state + actions from custom hook
  // -------------------------------------------------------------
  const { isTracking, position, lastUpdated, startTracking, stopTracking } =
    useTracking();

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
        startTracking={startTracking}
        stopTracking={stopTracking}
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
