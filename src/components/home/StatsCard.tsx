// -------------------------------------------------------------
// Component: StatsCard
// Purpose: Reusable stat tile with icon, value, and label.
//
// This component:
// - Displays a Lucide icon above the text
// - Uses accent colours for visual hierarchy
// - Auto-sizes based on content (Option B)
// - Matches wireframe layout
// -------------------------------------------------------------

import type { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  color: string; // Tailwind colour class
}

export default function StatsCard({
  icon,
  value,
  label,
  color,
}: StatsCardProps) {
  return (
    <div
      className="
        flex flex-col items-center 
        bg-[#111] rounded-xl 
        px-4 py-3 
        shadow-md 
        min-w-22.5
      "
    >
      <div className={`mb-1 ${color}`}>{icon}</div>

      <p className="text-2xl font-semibold">{value}</p>

      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}
