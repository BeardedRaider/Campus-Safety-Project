import { Link } from "react-router-dom";

export default function LandingCTA() {
  return (
    // Call-to-action section encouraging users to get started
    <section className="px-6 py-12 text-center bg-[#0A0A0A]">
      {/* CTA heading */}
      <h2 className="text-2xl font-semibold text-white mb-4">
        Ready to Join Your Campus Community?
      </h2>

      {/* Supporting text */}
      <p className="text-gray-400 max-w-md mx-auto mb-8">
        Connect with trusted contacts, stay aware of your surroundings, and feel
        safer every day on campus.
      </p>

      {/* Get Started button linking to registration */}
      <Link
        to="/register"
        className="inline-block bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg
                   shadow-[0_0_12px_rgba(34,211,238,0.8)]
                   hover:bg-cyan-400 hover:shadow-[0_0_16px_rgba(34,211,238,1)]
                   transition-all"
      >
        Get Started
      </Link>
    </section>
  );
}
