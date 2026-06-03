import { useState } from "react";
import { PLANS } from "../constants/plans";

// Single Plan Card
const PlanCard = ({ plan }) => {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 lg:gap-10 transition-all duration-300 hover:border-white/20">
      {/* Plan Name + Description */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
          {plan.name}
        </h3>
        <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
          {plan.price}
        </span>
        <span className="text-white/50 text-xs sm:text-sm">
          {plan.period}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 mt-auto">
        <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 cursor-pointer text-xs sm:text-sm hover:scale-105 transform">
          Start Free Trial
        </button>
        <button className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 cursor-pointer text-xs sm:text-sm hover:scale-105 transform">
          Choose Plan
        </button>
      </div>
    </div>
  );
};

// Custom Toggle Button Component
const BillingToggle = ({ billing, setBilling }) => {
  return (
    <div className="relative flex items-center bg-[#0f0f0f] border border-white/10 rounded-full p-1 w-fit">
      {/* Sliding background indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#1A1A1A] rounded-full transition-all duration-300 ease-out ${
          billing === "monthly" ? "left-1" : "left-[calc(50%-2px)]"
        }`}
      />
      
      {/* Monthly button */}
      <button
        onClick={() => setBilling("monthly")}
        className={`relative z-10 px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 cursor-pointer ${
          billing === "monthly"
            ? "text-white"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        Monthly
      </button>
      
      {/* Yearly button */}
      <button
        onClick={() => setBilling("yearly")}
        className={`relative z-10 px-6 sm:px-8 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 cursor-pointer ${
          billing === "yearly"
            ? "text-white"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        Yearly
      </button>
    </div>
  );
};

// Main Section
const PricingSection = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <section id="pricing" className="bg-[#141414] px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 sm:mb-10">
        {/* Left — Title + Subtitle */}
        <div className="flex-1">
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Choose the plan that's right for you
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl">
            Join StreamVibe and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
          </p>
        </div>

        {/* Right — Monthly / Yearly Toggle - Now using the custom toggle */}
        <BillingToggle billing={billing} setBilling={setBilling} />
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {PLANS[billing].map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;