// -------------------------------------------------------------
// Component: LandingOffers (Matches LandingValueProps layout)
// -------------------------------------------------------------

import { useState } from "react";
import {
  GraduationCap,
  Shield,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import OfferCard from "./OfferCard";

const cards = [
  {
    icon: GraduationCap,
    title: "Student Offers",
    description:
      "Exclusive discounts and deals for campus safety services and essentials.",
    color: "purple" as const,
  },
  {
    icon: Shield,
    title: "Safety Workshops",
    description: "Free campus-led safety training sessions every month.",
    color: "cyan" as const,
  },
  {
    icon: MapPin,
    title: "Campus Events",
    description: "Find out what's happening around campus this week.",
    color: "yellow" as const,
  },
  {
    icon: Users,
    title: "Community Groups",
    description: "Join student-led groups focused on wellbeing and support.",
    color: "pink" as const,
  },
];

export default function LandingOffers() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));
  const goNext = () => setActiveIndex((i) => Math.min(i + 1, cards.length - 1));

  const active = cards[activeIndex];

  return (
    <section className="pt-12 pb-16 px-4">
      {/* Section heading */}
      <h2 className="section-title neon-cyan-title text-center mb-3">
        What's Happening on Campus
      </h2>

      <p className="text-gray-300 text-center max-w-md mx-auto mb-10 leading-relaxed">
        Everything you need to make the most of student life.
      </p>

      {/* Arrows + Card */}
      <div className="relative max-w-md mx-auto">
        {/* Left arrow */}
        <button
          onClick={goPrev}
          disabled={activeIndex === 0}
          className="
          absolute -left-5 top-1/2 -translate-y-1/2 z-10
          p-3 rounded-full
          bg-purple-400/10
          border border-purple-400/30
  shadow-[inset_0_0_6px_rgba(0,0,0,0.45),0_0_14px_rgba(168,85,247,0.55)]          backdrop-blur-sm
          text-purple-300
          disabled:opacity-40 disabled:cursor-default
        "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Card container — structure as LandingValueProps */}

        <OfferCard
          icon={active.icon}
          title={active.title}
          description={active.description}
          color={active.color}
        />

        {/* Right arrow */}
        <button
          onClick={goNext}
          disabled={activeIndex === cards.length - 1}
          className="
          absolute -right-5 top-1/2 -translate-y-1/2 z-10
          p-3 rounded-full
          bg-purple-400/10
          border border-purple-400/30
  shadow-[inset_0_0_6px_rgba(0,0,0,0.45),0_0_14px_rgba(168,85,247,0.55)]          backdrop-blur-sm
          text-purple-300
          disabled:opacity-40 disabled:cursor-default
        "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              h-2 w-2 rounded-full transition-all
              ${i === activeIndex ? "bg-cyan-300" : "bg-gray-600"}
            `}
          />
        ))}
      </div>
    </section>
  );
}
