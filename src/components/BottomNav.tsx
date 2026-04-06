// -------------------------------------------------------------
// Component: BottomNav
// Purpose: Global bottom navigation for the app.
//
// Updated:
// - Cleaner className logic
// - Consistent neon theme
// - Tailwind v4 safe
// - Structured + readable
// -------------------------------------------------------------

import { NavLink } from "react-router-dom";
import { Home, Users, MapPin, Settings } from "lucide-react";

export default function BottomNav() {
  return (
    <nav
      className="
        fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-160
        bg-[#0D0D0D]/90 backdrop-blur-md
        border-t border-white/10
        flex justify-around py-3
        z-50
      "
    >
      {/* ---------------- HOME ---------------- */}
      <NavLink
        to="/app"
        end
        className={({ isActive }) =>
          `
            flex flex-col items-center text-xs transition
            ${
              isActive
                ? "text-cyan-300 drop-shadow-[0_0_6px_#22D3EE]"
                : "text-cyan-500/70"
            }
          `
        }
      >
        <Home size={22} />
        <span>Home</span>
      </NavLink>

      {/* ---------------- CONTACTS ---------------- */}
      <NavLink
        to="/app/contacts"
        className={({ isActive }) =>
          `
            flex flex-col items-center text-xs transition
            ${
              isActive
                ? "text-purple-300 drop-shadow-[0_0_6px_#A78BFA]"
                : "text-purple-400/70"
            }
          `
        }
      >
        <Users size={22} />
        <span>Contacts</span>
      </NavLink>

      {/* ---------------- CHECK-INS ---------------- */}
      <NavLink
        to="/app/check-ins"
        className={({ isActive }) =>
          `
            flex flex-col items-center text-xs transition
            ${
              isActive
                ? "text-yellow-300 drop-shadow-[0_0_6px_#FACC15]"
                : "text-yellow-400/70"
            }
          `
        }
      >
        <MapPin size={22} />
        <span>Check-Ins</span>
      </NavLink>

      {/* ---------------- SETTINGS ---------------- */}
      <NavLink
        to="/app/settings"
        className={({ isActive }) =>
          `
            flex flex-col items-center text-xs transition
            ${
              isActive
                ? "text-gray-300 drop-shadow-[0_0_6px_#9CA3AF]"
                : "text-gray-400/70"
            }
          `
        }
      >
        <Settings size={22} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}
