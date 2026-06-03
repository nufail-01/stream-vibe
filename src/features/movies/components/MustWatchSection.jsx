import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Star } from "lucide-react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/* ----------------------------------
   Fetch Movies
----------------------------------- */
const fetchMustWatchMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch movies");

    const data = await res.json();

    return (
      data.results?.filter((movie) => movie.poster_path) || []
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

/* ----------------------------------
   Runtime Formatter
----------------------------------- */
const formatRuntime = (movie) => {
  if (movie?.runtime) {
    const hrs = Math.floor(movie.runtime / 60);
    const mins = movie.runtime % 60;
    return `${hrs}h ${mins}min`;
  }

  const fallback = [
    "1h 5min",
    "3h 5min",
    "2h",
    "3h",
  ];

  return fallback[movie?.id % fallback.length];
};

/* ----------------------------------
   Movie Card
----------------------------------- */
const MustWatchCard = ({ movie }) => {
  const navigate = useNavigate();

  const [runtime] = useState(() =>
    formatRuntime(movie)
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
      onClick={() => navigate(`/movies/${movie.id}`)}
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
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
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
      </div>

      {/* Bottom Info */}
      <div className="flex items-center justify-between gap-2">
        {/* Runtime */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-1 rounded-full">
          <Clock size={12} className="text-white/40" />
          <span className="text-[10px] sm:text-[11px] text-white/70">
            {runtime}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-2 py-1 rounded-full">
          <div className="flex items-center gap-0.5">
            {renderStars(movie.vote_average)}
          </div>

          <span className="text-[10px] sm:text-[11px] text-white/60">
            {formatVotes(movie.vote_count)}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------
   Main Section
----------------------------------- */
const MustWatchSection = () => {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMustWatchMovies();
      setMovies(data);
    };

    loadMovies();
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

    container.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      container.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [movies]);

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
    Math.ceil(movies.length / cardsPerPage)
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
          Must-Watch Movies
        </h2>

        {/* Desktop Controls */}
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
            {Array.from({
              length: totalDots,
            }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-red-500"
                    : "w-5 bg-zinc-600"
                }`}
              />
            ))}
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
        {Array.from({
          length: totalDots,
        }).map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-6 bg-red-500"
                : "w-3 bg-zinc-600"
            }`}
          />
        ))}
      </div>

      {/* Cards */}
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
        {movies.map((movie) => (
          <MustWatchCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
};

export default MustWatchSection;