// -------------------------------------------------------------
// Component: LandingHeader
// Purpose: Top navigation bar for the landing page.
// -------------------------------------------------------------

import { Link } from "react-router-dom";
import GradientShieldIcon from "../ui/icons/GradientShieldIcon";


export default function LandingHeader() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3">
      {/* Logo + App Name */}
      <div className="flex items-center gap-2">
        {/* Gradient shield icon replacing Lucide Shield */}
        <GradientShieldIcon className="w-7 h-7 drop-shadow-[0_0_4px_#3ee7ff66]" />

        <span className="font-semibold text-lg tracking-wide">
          Campus Safety Buddy
        </span>
      </div>

      {/* Login Link */}
      <Link
        to="/login"
        className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
      >
        Login
      </Link>
    </header>
  );
}
