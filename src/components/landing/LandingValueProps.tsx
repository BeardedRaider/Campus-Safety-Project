import { Shield, MapPin, Users } from "lucide-react";

export default function LandingValueProps() {
  return (
    <section className="px-6 py-10 text-center bg-[#0A0A0A]">
      {/* Section title */}
      <h2 className="text-2xl font-semibold text-white mb-3">
        Your Campus, Your Crew, Your Peace of Mind
      </h2>

      {/* Short supporting paragraph */}
      <p className="text-gray-400 max-w-md mx-auto mb-8">
        Stay connected with trusted contacts, check in with friends, and feel
        confident knowing help is always within reach.
      </p>

      {/* Icons row representing the app's core values */}
      <div className="flex items-center justify-center gap-8">
        {/* Safety icon */}
        <Shield className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />

        {/* Location awareness icon */}
        <MapPin className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />

        {/* Community / support icon */}
        <Users className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
      </div>
    </section>
  );
}
