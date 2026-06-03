// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, ArrowRight, Clock, Star } from "lucide-react";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// // Fetching top-rated TV shows for must-watch shows
// const fetchMustWatchShows = async () => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
//   );
//   const data = await res.json();
//   return data.results.filter((show) => show.poster_path);
// };

// const formatDummyTime = () => {
//   const times = ["45min", "52min", "48min", "55min", "42min", "50min"];
//   return times[Math.floor(Math.random() * times.length)];
// };

// // Single Must-Watch Show Card Component
// const MustWatchShowCard = ({ show }) => {
//   const navigate = useNavigate();
//   const [dummyTime] = useState(formatDummyTime());

//   // Function to convert TMDB 10-point rating scale into 5 stars
//   const renderStars = (rating) => {
//     const totalStars = 5;
//     const filledStars = Math.round((rating / 10) * totalStars);
    
//     return Array.from({ length: totalStars }).map((_, index) => (
//       <Star
//         key={index}
//         size={14}
//         className={`${
//           index < filledStars ? "text-red-600 fill-red-600" : "text-zinc-600 fill-zinc-600"
//         }`}
//       />
//     ));
//   };

//   // Format vote count to match "20K" style
//   const formatVotes = (count) => {
//     if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
//     return count;
//   };

//   return (
//     <div 
//       onClick={() => navigate(`/shows/${show.id}`)} 
//       className="shrink-0 w-full sm:w-44 md:w-52 lg:w-56 bg-[#1a1a1a]/30 border border-white/5 rounded-2xl p-3 cursor-pointer group transition-all duration-300 hover:border-white/10  "
//     >
      
//       {/* Poster Container */}
//       <div className="relative rounded-xl overflow-hidden min-h-56 sm:min-h-64 mb-4 bg-zinc-900">
//         <img
//           src={`${IMAGE_BASE_URL}${show.poster_path}`}
//           alt={show.name}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
//           loading="lazy"
//         />
        
//         {/* TV Show Badge */}
//         <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
//           TV SERIES
//         </div>
//       </div>

//       {/* Title */}
//       <div className="mb-2">
//         <h3 className="text-white font-semibold text-sm truncate">{show.name}</h3>
//       </div>

//       {/* Info Row (Clock Icon + Dummy Time + Stars Pill) */}
//       <div className="flex items-center justify-between gap-1">
//         {/* Clock Icon with Dummy Time Badge */}
//         <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2.5 py-1.5 rounded-full">
//           <Clock size={13} className="text-white/40" />
//           <span className="text-[11px] font-medium tracking-wide text-white/60">{dummyTime}</span>
//         </div>
        
//         {/* Star Rating & Vote Count Badge */}
//         <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2.5 py-1.5 rounded-full">
//           <div className="flex items-center gap-0.5">
//             {renderStars(show.vote_average)}
//           </div>
//           <span className="text-[11px] font-semibold text-white/40 ml-1">
//             {formatVotes(show.vote_count || 15000)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MustWatchShowsSection = () => {
//   const [shows, setShows] = useState([]);
//   const scrollRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     fetchMustWatchShows().then(setShows);
//   }, []);

//   const scroll = (direction) => {
//     const container = scrollRef.current;
//     const scrollAmount = 500;
//     if (direction === "left") {
//       container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//       setActiveIndex((prev) => Math.max(0, prev - 1));
//     } else {
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//       setActiveIndex((prev) => Math.min(3, prev + 1));
//     }
//   };

//   return (
//     <section className="bg-[#141414] px-6 md:px-12 py-16">

//       {/* Header Container */}
//       <div className="flex items-center justify-between mb-8">
//         <h2 className="text-white text-3xl font-bold tracking-tight">Must - Watch Shows</h2>

//         {/* Carousel Slide Navigator */}
//         <div className="flex items-center gap-3 bg-[#0f0f0f] border border-white/10 rounded-2xl p-3">
//           {/* Left Arrow Button */}
//           <button
//             onClick={() => scroll("left")}
//             className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white/70 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
//           >
//             <ArrowLeft size={18} />
//           </button>
          
//           {/* Custom Horizontal Line Indicators */}
//           <div className="flex items-center gap-1.5 px-1">
//             {[0, 1, 2, 3].map((idx) => (
//               <div
//                 key={idx}
//                 className={`h-1 rounded-full transition-all duration-300 ${
//                   idx === activeIndex ? "w-6 bg-red-600" : "w-4 bg-zinc-800"
//                 }`}
//               />
//             ))}
//           </div>
          
//           {/* Right Arrow Button */}
//           <button
//             onClick={() => scroll("right")}
//             className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white/70 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
//           >
//             <ArrowRight size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Horizontal Cards Area */}
//       <div
//         ref={scrollRef}
//         className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {shows.map((show) => (
//           <MustWatchShowCard key={show.id} show={show} />
//         ))}
//       </div>

//       {/* Layout Scrollbar Injection */}
//       <style>{`
//         div::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default MustWatchShowsSection;


// responsive

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Star } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/* ----------------------------------
   Fetch Top Rated TV Shows
----------------------------------- */
const fetchMustWatchShows = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch shows");

    const data = await res.json();

    return (
      data.results?.filter((show) => show.poster_path) || []
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

/* ----------------------------------
   Stable Episode Runtime
----------------------------------- */
const formatDummyTime = (show) => {
  const times = ["45min", "52min", "48min", "55min", "42min", "50min"];
  return times[show?.id % times.length];
};

/* ----------------------------------
   TV Show Card
----------------------------------- */
const MustWatchShowCard = ({ show }) => {
  const navigate = useNavigate();

  const [episodeTime] = useState(() =>
    formatDummyTime(show)
  );

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(
      (rating / 10) * totalStars
    );

    return Array.from({
      length: totalStars,
    }).map((_, index) => (
      <Star
        key={index}
        size={12}
        className={
          index < filledStars
            ? "text-red-600 fill-red-600"
            : "text-zinc-600 fill-zinc-600"
        }
      />
    ));
  };

  const formatVotes = (count) => {
    if (!count) return "0";

    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }

    return count;
  };

  return (
    <div
      onClick={() => navigate(`/shows/${show.id}`)}
      className="
        shrink-0
        snap-start
        w-[42vw]
        sm:w-[30vw]
        md:w-[24vw]
        lg:w-[220px]
        xl:w-[240px]
        bg-[#1a1a1a]/30
        border
        border-white/5
        rounded-2xl
        p-2
        sm:p-3
        cursor-pointer
        group
        transition-all
        duration-300
        hover:border-white/10
      "
    >
      {/* Poster */}
      <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-3 bg-zinc-900">
        <img
          src={`${IMAGE_BASE_URL}${show.poster_path}`}
          alt={show.name}
          loading="lazy"
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* TV Badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md">
          TV SERIES
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-xs sm:text-sm truncate mb-3">
        {show.name}
      </h3>

      {/* Info */}
      <div className="flex items-center justify-between gap-2">
        {/* Runtime */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-1 rounded-full">
          <Clock size={12} className="text-white/40" />
          <span className="text-[10px] sm:text-[11px] text-white/70">
            {episodeTime}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-1 rounded-full">
          <div className="flex items-center gap-0.5">
            {renderStars(show.vote_average)}
          </div>

          <span className="text-[10px] sm:text-[11px] text-white/60">
            {formatVotes(show.vote_count || 15000)}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------
   Main Section
----------------------------------- */
const MustWatchShowsSection = () => {
  const [shows, setShows] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);

  useEffect(() => {
    const loadShows = async () => {
      const data = await fetchMustWatchShows();
      setShows(data);
    };

    loadShows();
  }, []);

  /* Sync dots while scrolling */
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      const firstCard = container.children[0];

      if (!firstCard) return;

      const gap = 16;
      const cardWidth = firstCard.clientWidth + gap;

      const cardsPerPage =
        window.innerWidth < 640
          ? 2
          : window.innerWidth < 1024
          ? 3
          : 4;

      const page = Math.round(
        container.scrollLeft /
          (cardWidth * cardsPerPage)
      );

      setActiveIndex(page);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [shows]);

  const cardsPerPage =
    typeof window !== "undefined"
      ? window.innerWidth < 640
        ? 2
        : window.innerWidth < 1024
        ? 3
        : 4
      : 4;

  const totalDots = Math.max(
    1,
    Math.ceil(shows.length / cardsPerPage)
  );

  const scroll = (direction) => {
    const container = scrollRef.current;

    if (!container) return;

    const scrollAmount =
      container.clientWidth * 0.9;

    container.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="
        bg-[#141414]
        px-4
        sm:px-6
        lg:px-12
        xl:px-20
        py-12
        sm:py-16
        lg:py-20
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
          mb-10
          sm:mb-12
        "
      >
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Must-Watch Shows
        </h2>

        {/* Desktop / Tablet Controls */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-3
            bg-[#0f0f0f]
            border
            border-white/10
            rounded-2xl
            p-3
          "
        >
          <button
            onClick={() => scroll("left")}
            className="
              w-12
              h-12
              rounded-xl
              bg-[#1A1A1A]
              flex
              items-center
              justify-center
              text-white
              hover:bg-zinc-800
              transition-all
            "
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2 px-2">
            {Array.from({ length: totalDots }).map(
              (_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-red-500"
                      : "w-5 bg-zinc-600"
                  }`}
                />
              )
            )}
          </div>

          <button
            onClick={() => scroll("right")}
            className="
              w-12
              h-12
              rounded-xl
              bg-[#1A1A1A]
              flex
              items-center
              justify-center
              text-white
              hover:bg-zinc-800
              transition-all
            "
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Dots */}
      <div className="flex md:hidden justify-center gap-2 mb-6">
        {Array.from({ length: totalDots }).map(
          (_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 bg-red-500"
                  : "w-3 bg-zinc-600"
              }`}
            />
          )
        )}
      </div>

      {/* Cards Row */}
      <div
        ref={scrollRef}
        className="
          flex
          gap-4
          overflow-x-auto
          snap-x
          snap-mandatory
          scroll-smooth
          pb-4
          [&::-webkit-scrollbar]:hidden
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {shows.map((show) => (
          <MustWatchShowCard
            key={show.id}
            show={show}
          />
        ))}
      </div>
    </section>
  );
};

export default MustWatchShowsSection;