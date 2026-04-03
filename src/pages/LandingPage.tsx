import LandingHeader from "../components/landing/LandingHeader";
import LandingHero from "../components/landing/LandingHero";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <LandingHeader />
      <LandingHero />

      {/* Temporary placeholder until I build the next components */}
      <div className="p-4">
        <p className="text-gray-400">Landing page content coming soon...</p>
      </div>
    </div>
  );
}
