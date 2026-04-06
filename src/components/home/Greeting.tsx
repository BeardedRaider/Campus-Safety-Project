// -------------------------------------------------------------
// Component: Greeting
// Purpose: Display the welcome header on the Home Dashboard.
//
// Updated:
// - Consistent spacing with design system
// - Clean typography hierarchy
// - Neon accent icon
// - Ready for dynamic user name later
// -------------------------------------------------------------

import { Hand } from "lucide-react";

export default function Greeting() {
  return (
    <div className="mt-2 mb-5">
      {/* Subtle intro line */}
      <p className="text-sm text-gray-400">Welcome back,</p>

      {/* Main greeting */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold leading-none">User</h1>
        <Hand size={22} className="text-cyan-300" />
      </div>
    </div>
  );
}
