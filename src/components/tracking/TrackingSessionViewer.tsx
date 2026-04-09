// -------------------------------------------------------------
// Component: TrackingSessionViewer
// Purpose: Display all breadcrumb points for a single session.
//
// Shows:
// - Session header (start, end, duration, total points)
// - List of TrackingPointItem components
//
// Used in:
// - TrackingSession page
//
// Lives in: src/components/tracking/TrackingSessionViewer.tsx
// -------------------------------------------------------------

import type {
  TrackingSession,
  TrackingPoint,
} from "../../hooks/useTrackingHistory";
import TrackingPointItem from "./TrackingPointItem";

interface TrackingSessionViewerProps {
  session: TrackingSession;
  points: TrackingPoint[];
}

export default function TrackingSessionViewer({
  session,
  points,
}: TrackingSessionViewerProps) {
  const start = new Date(session.startedAt).toLocaleString();
  const end = session.endedAt
    ? new Date(session.endedAt).toLocaleString()
    : "Active";

  const durationMs = (session.endedAt ?? Date.now()) - session.startedAt;
  const durationMin = Math.round(durationMs / 60000);

  return (
    <div className="mt-4">
      {/* Session Summary Header */}
      <div className="bg-[#0a0f1c] border border-cyan-500 rounded-lg p-4 mb-6 shadow-md">
        <h2 className="text-white font-semibold text-lg mb-2">
          Session Summary
        </h2>

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
            <span className="text-cyan-300 font-medium">Total Points:</span>{" "}
            {points.length}
          </p>
        </div>
      </div>

      {/* Breadcrumb Points */}
      <h3 className="text-white font-semibold text-lg mb-3">
        Breadcrumb Points
      </h3>

      {points.length === 0 ? (
        <p className="text-gray-400 text-sm">No points recorded.</p>
      ) : (
        <div>
          {points.map((point) => (
            <TrackingPointItem key={point.id} point={point} />
          ))}
        </div>
      )}
    </div>
  );
}
