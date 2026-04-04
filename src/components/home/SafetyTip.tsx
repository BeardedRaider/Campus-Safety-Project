// -------------------------------------------------------------
// Component: SafetyTip
// Purpose: Display a rotating or static safety tip.
// -------------------------------------------------------------

import { Shield } from "lucide-react";

export default function SafetyTip() {
  return (
    <div className="bg-[#111] rounded-xl p-4 mt-6 mb-10 shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <Shield size={18} className="text-yellow-300" />
        <h2 className="text-lg font-semibold">Safety Tip</h2>
      </div>

      <p className="text-sm text-gray-300 leading-snug">
        Always let someone you trust know when you're travelling alone or
        heading somewhere unfamiliar.
      </p>
    </div>
  );
}
