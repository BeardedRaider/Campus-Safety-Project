// -------------------------------------------------------------
// Component: StatsCard
// Purpose: Reusable stat tile with icon, value, and label.
// -------------------------------------------------------------

import type { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  colorClass: "stat-tile-cyan" | "stat-tile-purple" | "stat-tile-yellow";
  iconColorClass: string;
}

export default function StatsCard({
  icon,
  value,
  label,
  colorClass,
  iconColorClass,
}: StatsCardProps) {
  return (
    <div className={`stat-tile w-28 ${colorClass}`}>
      <div className={`mb-1 ${iconColorClass}`}>{icon}</div>

      <p className="text-lg font-semibold">{value}</p>

      <p className="text-[10px] text-gray-300 mt-1 text-center leading-tight">
        {label}
      </p>
    </div>
  );
}
