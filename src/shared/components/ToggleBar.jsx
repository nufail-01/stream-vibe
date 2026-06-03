import { useState } from "react";

const ToggleBar = ({ onToggle, defaultTab = "movies" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleToggle = (tab) => {
    setActiveTab(tab);
    if (onToggle) {
      onToggle(tab);
    }
  };

  return (
    <div className="flex justify-center items-center my-8">
      {/* Scaled container with increased padding and a comfortable default width */}
      {/* <div className="bg-[#0f0f0f] border border-white/10 p-2 rounded-2xl flex items-center gap-1.5 shrink-0 w-[380px] max-w-full"> */}
      <div className="bg-[#0f0f0f] border border-white/10 p-2 rounded-xl flex items-center gap-1.5 shrink-0 ">

        {/* Movies Button */}
        <button
          onClick={() => handleToggle("movies")}
          className={`flex-1 px-8 py-3.5 rounded-xl text-lg font-medium transition-all cursor-pointer text-center ${
            activeTab === "movies"
              ? "bg-white/10 text-white shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Movies
        </button>

        {/* Shows Button */}
        <button
          onClick={() => handleToggle("shows")}
          className={`flex-1 px-8 py-3.5 rounded-xl text-lg font-medium transition-all cursor-pointer text-center ${
            activeTab === "shows"
              ? "bg-white/10 text-white shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Shows
        </button>

      </div>
    </div>
  );
};

export default ToggleBar;

 