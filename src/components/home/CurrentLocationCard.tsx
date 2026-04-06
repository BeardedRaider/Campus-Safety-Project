// -------------------------------------------------------------
// Component: CurrentLocationCard
// Purpose: Display current tracking status + coordinates.
//
// Updated:
// - Uses global .card + .section-title
// - Consistent neon theme
// - Clean spacing + typography
// - Tailwind v4 safe
// -------------------------------------------------------------

import { MapPin } from "lucide-react";

interface Props {
  isTracking: boolean;
  position: GeolocationPosition | null;
  lastUpdated: string | null;
}

export default function CurrentLocationCard({
  isTracking,
  position,
  lastUpdated,
}: Props) {
  return (
    <div className="card mt-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={18} className="text-cyan-300" />
        <h2 className="section-title m-0">Current Location</h2>
      </div>

      {/* Tracking Status */}
      <p className={`text-sm ${isTracking ? "text-green-400" : "text-red-400"}`}>
        {isTracking ? "Active" : "Inactive"}
      </p>

      {/* Coordinates + Timestamp */}
      <div className="mt-2 text-sm text-gray-300">
        <p>
          <span className="text-gray-400">Coordinates:</span>{" "}
          {position
            ? `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
            : "N/A"}
        </p>

        <p className="mt-1">
          <span className="text-gray-400">Last updated:</span>{" "}
          {lastUpdated || "N/A"}
        </p>
      </div>
    </div>
  );
}
