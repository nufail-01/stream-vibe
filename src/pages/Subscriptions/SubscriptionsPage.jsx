import React, { useState } from "react";
import Navbar from "../../features/navbar/components/Navbar";
import FreeTrialSection from "../../features/movies/components/FreeTrialSection";
import Footer from "../../features/footer/components/Footer";

// Responsive Sliding Toggle Component
const BillingToggle = ({ billingCycle, setBillingCycle }) => {
  return (
    <div className="relative bg-[#0f0f0f] border border-white/10 p-1 rounded-xl flex items-center w-full sm:w-auto min-w-[200px] sm:min-w-[280px]">
      {/* Sliding background indicator */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#1A1A1A] rounded-xl transition-all duration-300 ease-out ${
          billingCycle === "monthly" ? "left-1" : "left-[calc(50%-2px)]"
        }`}
      />
      
      {/* Monthly button */}
      <button
        onClick={() => setBillingCycle("monthly")}
        className={`relative z-10 flex-1 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer text-center ${
          billingCycle === "monthly"
            ? "text-white"
            : "text-zinc-400 hover:text-white/80"
        }`}
      >
        Monthly
      </button>
      
      {/* Yearly button */}
      <button
        onClick={() => setBillingCycle("yearly")}
        className={`relative z-10 flex-1 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer text-center ${
          billingCycle === "yearly"
            ? "text-white"
            : "text-zinc-400 hover:text-white/80"
        }`}
      >
        Yearly
      </button>
    </div>
  );
};

const SubscriptionsPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      description:
        "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
      monthlyPrice: "$9.99",
      yearlyPrice: "$79.99",
    },
    {
      id: "standard",
      name: "Standard Plan",
      description:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
      monthlyPrice: "$12.99",
      yearlyPrice: "$109.99",
      isPopular: true,
    },
    {
      id: "premium",
      name: "Premium Plan",
      description:
        "Access to a widest selection of movies and shows, including all new releases and Offline Viewing.",
      monthlyPrice: "$14.99",
      yearlyPrice: "$129.99",
    },
  ];

  const comparisonRows = [
    {
      feature: "Price",
      basic: "$9.99/Month",
      standard: "$12.99/Month",
      premium: "$14.99/Month",
    },
    {
      feature: "Content",
      basic:
        "Access to a wide selection of movies and shows, including some new releases.",
      standard:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      premium:
        "Access to a widest selection of movies and shows, including all new releases and Offline Viewing",
    },
    {
      feature: "Devices",
      basic: "Watch on one device simultaneously",
      standard: "Watch on Two device simultaneously",
      premium: "Watch on Four device simultaneously",
    },
    {
      feature: "Free Trial",
      basic: "7 Days",
      standard: "7 Days",
      premium: "7 Days",
    },
    {
      feature: "Cancel Anytime",
      basic: "Yes",
      standard: "Yes",
      premium: "Yes",
    },
    { feature: "HDR", basic: "No", standard: "Yes", premium: "Yes" },
    { feature: "Dolby Atmos", basic: "No", standard: "Yes", premium: "Yes" },
    { feature: "Ad - Free", basic: "No", standard: "Yes", premium: "Yes" },
    {
      feature: "Offline Viewing",
      basic: "No",
      standard: "Yes, for select titles.",
      premium: "Yes, for all titles.",
    },
    {
      feature: "Family Sharing",
      basic: "No",
      standard: "Yes, up to 5 family members.",
      premium: "Yes, up to 6 family members.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-start overflow-x-hidden font-sans">
      <Navbar />

      <div className="pt-24 space-y-20">
        {/* SECTION 1: HEADER & PRIMARY PLAN SELECTION CARDS */}
        <section id="plans" className="px-4 sm:px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl mt-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
                Choose the plan that's right for you
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                Join StreamVibe and select from our flexible subscription
                options tailored to suit your viewing preferences. Get ready for
                non-stop entertainment!
              </p>
            </div>

            {/* Responsive Sliding Toggle */}
            <div className="self-start lg:self-auto">
              <BillingToggle 
                billingCycle={billingCycle} 
                setBillingCycle={setBillingCycle} 
              />
            </div>
          </div>

          {/* PRICING CONTAINER */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-[#1a1a1a]/40 border border-white/10 rounded-xl p-5 sm:p-6 md:p-8 flex flex-col justify-between space-y-6 sm:space-y-8 hover:border-white/20 transition-colors ${
                  plan.isPopular ? "relative overflow-hidden" : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      POPULAR
                    </div>
                  </div>
                )}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    {plan.name}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed min-h-14 sm:min-h-16">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                      {billingCycle === "monthly"
                        ? plan.monthlyPrice
                        : plan.yearlyPrice}
                    </span>
                    <span className="text-zinc-500 text-xs sm:text-sm font-medium">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button className="flex-1 bg-[#141414] hover:bg-zinc-900 text-white font-medium text-xs sm:text-sm px-3 sm:px-4 py-3 rounded-xl border border-white/5 transition-colors cursor-pointer text-center">
                    Start Free Trial
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-500 text-white font-medium text-xs sm:text-sm px-3 sm:px-4 py-3 rounded-xl transition-all shadow-md cursor-pointer text-center">
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: COMPARISON MATRIX DATAGRID */}
        <section id="features" className="px-4 sm:px-6 md:px-12 mt-16 sm:mt-20 md:mt-32">
          {/* Header Text Block */}
          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
              Compare our plans and find the right one for you
            </h2>
            <p className="text-zinc-400 text-sm font-light max-w-4xl leading-relaxed">
              StreamVibe offers three different plans to fit your needs: Basic,
              Standard, and Premium. Compare the features of each plan and
              choose the one that's right for you.
            </p>
          </div>

          {/* Plan Headers for Mobile */}
          <div className="mt-8 md:hidden grid grid-cols-3 gap-4 border-b border-white/10 pb-4 mb-4">
            <div className="text-center">
              <h3 className="text-white font-semibold text-sm">Basic</h3>
            </div>
            <div className="text-center relative">
              <h3 className="text-white font-semibold text-sm">Standard</h3>
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold whitespace-nowrap">
                Popular
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-white font-semibold text-sm">Premium</h3>
            </div>
          </div>

          {/* DESKTOP MASTER MATRIX TABLE WITH VERTICAL LINES */}
          <div className="mt-10 sm:mt-12 md:mt-16 hidden md:block border border-white/10 rounded-xl overflow-hidden bg-[#1a1a1a]/20 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 bg-[#0f0f0f]/50">
                  <th className="p-4 sm:p-6 text-sm font-semibold text-white tracking-wide w-1/4 border-r border-white/10">
                    Features
                  </th>
                  <th className="p-4 sm:p-6 text-sm font-semibold text-white tracking-wide w-1/4 border-r border-white/10">
                    Basic
                  </th>
                  <th className="p-4 sm:p-6 text-sm font-semibold text-zinc-300 tracking-wide w-1/4 border-r border-white/10 relative">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>Standard</span>
                      <span className="bg-red-600 text-[10px] uppercase tracking-wider text-white px-2 py-0.5 rounded-md font-bold">
                        Popular
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-6 text-sm font-semibold text-white tracking-wide w-1/4">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/1 transition-colors"
                  >
                    <td className="p-4 sm:p-6 text-zinc-400 text-xs sm:text-sm font-medium border-r border-white/10">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-6 text-zinc-300 text-xs sm:text-sm font-light leading-relaxed border-r border-white/10">
                      {row.basic}
                    </td>
                    <td className="p-4 sm:p-6 text-zinc-200 text-xs sm:text-sm font-light leading-relaxed border-r border-white/10">
                      {row.standard}
                    </td>
                    <td className="p-4 sm:p-6 text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                      {row.premium}
                    </td>
                   </tr>
                ))}
              </tbody>
             </table>
          </div>

          {/* MOBILE CARD STACK - NEW DESIGN LIKE THE IMAGE */}
          <div className="mt-6 md:hidden space-y-0 divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden bg-[#1a1a1a]/20">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 bg-[#1a1a1a]/30"
              >
                <div className="grid grid-cols-4 gap-3 items-start">
                  {/* Feature Name */}
                  <div className="col-span-1">
                    <h4 className="text-zinc-400 text-xs sm:text-sm font-medium">
                      {row.feature}
                    </h4>
                  </div>
                  
                  {/* Basic Plan Value */}
                  <div className="col-span-1">
                    <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                      {row.basic}
                    </p>
                  </div>
                  
                  {/* Standard Plan Value */}
                  <div className="col-span-1">
                    <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed">
                      {row.standard}
                    </p>
                  </div>
                  
                  {/* Premium Plan Value */}
                  <div className="col-span-1">
                    <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                      {row.premium}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Alternative: Vertical list style like the image (uncomment if you prefer the exact image style) */}
          {/* 
          <div className="mt-6 md:hidden space-y-4">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="border border-white/10 rounded-xl p-4 bg-[#1a1a1a]/30">
                <div className="space-y-3">
                  <div className="pb-2 border-b border-white/10">
                    <h4 className="text-zinc-400 text-sm font-semibold">{row.feature}</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-zinc-500 text-xs block mb-1">Basic</span>
                      <p className="text-zinc-300 text-sm">{row.basic}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block mb-1">Standard</span>
                      <p className="text-zinc-200 text-sm">{row.standard}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-xs block mb-1">Premium</span>
                      <p className="text-zinc-300 text-sm">{row.premium}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          */}
        </section>
        <FreeTrialSection />
      </div>

      <Footer />
    </div>
  );
};

export default SubscriptionsPage;