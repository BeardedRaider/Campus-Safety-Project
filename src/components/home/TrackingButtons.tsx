// -------------------------------------------------------------
// Component: TrackingButtons
// Purpose: Start/Stop tracking + New Check-In actions.
//
// This component:
// - Uses Option C styling (solid + subtle shadow + glow)
// - Integrates with useTracking hook
// - Matches wireframe layout (stacked full-width buttons)
// - Uses Lucide icons for clarity
// - Navigates to the Check-Ins page for new check-ins
// -------------------------------------------------------------

import { Play, Square, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrackingButtonsProps {
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
}

export default function TrackingButtons({
  isTracking,
  startTracking,
  stopTracking,
}: TrackingButtonsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 mt-6">
      {/* Start Tracking */}
      {!isTracking && (
        <button
          onClick={startTracking}
          className="
            w-full py-3 rounded-xl 
            bg-cyan-600 
            shadow-md 
            hover:bg-cyan-500 
            transition 
            flex items-center justify-center gap-2
          "
        >
          <Play size={18} />
          <span>Start Tracking</span>
        </button>
      )}

      {/* Stop Tracking */}
      {isTracking && (
        <button
          onClick={stopTracking}
          className="
            w-full py-3 rounded-xl 
            bg-red-600 
            shadow-md 
            hover:bg-red-500 
            transition 
            flex items-center justify-center gap-2
          "
        >
          <Square size={18} />
          <span>Stop Tracking</span>
        </button>
      )}

      {/* New Check-In */}
      <button
        onClick={() => navigate("/app/check-ins")}
        className="
          w-full py-3 rounded-xl 
          bg-purple-600 
          shadow-md 
          hover:bg-purple-500 
          transition 
          flex items-center justify-center gap-2
        "
      >
        <Plus size={18} />
        <span>New Check-In</span>
      </button>
    </div>
  );
}
