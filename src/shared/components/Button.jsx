// import { Play } from "lucide-react";

// const Button = ({ children, variant = "primary", onClick, className = "" }) => {
//   const base =
//     "inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all duration-300 cursor-pointer select-none";

//   const variants = {
//     // primary:
//     //   "bg-red-600 hover:bg-red-500 text-white px-8 py-4 text-base shadow-lg shadow-red-900/40 hover:shadow-red-600/50 hover:scale-105 active:scale-95",
//     primary: "bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-base    ",
//     ghost:
//       "text-white/70 hover:text-white px-4 py-2 text-sm hover:bg-white/10 rounded-md",
//     nav: "text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-colors",
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={`${base} ${variants[variant]} ${className}`}
//     >
//       {variant === "primary" && <Play size={18} className="fill-current" />}
//       {children || (variant === "primary" && "Start Watching Now")}
//     </button>
//   );
// };

// export default Button;



import { Play } from "lucide-react";

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-bold rounded-lg transition-all duration-300 cursor-pointer select-none";

  const variants = {
    primary: "bg-[rgb(230,0,0)] hover:bg-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base shadow-lg shadow-red-900/40",
    ghost: "text-white/70 hover:text-white px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-white/10 rounded-md",
    nav: "text-white/80 hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {variant === "primary" && <Play size={16} className="sm:w-4.5 fill-current" />}
      {children || (variant === "primary" && "Start Watching Now")}
    </button>
  );
};

export default Button;