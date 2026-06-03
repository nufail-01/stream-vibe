// import { useEffect, useState, useRef } from "react";
// import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from "lucide-react";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

// const TV_CATEGORIES = [
//   { id: 10759, name: "Action & Adventure" },
//   { id: 35, name: "Comedy" },
//   { id: 18, name: "Drama" },
//   { id: 9648, name: "Mystery" },
//   { id: 10765, name: "Sci-Fi & Fantasy" },
//   { id: 80, name: "Crime" },
//   { id: 10751, name: "Family" },
//   { id: 10762, name: "Kids" },
// ];

// const fetchShowsByGenre = async (genreId) => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
//   );
//   const data = await res.json();
//   return data.results.slice(0, 4);
// };

// const ShowTopTenCard = ({ category }) => {
//   const [posters, setPosters] = useState([]);

//   useEffect(() => {
//     fetchShowsByGenre(category.id).then(setPosters);
//   }, [category.id]);

//   return (
//     <div className="shrink-0 w-full sm:w-64 md:w-72 lg:w-80 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden cursor-pointer group hover:border-white/20 transition-all duration-300">
//       <div className="relative bg-[#1a1a1a] grid grid-cols-2 grid-rows-2 gap-2 px-6 pt-6 mb-8 min-h-72 sm:min-h-80 md:min-h-88 lg:min-h-96">
//         {posters.map((show, idx) => (
//           <div key={idx} className="overflow-hidden rounded-lg">
//             <img
//               src={
//                 show.poster_path
//                   ? `${IMAGE_BASE_URL}${show.poster_path}`
//                   : `https://picsum.photos/seed/${idx}/150/200`
//               }
//               alt={show.name}
//               className="w-full h-full object-cover transition-transform "
//             />
//           </div>
//         ))}

//         <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/20 via-transparent to-transparent pointer-events-none" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/40 to-transparent pointer-events-none" />

//         {/* Top 10 Badge + Category name */}
//         <div className="absolute bottom-0 left-0 right-0 px-6 py-2 z-10">
//           <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md mb-1 inline-block">
//             Top 10 In
//           </span>
//           <div className="flex items-center justify-between">
//             <span className="text-white font-bold text-xl">{category.name}</span>
//             <ArrowRightIcon size={24} className="text-white" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ShowTopTenSection = () => {
//   const scrollRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     const scrollAmount = 300;
//     if (direction === "left") {
//       container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//       setActiveIndex((prev) => Math.max(0, prev - 1));
//     } else {
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//       setActiveIndex((prev) => Math.min(TV_CATEGORIES.length - 1, prev + 1));
//     }
//   };

//   return (
//     <section className="bg-[#141414] px-6 md:px-12 py-16">
//       {/* Header Row */}
//       <div className="flex items-start justify-between mb-10">
//         <h2 className="text-white text-3xl font-bold">Popular Top 10 In Genres</h2>

//         {/* Arrows + Dots */}
//         <div className="flex items-center gap-3 mt-2 shrink-0 bg-[#0f0f0f] border border-white/10 rounded-2xl p-3">
//           <button
//             onClick={() => scroll("left")}
//             className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-zinc-800 transition-all cursor-pointer"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <div className="flex items-center gap-2 px-2">
//             {TV_CATEGORIES.map((_, idx) => (
//               <div
//                 key={idx}
//                 className={`h-1.5 rounded-full transition-all duration-300 ${
//                   idx === activeIndex ? "w-8 bg-red-500" : "w-6 bg-zinc-600"
//                 }`}
//               />
//             ))}
//           </div>
//           <button
//             onClick={() => scroll("right")}
//             className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-zinc-800 transition-all cursor-pointer"
//           >
//             <ArrowRight size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Scrollable Cards */}
//       <div
//         ref={scrollRef}
//         className="flex gap-4 overflow-x-auto pb-2"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {TV_CATEGORIES.map((category) => (
//           <ShowTopTenCard key={category.id} category={category} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ShowTopTenSection;


import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

const TV_CATEGORIES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 9648, name: "Mystery" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 80, name: "Crime" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
];

const fetchShowsByGenre = async (genreId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
    );
    const data = await res.json();
    return data.results?.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching:", error);
    return [];
  }
};

const ShowTopTenCard = ({ category }) => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetchShowsByGenre(category.id).then(setPosters);
  }, [category.id]);

  return (
    <div className="shrink-0 snap-start w-[42vw] sm:w-[45vw] md:w-[42vw] lg:w-[320px] xl:w-[360px] bg-zinc-900 border border-white/10 rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:border-white/20">
      <div className="relative bg-[#1a1a1a] grid grid-cols-2 grid-rows-2 gap-1.5 p-3 aspect-[4/5]">
        {posters.map((show, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg">
            <img
              src={
                show.poster_path
                  ? `${IMAGE_BASE_URL}${show.poster_path}`
                  : `https://picsum.photos/seed/${idx}/300/450`
              }
              alt={show.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4 z-10">
          <div className="flex flex-col gap-1">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md inline-block w-fit">
              Top 10 In
            </span>
            <span className="text-white font-bold text-sm sm:text-base lg:text-lg">
              {category.name}
            </span>
          </div>
          <ArrowRight size={18} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

const ShowTopTenSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const firstCard = container.children[0];
      if (!firstCard) return;
      const gap = 16;
      const cardWidth = firstCard.clientWidth + gap;
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, TV_CATEGORIES.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="show-popular" className="bg-[#141414] px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 sm:mb-10">
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
          Popular Top 10 In Genres
        </h2>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3 shrink-0 bg-[#0f0f0f] border border-white/10 rounded-2xl p-3">
          <button onClick={() => scroll("left")} className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-zinc-800 transition-all">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2 px-2">
            {TV_CATEGORIES.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-red-500" : "w-5 bg-zinc-600"}`} />
            ))}
          </div>
          <button onClick={() => scroll("right")} className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-zinc-800 transition-all">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Dots */}
      <div className="flex md:hidden justify-center gap-2 mb-6">
        {TV_CATEGORIES.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-6 bg-red-500" : "w-3 bg-zinc-600"}`} />
        ))}
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {TV_CATEGORIES.map((category) => (
          <ShowTopTenCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default ShowTopTenSection;