import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Plus, ThumbsUp, Volume2 } from "lucide-react";
import PlayIcon from "../../../shared/components/PlayIcon";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

const fetchTrendingMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results.slice(0, 5);
};

const MoviesBanner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  const current = movies[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  if (!current) return null;

  return (
    <div className="relative w-full mx-auto mt-4 sm:mt-6 px-4 sm:px-6 md:px-12">

      {/* Banner Container - Increased height */}
      <div className="relative rounded-md overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]">

        {/* Backdrop Image */}
        <img
          src={`${BACKDROP_BASE}${current.backdrop_path}`}
          alt={current.title}
          className="w-full h-full object-cover object-center transition-all duration-700"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=No+Image";
          }}
        />

        {/* MINIMAL gradient - just enough for text readability, no black background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* Content — bottom CENTER on the image */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center pb-8 sm:pb-10 md:pb-14 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* Title */}
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 drop-shadow-lg max-w-4xl text-center">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-white/95 text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-3xl leading-relaxed mb-5 sm:mb-7 font-normal drop-shadow-md text-center line-clamp-2 sm:line-clamp-3">
            {current.overview}
          </p>

          {/* Play Now Button */}
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 sm:px-7 md:px-9 py-2.5 sm:py-3 md:py-4 rounded-lg transition-all duration-300 cursor-pointer text-sm sm:text-base md:text-lg shadow-lg">
            <PlayIcon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span>Play Now</span>
          </button>
        </div>

        {/* Action Buttons - Top Right */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 md:right-8 lg:right-12 flex items-center gap-2 sm:gap-3">
          <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
            <Plus size={14} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />
          </button>
          <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
            <ThumbsUp size={14} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />
          </button>
          <button className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
            <Volume2 size={14} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm"
        >
          <ArrowLeft size={14} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-black/40 hover:bg-black/60 border border-white/20 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm"
        >
          <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-4.5 md:h-4.5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
          {movies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex 
                  ? "w-6 sm:w-8 bg-red-500" 
                  : "w-2 sm:w-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesBanner;