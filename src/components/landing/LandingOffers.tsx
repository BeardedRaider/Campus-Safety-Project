export default function LandingOffers() {
  return (
    <section className="px-6 py-10 bg-[#0A0A0A]">
      {/* Section heading */}
      <h2 className="text-2xl font-semibold text-white text-center mb-2">
        What's Happening on Campus
      </h2>

      {/* Short description under the heading */}
      <p className="text-gray-400 text-center max-w-md mx-auto mb-8">
        Everything you need to make the most of student life.
      </p>

      {/* Offers card */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-5 shadow-lg hover:shadow-cyan-500/20 transition-shadow">
        {/* Card title */}
        <h3 className="text-xl font-semibold text-white mb-2">
          Student Offers
        </h3>

        {/* Card description */}
        <p className="text-gray-400 text-sm">
          Exclusive discounts and deals for campus safety services and student
          essentials.
        </p>
      </div>
    </section>
  );
}
