// -------------------------------------------------------------
// Component: Greeting
// Purpose: Display the welcome header on the Home Dashboard.
// -------------------------------------------------------------

import { Hand } from "lucide-react";

export default function Greeting() {
  return (
    <div className="mt-2 mb-4">
      <p className="text-sm text-gray-400">Welcome back,</p>

      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">User</h1>
        <Hand size={22} className="text-cyan-300" />
      </div>
    </div>
  );
}
