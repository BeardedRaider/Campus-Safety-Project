// -------------------------------------------------------------
// TEMPORARY Home Page for Testing
// Purpose: Verify that useTracking + StatsGrid work correctly
// before building the full dashboard.
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
  const { isTracking, position, lastUpdated, startTracking, stopTracking } =
    useTracking();

  return (
    <PageContainer>
      <Greeting />

      <StatsGrid />

      <TrackingButtons
        isTracking={isTracking}
        startTracking={startTracking}
        stopTracking={stopTracking}
      />

      <CurrentLocationCard
        isTracking={isTracking}
        position={position}
        lastUpdated={lastUpdated}
      />

      <RecentCheckInsPreview />

      <SafetyTip />
    </PageContainer>
  );
}

