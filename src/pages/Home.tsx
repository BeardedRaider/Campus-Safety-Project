// -------------------------------------------------------------
// TEMPORARY Home Page for Testing
// Purpose: Verify that useTracking + StatsGrid work correctly
// before building the full dashboard.
// -------------------------------------------------------------

import PageContainer from "../components/PageContainer";
import StatsGrid from "../components/home/StatsGrid";
import { useTracking } from "../hooks/useTracking";

export default function Home() {
  const { isTracking, position, lastUpdated, startTracking, stopTracking } =
    useTracking();

  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">Home (Testing Mode)</h1>

      {/* Stats Cards */}
      <StatsGrid />

      {/* Tracking Controls */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={startTracking}
          className="bg-cyan-600 px-4 py-2 rounded-lg shadow"
        >
          Start Tracking
        </button>

        <button
          onClick={stopTracking}
          className="bg-red-600 px-4 py-2 rounded-lg shadow"
        >
          Stop Tracking
        </button>
      </div>

      {/* Debug Output */}
      <div className="mt-6 text-sm text-gray-300">
        <p>Tracking: {isTracking ? "Yes" : "No"}</p>
        <p>Last Updated: {lastUpdated || "N/A"}</p>

        {position && (
          <p>
            Position: {position.coords.latitude}, {position.coords.longitude}
          </p>
        )}
      </div>
    </PageContainer>
  );
}
