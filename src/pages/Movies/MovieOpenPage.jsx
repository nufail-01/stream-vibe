import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Plus,
  ThumbsUp,
  Volume2,
  ArrowLeft,
  ArrowRight,
  Star,
  Calendar,
  Languages,
  Award,
  Film,
  User,
  Music,
  Clock,
} from "lucide-react";

// Reusable Global Assets
import Navbar from "../../features/navbar/components/Navbar";
import FreeTrialSection from "../../features/movies/components/FreeTrialSection";
import Footer from "../../features/footer/components/Footer";
import MoviesDetailsLoader from "../../features/movies/components/MoviesDetailsLoader";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const BACKDROP_SIZE = "original";
const POSTER_SIZE = "w500";

const MovieOpenPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const castScrollRef = useRef(null);

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch movie details
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`,
        );

        if (!movieRes.ok) {
          throw new Error("Movie not found");
        }

        const movieData = await movieRes.json();
        setMovie(movieData);
        setCredits(movieData.credits);
        setVideos(movieData.videos);

        // Fetch reviews
        const reviewsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`,
        );
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData.results || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, navigate]);

  const scrollCast = (direction) => {
    if (castScrollRef.current) {
      const scrollAmount = 300;
      castScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round((rating / 10) * totalStars);

    return Array.from({ length: totalStars }).map((_, index) => (
      <Star
        key={index}
        size={12}
        className={`${
          index < filledStars ? "text-red-600 fill-red-600" : "text-zinc-600"
        }`}
      />
    ));
  };

  const formatVotes = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count;
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const getYear = (date) => {
    if (!date) return "N/A";
    return new Date(date).getFullYear();
  };

  const getTrailerKey = () => {
    if (videos?.results) {
      const trailer = videos.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );
      return trailer?.key || null;
    }
    return null;
  };

  const handlePlay = () => {
    const trailerKey = getTrailerKey();
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
    }
  };

  if (loading) {
    return <MoviesDetailsLoader />;
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">
            ⚠️ {error || "Movie not found"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-start overflow-x-hidden font-sans">
      <Navbar />

      <div className="pt-20">
  {/* HERO BANNER — Full width, no padding */}
  <div className="relative w-full px-4 sm:px-6 md:px-12 mt-6 select-none ">
    <div className="relative w-full rounded-2xl overflow-hidden h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-screen">
      
      {/* Backdrop Image */}
      <img
        src={`${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover object-center transition-all duration-700"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=No+Image";
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content — bottom center */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-8">

        {/* Title */}
        <h1 className="text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 drop-shadow-lg max-w-4xl">
          {movie.title}
        </h1>

        {/* Description */}
        <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl lg:max-w-2xl leading-relaxed mb-6 sm:mb-8 drop-shadow-md line-clamp-2">
          {movie.overview || "No description available."}
        </p>

        {/* Buttons — same row all sizes */}
        <div className="flex items-center gap-3">
 
          {/* Play Trailer */}
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-lg transition-all duration-300 cursor-pointer text-sm sm:text-base shadow-lg"
          >
            <Play size={16} fill="currentColor" />
            Play Trailer
          </button>

          {/* + */}
          <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
            <Plus size={18} />
          </button>

          {/* 👍 */}
          <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
            <ThumbsUp size={18} />
          </button>

          {/* 🔊 */}
          <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
            <Volume2 size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>

        {/* METADATA DASHBOARD GRID SECTION - RESPONSIVE */}
        <div className="mx-4 sm:mx-6 md:mx-12 my-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-6">
            {/* Description */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 sm:p-6 md:p-8">
              <h3 className="text-zinc-500 text-xs sm:text-sm font-bold mb-3">
                Description
              </h3>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-light">
                {movie.overview || "No description available."}
              </p>
            </div>

            {/* Cast Section - RESPONSIVE */}
            {credits?.cast && credits.cast.length > 0 && (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-zinc-500 text-xs sm:text-sm font-bold">Cast</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollCast("left")}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-zinc-300 cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <button
                      onClick={() => scrollCast("right")}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-zinc-300 cursor-pointer"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                <div
                  ref={castScrollRef}
                  className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth hide-scrollbar pb-1"
                >
                  {credits.cast.slice(0, 15).map((actor) => (
                    <div
                      key={actor.id}
                      className="shrink-0 w-20 sm:w-24 text-center"
                    >
                      <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-white/5 mb-2 border border-white/5">
                        <img
                          src={
                            actor.profile_path
                              ? `${IMAGE_BASE_URL}/w185${actor.profile_path}`
                              : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                          }
                          alt={actor.name}
                          className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-white text-xs font-medium truncate">
                        {actor.name}
                      </p>
                      <p className="text-zinc-500 text-[10px] truncate">
                        {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS CONTAINER - RESPONSIVE */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-zinc-500 text-xs sm:text-sm font-bold">Reviews</h3>
                <button className="bg-[#141414] border border-white/10 hover:bg-zinc-900 text-xs px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer text-zinc-200 flex items-center gap-1.5 w-full sm:w-auto justify-center">
                  <span className="text-base font-normal">+</span> Add Your Review
                </button>
              </div>

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reviews.slice(0, 2).map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#0f0f0f]/60 border border-white/5 rounded-xl p-5 sm:p-7 flex flex-col justify-between min-h-48"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white">
                              {review.author}
                            </h4>
                            <p className="text-xs text-zinc-500 mt-0.5">
                              From {review.author_details?.username || "User"}
                            </p>
                          </div>
                          {review.author_details?.rating && (
                            <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-full">
                              <div className="flex text-red-600 gap-0.5">
                                {renderStars(review.author_details.rating * 2)}
                              </div>
                              <span className="text-zinc-300 text-[10px] font-medium">
                                {review.author_details.rating}
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
                          {review.content.length > 200
                            ? `${review.content.slice(0, 200)}...`
                            : review.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-zinc-500 text-sm">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}

              {/* Review Pagination */}
              {reviews.length > 0 && (
                <div className="w-full flex items-center justify-center gap-4 mt-6 pt-2">
                  <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white bg-transparent cursor-pointer">
                    <ArrowLeft size={12} />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-1 sm:w-4 rounded-full bg-red-600" />
                    <div className="w-2 h-1 sm:w-3 rounded-full bg-white/20" />
                    <div className="w-2 h-1 sm:w-3 rounded-full bg-white/20" />
                  </div>
                  <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white bg-transparent cursor-pointer">
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR - RESPONSIVE */}
          <div className="lg:col-span-4 bg-[#1a1a1a] border border-white/10 rounded-xl p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            {/* Runtime */}
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium mb-1.5">
                <Clock size={14} className="sm:w-4 sm:h-4" />
                <span>Runtime</span>
              </div>
              <p className="text-white text-sm sm:text-base font-semibold">
                {formatRuntime(movie.runtime)}
              </p>
            </div>

            {/* Released Year */}
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium mb-1.5">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
                <span>Released Year</span>
              </div>
              <p className="text-white text-sm sm:text-base font-semibold">
                {getYear(movie.release_date)}
              </p>
            </div>

            {/* Available Languages */}
            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium mb-2.5">
                  <Languages size={14} className="sm:w-4 sm:h-4" />
                  <span>Available Languages</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.spoken_languages.slice(0, 5).map((lang) => (
                    <span
                      key={lang.iso_639_1}
                      className="bg-[#0f0f0f] border border-white/5 text-zinc-300 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 rounded-lg font-normal"
                    >
                      {lang.english_name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ratings */}
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium mb-2.5">
                <Award size={14} className="sm:w-4 sm:h-4" />
                <span>Ratings</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0f0f0f] border border-white/5 p-3 rounded-xl">
                  <p className="text-[10px] font-bold tracking-wider text-zinc-500 mb-1">
                    TMDB
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <div className="flex text-red-600 gap-0.5">
                      {renderStars(movie.vote_average)}
                    </div>
                    <span className="text-xs font-bold text-white">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[9px] text-zinc-500 mt-1">
                    {formatVotes(movie.vote_count)} votes
                  </p>
                </div>
                <div className="bg-[#0f0f0f] border border-white/5 p-3 rounded-xl">
                  <p className="text-[10px] font-bold tracking-wider text-zinc-500 mb-1">
                    Popularity
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {Math.round(movie.popularity)}
                  </p>
                  <p className="text-[9px] text-zinc-500 mt-1">Score</p>
                </div>
              </div>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium mb-2.5">
                  <Film size={14} className="sm:w-4 sm:h-4" />
                  <span>Genres</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-[#0f0f0f] border border-white/5 text-zinc-300 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 rounded-lg font-normal"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Director */}
            {credits?.crew && (
              <div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium mb-2">
                  <User size={14} className="sm:w-4 sm:h-4" />
                  <span>Director</span>
                </div>
                {credits.crew
                  .filter((member) => member.job === "Director")
                  .map((director) => (
                    <div
                      key={director.id}
                      className="bg-[#0f0f0f] border border-white/5 p-3 sm:p-4 rounded-xl flex items-center gap-3"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 overflow-hidden shrink-0">
                        <img
                          src={
                            director.profile_path
                              ? `${IMAGE_BASE_URL}/w185${director.profile_path}`
                              : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                          }
                          alt={director.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-white truncate">
                          {director.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">
                          Director
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <FreeTrialSection />
      </div>

      <Footer />

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          @media (max-width: 640px) {
            .line-clamp-3 {
              -webkit-line-clamp: 2;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MovieOpenPage;



{/* <div className="pt-20">
{/* HERO BANNER - Clean text on image, no dark overlay */}
// {/* <div className="relative w-full px-4 sm:px-6 md:px-12 mt-6 select-none">
//   <div className="relative rounded-2xl overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] border border-white/5 shadow-2xl bg-[#0f0f0f]">
//     <img
//       src={`${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path || movie.poster_path}`}
//       alt={movie.title}
//       className="w-full h-full object-cover object-top transition-all duration-700"
//       onError={(e) => {
//         e.target.src =
//           "https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=No+Image";
//       }}
//     />
    
//     {/* MINIMAL gradient - just for text readability, no dark background */}
//     <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

//     <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center pb-8 sm:pb-10 md:pb-14 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
//       <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 drop-shadow-lg max-w-4xl text-center">
//         {movie.title}
//       </h1>
//       <p className="text-white/95 text-xs sm:text-sm md:text-base max-w-2xl lg:max-w-3xl leading-relaxed mb-5 sm:mb-7 font-normal drop-shadow-md text-center line-clamp-2 sm:line-clamp-3">
//         {movie.overview || "No description available."}
//       </p>

//       <div className="flex items-center gap-3 flex-wrap justify-center">
//         <button
//           onClick={handlePlay}
//           className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm md:text-base shadow-lg"
//         >
//           <Play size={16} fill="currentColor" className="sm:w-5 sm:h-5" />
//           <span>Play Trailer</span>
//         </button>
//         <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
//           <Plus size={16} className="sm:w-4 sm:h-4" />
//         </button>
//         <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
//           <ThumbsUp size={16} className="sm:w-4 sm:h-4" />
//         </button>
//         <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
//           <Volume2 size={16} className="sm:w-4 sm:h-4" />
//         </button>
//       </div>
//     </div>
//   </div>
// </div> */} */}