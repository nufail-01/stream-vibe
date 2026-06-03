import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

const CATEGORIES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
];

const fetchMoviesByGenre = async (genreId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
  );
  const data = await res.json();
  return data.results.filter((m) => m.poster_path).slice(0, 4);
};

const TopTenCard = ({ category }) => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetchMoviesByGenre(category.id).then(setPosters);
  }, [category.id]);

  return (
    <div className="
      shrink-0
      snap-start
      w-[42vw]
      sm:w-[45vw]
      md:w-[42vw]
      lg:w-[320px]
      xl:w-[360px]
      bg-zinc-900
      border border-white/10
      rounded-xl
      overflow-hidden
      cursor-pointer
      group
      transition-all duration-300
      hover:border-white/20
    ">
      <div className="relative bg-[#1a1a1a] grid grid-cols-2 grid-rows-2 gap-1.5 p-3 aspect-[4/5]">
        {posters.map((movie, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent pointer-events-none" />

        {/* Badge + Name */}
        <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 py-3 z-10">
          <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md mb-1.5 inline-block">
            Top 10 In
          </span>
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-sm sm:text-base lg:text-lg">
              {category.name}
            </span>
            <ArrowRightIcon
              size={18}
              className="text-white transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TopTenSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Scroll sync dots
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const firstCard = container.children[0];
      if (!firstCard) return;
      const gap = 16;
      const cardWidth = firstCard.clientWidth + gap;
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, CATEGORIES.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section  id="popular" className="bg-[#141414] px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 sm:mb-10">
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
          Popular Top 10 In Genres
        </h2>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3 shrink-0 bg-[#0f0f0f] border border-white/10 rounded-2xl p-3">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-zinc-800 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2 px-2">
            {CATEGORIES.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-8 bg-red-500" : "w-5 bg-zinc-600"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-zinc-800 transition-all"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Dots */}
      <div className="flex md:hidden justify-center gap-2 mb-6">
        {CATEGORIES.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "w-6 bg-red-500" : "w-3 bg-zinc-600"
            }`}
          />
        ))}
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CATEGORIES.map((category) => (
          <TopTenCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default TopTenSection;