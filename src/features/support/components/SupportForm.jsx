// import { useState, useEffect } from "react";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

// const SupportForm = () => {
//   const [posters, setPosters] = useState([]);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message: "",
//     agreed: false,
//   });

//   // ✅ TMDB se real posters fetch karo
//   useEffect(() => {
//     const fetchPosters = async () => {
//       const res = await fetch(
//         `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
//       );
//       const data = await res.json();
//       const filtered = data.results.filter((m) => m.poster_path);
//       setPosters(filtered.slice(0, 12));
//     };
//     fetchPosters();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (!formData.agreed) {
//       alert("Please agree to Terms of Use and Privacy Policy");
//       return;
//     }
//     console.log("Form submitted:", formData);
//   };

//   const inputClass =
//     "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors";

//   return (
//     <section className="bg-[#141414] px-6 md:px-12 py-24">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

//         {/* Left — Title + Real Movie Poster Grid */}
//         <div>
//           <h2 className="text-white text-4xl font-bold leading-tight mb-4">
//             Welcome to our <br /> support page!
//           </h2>
//           <p className="text-white/50 text-sm mb-8">
//             We're here to help you with any problems you may be having with our product.
//           </p>

//           {/* ✅ Real TMDB Movie Poster Grid */}
//           <div className="grid grid-cols-4 gap-3 rounded-xl overflow-hidden border border-white/10">
//             {posters.map((movie) => (
//               <div key={movie.id} className="overflow-hidden aspect-[2/3]">
//                 <img
//                   src={`${IMAGE_BASE_URL}${movie.poster_path}`}
//                   alt={movie.title}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   onError={(e) => {
//                     e.target.src = `https://picsum.photos/seed/${movie.id}/150/220`;
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right — Form Container */}
//         <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-8 md:p-10">

//           {/* First Name + Last Name */}
//           <div className="grid grid-cols-2 gap-5 mb-7">
//             <div>
//               <label className="text-white text-sm font-medium mb-3 block">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="Enter First Name"
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className="text-white text-sm font-medium mb-3 block">Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Enter Last Name"
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           {/* Email + Phone */}
//           <div className="grid grid-cols-2 gap-5 mb-7">
//             <div>
//               <label className="text-white text-sm font-medium mb-3 block">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your Email"
//                 className={inputClass}
//               />
//             </div>
//             <div>
//               <label className="text-white text-sm font-medium mb-3 block">Phone Number</label>
//               <div className="flex gap-2">
//                 <div className="bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-4 flex items-center gap-2 cursor-pointer shrink-0">
//                   <span className="text-lg text-white/40">🇮🇳</span>
//                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
//                     <path d="m6 9 6 6 6-6"/>
//                   </svg>
//                 </div>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Enter Phone Number"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Message */}
//           <div className="mb-8">
//             <label className="text-white text-sm font-medium mb-3 block">Message</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Enter your Message"
//               rows={6}
//               className={`${inputClass} resize-none`}
//             />
//           </div>

//           {/* Agree + Submit */}
//           <div className="flex items-center justify-between gap-4">
//             <label className="flex items-center gap-3 cursor-pointer">
//               <div
//                 className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
//                   formData.agreed
//                     ? "bg-red-600 border-red-600"
//                     : "bg-transparent border-white/20"
//                 }`}
//                 onClick={() =>
//                   setFormData((prev) => ({ ...prev, agreed: !prev.agreed }))
//                 }
//               >
//                 {formData.agreed && (
//                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
//                     <path d="M20 6L9 17l-5-5" />
//                   </svg>
//                 )}
//               </div>
//               <span className="text-white/50 text-sm">
//                 I agree with Terms of Use and Privacy Policy
//               </span>
//             </label>

//             <button
//               onClick={handleSubmit}
//               className="bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer shrink-0 text-sm"
//             >
//               Send Message
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SupportForm;

 

// responsive


import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

const SupportForm = () => {
  const [posters, setPosters] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreed: false,
  });

  // ✅ TMDB real posters fetch setup
  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await res.json();
        if (data.results) {
          const filtered = data.results.filter((m) => m.poster_path);
          setPosters(filtered.slice(0, 12));
        }
      } catch (error) {
        console.error("Failed to fetch posters:", error);
      }
    };
    fetchPosters();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    if (!formData.agreed) {
      alert("Please agree to Terms of Use and Privacy Policy");
      return;
    }
    console.log("Form submitted:", formData);
  };

  const inputClass =
    "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3.5 sm:px-5 sm:py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors";

  return (
    <section className="bg-[#141414] px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main layout changes columns based on screen breaks (1 col on mobile/tablet -> 2 cols on large screen desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* Left Side: Text Content & Poster Grid */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div>
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
                Welcome to our <br className="hidden sm:inline" /> support page!
              </h2>
              <p className="text-white/50 text-xs sm:text-sm max-w-xl">
                We're here to help you with any problems you may be having with our product.
              </p>
            </div>

            {/* Movie Poster Grid (Responsive counts: 3 cols on mobile -> 4 cols on tablet and up) */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 rounded-xl overflow-hidden border border-white/10 p-2 bg-[#0f0f0f]/50">
              {posters.map((movie) => (
                <div key={movie.id} className="overflow-hidden rounded-lg aspect-[2/3] bg-zinc-900">
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/${movie.id}/150/220`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Support Card Box */}
          <div id="contact-us" className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-5 sm:p-8 md:p-10 shadow-xl">
            
            {/* First Name + Last Name (Stacking on mobile layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5 sm:mb-6">
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-2 block">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-2 block">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email + Phone (Stacking on mobile layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6 sm:mb-8">
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-2 block">Phone Number</label>
                <div className="flex gap-2">
                  <div className="bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-3.5 sm:py-4 flex items-center gap-1.5 cursor-pointer shrink-0">
                    <span className="text-base sm:text-lg">🇮🇳</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/40">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div className="mb-6 sm:mb-8">
              <label className="text-white text-xs sm:text-sm font-medium mb-2 block">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your Message"
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Compliance Action Section (Stops layout blowout by dropping action item below compliance line on small widths) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
              <label className="flex items-start sm:items-center gap-3 cursor-pointer group select-none">
                <input 
                  type="checkbox"
                  checked={formData.agreed}
                  onChange={() => setFormData((prev) => ({ ...prev, agreed: !prev.agreed }))}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    formData.agreed
                      ? "bg-red-600 border-red-600"
                      : "bg-transparent border-white/20 group-hover:border-white/40"
                  }`}
                >
                  {formData.agreed && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
                <span className="text-white/50 text-xs sm:text-sm leading-tight">
                  I agree with Terms of Use and Privacy Policy
                </span>
              </label>

              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl transition-all duration-300 cursor-pointer text-center text-sm"
              >
                Send Message
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SupportForm;