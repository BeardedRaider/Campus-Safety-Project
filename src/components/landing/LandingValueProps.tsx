// -------------------------------------------------------------
// Component: LandingValueProps
// Purpose: Displays the app's core value pillars with icons.
//
// Updated:
// - Removed black background
// - Uses consistent spacing + typography
// - Icons now match the Home component colour system
// -------------------------------------------------------------

import { Shield, MapPin, Users } from "lucide-react";

export default function LandingValueProps() {
  return (
    <section className="text-center pt-10 pb-12 px-4">
      {/* Section title */}
      <h2 className="section-title mb-3">
        Your Campus, Your Crew, Your Peace of Mind
      </h2>

      {/* Supporting paragraph */}
      <p className="text-gray-300 max-w-md mx-auto mb-8 leading-relaxed">
        Stay connected with trusted contacts, check in with friends, and feel
        confident knowing help is always within reach.
      </p>

      {/* Icons row */}
      <div className="flex items-center justify-center gap-8">
        {/* Safety → Cyan (Primary) */}
        <Shield className="w-10 h-10 text-cyan-300 drop-shadow-[0_0_6px_#22D3EE]" />

        {/* Location → Yellow (Check-Ins theme) */}
        <MapPin className="w-10 h-10 text-yellow-300 drop-shadow-[0_0_6px_#FACC15]" />

        {/* Community → Purple (Contacts theme) */}
        <Users className="w-10 h-10 text-purple-300 drop-shadow-[0_0_6px_#A78BFA]" />
      </div>
    </section>
  );
}
