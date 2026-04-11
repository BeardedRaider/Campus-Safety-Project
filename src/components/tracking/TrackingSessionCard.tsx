// -------------------------------------------------------------
// Component: TrackingSessionCard
// Purpose: Display a single tracking session summary in a card.
//
// Updated:
// - Lucide icons restored for consistency with Session Viewer
// - Delete icon stays top-right
// - "View session →" with icon on same line as Points
// - Neon theme preserved
// -------------------------------------------------------------

import { Link } from "react-router-dom";
import {
  Trash2,
  ChevronRight,
  Calendar,
  CalendarCheck,
  Clock,
  Route,
} from "lucide-react";
import type { TrackingSession } from "../../hooks/useTrackingHistory";

interface TrackingSessionCardProps {
  session: TrackingSession;
  pointCount: number;
  onDelete: () => void;
}

export default function TrackingSessionCard({
  session,
  pointCount,
  onDelete,
}: TrackingSessionCardProps) {
  const start = new Date(session.startedAt).toLocaleString();
  const end = session.endedAt
    ? new Date(session.endedAt).toLocaleString()
    : "Active";

  const durationMs = (session.endedAt ?? Date.now()) - session.startedAt;
  const durationMin = Math.max(1, Math.round(durationMs / 60000));

  return (
    <div className="relative bg-[#0a0f1c] border border-cyan-500 rounded-lg p-4 shadow-md">
      {/* Delete Icon (top-right) */}
      <button
        onClick={onDelete}
        className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition"
      >
        <Trash2 size={20} />
      </button>

      {/* Main clickable area */}
      <Link
        to={`/app/tracking-history/${session.id}`}
        className="block rounded-lg transition-all"
      >
        <h3 className="text-white font-semibold mb-3">Tracking Session</h3>

        <div className="text-gray-300 text-sm space-y-2">
          {/* Started */}
          <p className="flex items-center gap-2">
            <Calendar size={18} className="text-cyan-400" />
            <span>
              <span className="text-cyan-300 font-medium">Started:</span>{" "}
              {start}
            </span>
          </p>

          {/* Ended */}
          <p className="flex items-center gap-2">
            <CalendarCheck size={18} className="text-cyan-400" />
            <span>
              <span className="text-cyan-300 font-medium">Ended:</span> {end}
            </span>
          </p>

          {/* Duration */}
          <p className="flex items-center gap-2">
            <Clock size={18} className="text-[#c7d2e0]" />
            <span>
              <span className="text-cyan-300 font-medium">Duration:</span>{" "}
              {durationMin} min
            </span>
          </p>

          {/* Points + View Session */}
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2">
              <Route size={18} className="text-purple-400" />
              <span>
                <span className="text-cyan-300 font-medium">Points:</span>{" "}
                {pointCount}
              </span>
            </p>

            <div className="flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition">
              <span className="text-sm">View session</span>
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
