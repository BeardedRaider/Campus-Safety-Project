// -------------------------------------------------------------
// Component: TrackingHistoryList
// Purpose: Render a list of tracking sessions using
//          <TrackingSessionCard />.
//
// This component:
// - Accepts an array of sessions
// - Accepts a map of point counts for each session
// - Renders a clean, consistent list
// - Handles empty state gracefully
//
// -------------------------------------------------------------

import type { TrackingSession } from "../../hooks/useTrackingHistory";
import TrackingSessionCard from "./TrackingSessionCard";

interface TrackingHistoryListProps {
  sessions: TrackingSession[];
  pointCounts: Record<string, number>;
}

export default function TrackingHistoryList({
  sessions,
  pointCounts,
}: TrackingHistoryListProps) {
  // Empty state
  if (sessions.length === 0) {
    return (
      <p className="text-gray-400 text-sm mt-4">No tracking sessions yet.</p>
    );
  }

  return (
    <div className="mt-4">
      {sessions.map((session) => (
        <TrackingSessionCard
          key={session.id}
          session={session}
          pointCount={pointCounts[session.id] ?? 0}
        />
      ))}
    </div>
  );
}
