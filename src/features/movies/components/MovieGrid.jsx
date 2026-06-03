import { useEffect, useState } from "react";
import { fetchMovies, getMoviePoster } from "../constants/movies";

const MovieCard = ({ movie, index }) => {
  const delay = `${(index % 8) * 100}ms`;

  return (
    <div
      className="relative overflow-hidden rounded-xl group"
      style={{ animationDelay: delay }}
    >
      <img
        src={getMoviePoster(movie.poster_path)}
        alt={movie.title || movie.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.src = `https://picsum.photos/seed/${index}/200/300`;
        }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
    </div>
  );
};

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      // Show cached data immediately if available
      const randomCategory = ["popular", "top_rated", "now_playing", "upcoming", "trending"][
        Math.floor(Math.random() * 5)
      ];
      const randomType = ["movie", "tv"][Math.floor(Math.random() * 2)];

      const data = await fetchMovies(randomCategory, randomType);

      const shuffled = [...data].sort(() => Math.random() - 0.5);
      const repeated = [...shuffled, ...shuffled].slice(0, 32);
      setMovies(repeated);
      setLoading(false);
    };

    loadMovies();
  }, []);

  if (loading) {
    // Show skeleton placeholders (responsive auto-rows)
    return (
      <div
        className="absolute inset-0 grid gap-2.5 p-2.5 opacity-75 overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 auto-rows-[minmax(10rem,1fr)] sm:auto-rows-[minmax(11rem,1fr)] md:auto-rows-[minmax(12rem,1fr)] lg:auto-rows-[minmax(14rem,1fr)]"
      >
        {[...Array(32)].map((_, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 grid gap-2.5 p-2.5 opacity-75 overflow-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 auto-rows-[minmax(10rem,1fr)] sm:auto-rows-[minmax(11rem,1fr)] md:auto-rows-[minmax(12rem,1fr)] lg:auto-rows-[minmax(14rem,1fr)]"
    >
      {movies.map((movie, idx) => (
        <MovieCard key={`${movie.id}-${idx}`} movie={movie} index={idx} />
      ))}
    </div>
  );
};

export default MovieGrid;