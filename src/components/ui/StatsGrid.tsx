// -------------------------------------------------------------
// Component: StatsGrid
// Purpose: Display real user stats using useStats().
// -------------------------------------------------------------

import StatsCard from "../home/StatsCard";
import { CheckCircle, Clock, Users } from "lucide-react";
import { useStats } from "../../hooks/useStats";
import { formatTotalTrackingTime } from "../../utils/formatTotalTrackingTime";

export default function StatsGrid() {
  const { checkInsToday, totalTrackingMs, contactCount } = useStats();

  return (
    <div className="flex justify-between gap-3 mt-4">
      {/* Check-ins Today */}
      <StatsCard
        icon={<CheckCircle size={22} />}
        value={String(checkInsToday)}
        label="Check-ins Today"
        colorClass="stat-tile-cyan"
        iconColorClass="text-cyan-300"
      />

      {/* Total Tracking Time */}
      <StatsCard
        icon={<Clock size={22} />}
        value={formatTotalTrackingTime(totalTrackingMs)}
        label="Tracking Time"
        colorClass="stat-tile-purple"
        iconColorClass="text-purple-300"
      />

      {/* Emergency Contacts */}
      <StatsCard
        icon={<Users size={22} />}
        value={String(contactCount)}
        label="Emergency Contacts"
        colorClass="stat-tile-yellow"
        iconColorClass="text-yellow-300"
      />
    </div>
  );
}
