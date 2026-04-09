// -------------------------------------------------------------
// Component: TrackingPointItem
// Purpose: Display a single breadcrumb point in a session.
//
// Shows:
// - Timestamp
// - Latitude
// - Longitude
//
// Used in:
// - TrackingSessionViewer
//
// -------------------------------------------------------------

import type { TrackingPoint } from "../../hooks/useTrackingHistory";

interface TrackingPointItemProps {
  point: TrackingPoint;
}

export default function TrackingPointItem({ point }: TrackingPointItemProps) {
  const time = new Date(point.timestamp).toLocaleString();

  return (
    <div className="bg-[#0a0f1c] border border-cyan-500 rounded-lg p-3 mb-3 shadow-sm">
      <p className="text-cyan-300 text-sm font-medium">{time}</p>

      <div className="text-gray-300 text-xs mt-1 space-y-0.5">
        <p>
          <span className="text-cyan-400 font-medium">Lat:</span>{" "}
          {point.latitude.toFixed(6)}
        </p>
        <p>
          <span className="text-cyan-400 font-medium">Lng:</span>{" "}
          {point.longitude.toFixed(6)}
        </p>
      </div>
    </div>
  );
}
