export default function LandingHero() {
  return (
    // Main hero section with title + tagline
    <section className="text-center px-6 py-12 bg-[#0A0A0A]">
      {/* App name */}
      <h1 className="text-3xl font-bold text-white mb-3 tracking-wide">
        Campus Safety Buddy
      </h1>

      {/* Tagline with subtle neon glow */}
      <p className="text-cyan-400 text-lg drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">
        Stay safe. Stay connected.
      </p>
    </section>
  );
}
