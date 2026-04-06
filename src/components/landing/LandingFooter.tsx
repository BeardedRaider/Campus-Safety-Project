// -------------------------------------------------------------
// Component: LandingFooter
// Purpose: Simple footer displayed at the bottom of the landing page.
//
// Updated:
// - Removed black background (now sits on global gradient)
// - Removed dark border that clashed with theme
// - Uses softer text colour for subtle footer styling
// - Matches spacing + typography of global design system
// -------------------------------------------------------------

export default function LandingFooter() {
  return (
    <footer className="text-center pt-10 pb-6">
      <p className="text-gray-400 text-sm">
        Powered by <span className="text-cyan-400">The Coding Bear - Campus Safety Buddy</span>
      </p>
    </footer>
  );
}
