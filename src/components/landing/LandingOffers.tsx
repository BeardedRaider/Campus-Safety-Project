// -------------------------------------------------------------
// Component: LandingOffers
// Purpose:
// - Highlights student offers in a clean, app-like card.
// - Icon on top → title → description (matches wireframe).
// - Uses unified global `.card` styling.
// -------------------------------------------------------------

import { GraduationCap } from "lucide-react";

export default function LandingOffers() {
  return (
    <section className="pt-12 pb-16 px-4">
      {/* Section heading */}
      <h2 className="section-title neon-cyan-title text-center mb-3">
        What's Happening on Campus
      </h2>

      {/* Short description */}
      <p className="text-gray-300 text-center max-w-md mx-auto mb-10 leading-relaxed">
        Everything you need to make the most of student life.
      </p>

      {/* Offers card */}
      <div className="card max-w-md mx-auto text-center space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-2xl bg-purple-400/10 border border-purple-400/40 flex items-center justify-center shadow-[0_0_14px_rgba(167,139,250,0.6)]">
            <GraduationCap className="w-7 h-7 text-purple-300" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-lg">Student Offers</h3>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed">
          Exclusive discounts and deals for campus safety services and student
          essentials.
        </p>
      </div>
    </section>
  );
}
