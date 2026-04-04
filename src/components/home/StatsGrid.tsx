// -------------------------------------------------------------
// Component: StatsGrid
// Purpose: Layout wrapper for the three stat cards.
//
// This component:
// - Uses flexbox with gap for natural spacing
// - Allows auto-width cards (Option B)
// - Wraps gracefully on small screens
// -------------------------------------------------------------

import StatsCard from "./StatsCard";
import { CheckCircle, Clock, Users } from "lucide-react";

export default function StatsGrid() {
  return (
    <div className="flex gap-3 justify-between flex-wrap mt-4">
      <StatsCard
        icon={<CheckCircle size={22} />}
        value="3"
        label="Check-ins Today"
        color="text-cyan-300"
      />

      <StatsCard
        icon={<Clock size={22} />}
        value="2.5h"
        label="Tracking Time"
        color="text-purple-300"
      />

      <StatsCard
        icon={<Users size={22} />}
        value="4"
        label="Emergency Contacts"
        color="text-yellow-300"
      />
    </div>
  );
}
