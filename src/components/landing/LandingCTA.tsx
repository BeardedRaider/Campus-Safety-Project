// -------------------------------------------------------------
// Component: LandingCTA
// Purpose: Final call-to-action section on the landing page,
//          encouraging users to register.
//
// Updated:
// - Removed black background (now sits on global gradient)
// - Uses consistent spacing (pt/pb instead of py-12)
// - Uses global button system (btn-base + btn-cyan)
// - Typography aligned with design system
// -------------------------------------------------------------

import { Link } from "react-router-dom";

export default function LandingCTA() {
  return (
    <section className="text-center pt-10 pb-14">
      {/* CTA heading */}
      <h2 className="section-title mb-3">
        Ready to Join Your Campus Community?
      </h2>

      {/* Supporting text */}
      <p className="text-gray-300 max-w-md mx-auto mb-8 leading-relaxed">
        Connect with trusted contacts, stay aware of your surroundings, and feel
        safer every day on campus.
      </p>

      {/* Get Started button */}
      <Link to="/register" className="btn-base btn-cyan inline-flex">
        Get Started
      </Link>
    </section>
  );
}
