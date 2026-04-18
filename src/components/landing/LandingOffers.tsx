// -------------------------------------------------------------
// Component: LandingOffers
// Purpose: Displays a horizontally swipeable carousel of offer
//          cards with arrows and pagination indicators.
// -------------------------------------------------------------

import { useRef, useState, useEffect } from "react";
import {
  GraduationCap,
  Shield,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import OfferCard from "./OfferCard";

// Data for each slide in the carousel
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
  // Reference to the scrollable container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tracks which slide is currently centered
  const [activeIndex, setActiveIndex] = useState(0);

  // -------------------------------------------------------------
  // Effect: Update activeIndex when the user scrolls manually.
  // -------------------------------------------------------------
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handler = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  // -------------------------------------------------------------
  // Scrolls to a specific slide programmatically.
  // Used by arrow buttons and pagination dots.
  // -------------------------------------------------------------
  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({
      left: index * el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-12 pb-16 px-4">
      {/* Section heading */}
      <h2 className="section-title neon-cyan-title text-center mb-3">
        What's Happening on Campus
      </h2>

      {/* Section description */}
      <p className="text-gray-300 text-center max-w-md mx-auto mb-10 leading-relaxed">
        Everything you need to make the most of student life.
      </p>

      {/* ---------------------------------------------------------
         Carousel container (arrows + scrollable track)
         --------------------------------------------------------- */}
      <div className="relative w-full mx-auto">
        {/* Left arrow */}
        <button
          onClick={() => scrollTo(Math.max(activeIndex - 1, 0))}
          disabled={activeIndex === 0}
          className="
            absolute top-1/2 -translate-y-1/2 z-20
            p-3 left-0 rounded-full
            bg-purple-400/10
            border border-purple-400/30
            shadow-[inset_0_0_8px_rgba(0,0,0,0.2),0_0_18px_rgba(168,85,247,0.65)]
            backdrop-blur-sm
            text-purple-300
            disabled:opacity-40 disabled:cursor-default
          "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* ---------------------------------------------------------
           Scrollable track
           - Uses snap-x + snap-center for native swipe feel.
           - Each slide centers itself in the viewport.
           --------------------------------------------------------- */}
        <div
          ref={scrollRef}
          className="
            flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide
          "
          style={{ scrollSnapType: "x mandatory" }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="
                w-full shrink-0 snap-center
                flex justify-center
              "
            >
              {/* 
                Vertical padding ensures the glow isn't clipped
                by the section above or below.
              */}
              <div className="w-[94%] max-w-md px-2 py-4">
                <OfferCard {...card} />
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scrollTo(Math.min(activeIndex + 1, cards.length - 1))}
          disabled={activeIndex === cards.length - 1}
          className="
            absolute right-0 top-1/2 -translate-y-1/2 z-20
            p-3 rounded-full
            bg-purple-400/10
            border border-purple-400/30
            shadow-[inset_0_0_8px_rgba(0,0,0,0.2),0_0_18px_rgba(168,85,247,0.65)]
            backdrop-blur-sm
            text-purple-300
            disabled:opacity-40 disabled:cursor-default
          "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ---------------------------------------------------------
         Pagination dots
         --------------------------------------------------------- */}
      <div className="flex justify-center mt-4 gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
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
