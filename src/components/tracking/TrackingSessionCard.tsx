// -------------------------------------------------------------
// Component: TrackingSessionCard
// Purpose: Display a single tracking session summary in a card.
//
// Used in:
// - TrackingHistory page
//
// Shows:
// - Start time
// - End time (or "Active")
// - Duration
// - Number of breadcrumb points
//
// Entire card is clickable and navigates to the session detail page.
// -------------------------------------------------------------

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { TrackingSession } from "../../hooks/useTrackingHistory";

interface TrackingSessionCardProps {
  session: TrackingSession;
  pointCount: number;
}

export default function TrackingSessionCard({
  session,
  pointCount,
}: TrackingSessionCardProps) {
  // -----------------------------------------------------------
  // Format timestamps
  // -----------------------------------------------------------
  const start = new Date(session.startedAt).toLocaleString();
  const end = session.endedAt
    ? new Date(session.endedAt).toLocaleString()
    : "Active";

  // -----------------------------------------------------------
  // Duration calculation
  // -----------------------------------------------------------
  const durationMs = (session.endedAt ?? Date.now()) - session.startedAt;
  const durationMin = Math.round(durationMs / 60000);

  return (
    <Link
      to={`/app/tracking-history/${session.id}`}
      className="block bg-[#0a0f1c] border border-cyan-500 rounded-lg p-4 mb-4 shadow-md hover:bg-[#0d1324] transition-all"
    >
      {/* Top row: Start + End */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-semibold">Tracking Session</h3>
        <ChevronRight className="text-cyan-400" size={20} />
      </div>

      {/* Session details */}
      <div className="text-gray-300 text-sm space-y-1">
        <p>
          <span className="text-cyan-300 font-medium">Started:</span> {start}
        </p>
        <p>
          <span className="text-cyan-300 font-medium">Ended:</span> {end}
        </p>
        <p>
          <span className="text-cyan-300 font-medium">Duration:</span>{" "}
          {durationMin} min
        </p>
        <p>
          <span className="text-cyan-300 font-medium">Points:</span>{" "}
          {pointCount}
        </p>
      </div>
    </Link>
  );
}
