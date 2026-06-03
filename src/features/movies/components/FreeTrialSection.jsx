import { useEffect, useState } from "react";
import { fetchMovies, getMoviePoster } from "../constants/movies";

const FreeTrialSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies("trending", "movie");
        setMovies(data.slice(0, 18));
      } catch (error) {
        console.error("Failed to load movie posters:", error);
      }
    };

    loadMovies();
  }, []);

  return (
    <section className="bg-[#141414] px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 pt-6 sm:pt-8 md:pt-8">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-56 sm:min-h-64 flex items-center">
        
        {/* TMDB Poster Mosaic Background */}
        <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 opacity-30">
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={getMoviePoster(movie.poster_path)}
              alt={movie.title || movie.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Red Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-900/40 to-transparent" />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 w-full px-6 sm:px-8 md:px-10 py-8 sm:py-10">
          <div className="flex-1">
            <h3 className="text-white font-bold text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">
              Start your free trial today!
            </h3>

            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed">
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
          </div>

          <button className="shrink-0 bg-red-600 hover:bg-red-500 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-300 cursor-pointer text-sm sm:text-base whitespace-nowrap w-full md:w-auto">
            Start a Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;
