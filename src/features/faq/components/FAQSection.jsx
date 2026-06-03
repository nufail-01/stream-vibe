import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ_DATA } from "../constants/faqData";


// Single FAQ Item
const FAQItem = ({ item, isOpen, onToggle }) => {
  return (
    <div
      className="rounded-2xl p-3 sm:p-4 md:p-5 cursor-pointer transition-all duration-300"
      onClick={onToggle}
    >
      {/* Question Row */}
      <div className="flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
        {/* Number */}
        <span className="text-white/40 text-xs sm:text-sm font-medium bg-zinc-800 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg shrink-0">
          {item.id}
        </span>

        {/* Question */}
        <span className="text-white font-medium text-sm sm:text-base flex-1 wrap-break-word">
          {item.question}
        </span>

        {/* Toggle Icon */}
        <div className="shrink-0 text-white/60">
          {isOpen ? <Minus size={16} className="w-4 sm:w-5" /> : <Plus size={16} className="w-4 sm:w-5" />}
        </div>
      </div>

      {/* Answer — only when open */}
      {isOpen && (
        <div className="mt-3 sm:mt-4 pl-10 sm:pl-12 md:pl-14">
          <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}

      {/* ✅ Red line — HAMESHA dikhegi, open/close dono mein */}
      <div className="mt-3 sm:mt-4 w-full h-0.5 bg-gradient-to-r from-red-600/60 to-transparent" />
    </div>
  );
};

// Main Section
const FAQSection = () => {
  const [openId, setOpenId] = useState("01"); // pehla item default open

  const leftFAQs = FAQ_DATA.slice(0, 4);   // 01 - 04
  const rightFAQs = FAQ_DATA.slice(4, 8);  // 05 - 08

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-[#141414] px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20">

      {/* Header Row */}
      <div className="flex flex-col sm:flex-col md:flex-row md:items-start md:justify-between gap-6 sm:gap-8 md:gap-4 mb-10 sm:mb-12 md:mb-16">

        {/* Left — Title + Subtitle */}
        <div className="flex-1">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
            Got questions? We've got answers! Check out our FAQ section to find
            answers to the most common questions about StreamVibe.
          </p>
        </div>

        {/* Right — CTA Button */}
        <button className="shrink-0 bg-red-600 hover:bg-red-500 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 cursor-pointer text-sm sm:text-base whitespace-nowrap w-full sm:w-auto">
          Ask a Question
        </button>
      </div>

      {/* 2 Column FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-0 sm:px-0 md:px-0">

        {/* Left Column */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {leftFAQs.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {rightFAQs.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;


//   {/* ✅ Single border — saara content wrap */}
//   <div className="mx-6 md:mx-12 my-10 border border-white/10 rounded-2xl overflow-hidden">
//   <GenresSection />
//   <TopTenSection />
// </div>
