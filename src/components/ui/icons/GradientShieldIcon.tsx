// -------------------------------------------------------------
// Component: GradientShieldIcon
// Purpose: Lucide-style shield with gradient stroke.

// -------------------------------------------------------------


// Define props for the component
interface GradientShieldIconProps {
  className?: string;
}

export default function GradientShieldIcon({
  className = "w-10 h-10",
}: GradientShieldIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#shieldGradient)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {/* Neon gradient */}
        <linearGradient id="shieldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3EE7FF" />
          <stop offset="50%" stopColor="#7B5CFF" />
          <stop offset="100%" stopColor="#FF4FA3" />
        </linearGradient>
      </defs>

      {/* Shield outline */}
      <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" />
    </svg>
  );
}
