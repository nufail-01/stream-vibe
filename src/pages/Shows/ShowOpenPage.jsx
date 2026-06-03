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
  Grid,
} from "lucide-react";

// Reusable Global Assets
import Navbar from "../../features/navbar/components/Navbar";
import FreeTrialSection from "../../features/movies/components/FreeTrialSection";
import Footer from "../../features/footer/components/Footer";

// ✅ Imported your cinematic skeleton loader component
import ShowDetailsLoader from "../../features/shows/components/ShowDetailsLoader";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const BACKDROP_SIZE = "original";
const POSTER_SIZE = "w500";

const ShowOpenPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const castScrollRef = useRef(null);
  const [expandedSeason, setExpandedSeason] = useState(null);

  const [show, setShow] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchShowData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch TV show details
        const showRes = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`,
        );

        if (!showRes.ok) {
          throw new Error("Show not found");
        }

        const showData = await showRes.json();
        setShow(showData);
        setCredits(showData.credits);
        setVideos(showData.videos);

        // Set seasons data
        if (showData.seasons) {
          setSeasons(
            showData.seasons.filter((season) => season.season_number > 0),
          );

          // Fetch episodes for each season
          for (const season of showData.seasons) {
            if (season.season_number > 0) {
              const episodesRes = await fetch(
                `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${API_KEY}`,
              );
              const episodesData = await episodesRes.json();
              setEpisodes((prev) => ({
                ...prev,
                [season.season_number]: episodesData.episodes || [],
              }));
            }
          }
        }

        // Fetch reviews
        const reviewsRes = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${API_KEY}`,
        );
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData.results || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching show:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowData();
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

  const renderStars = (rating, totalStars = 5) => {
    const filledStars = Math.round((rating / 10) * totalStars);

    return Array.from({ length: totalStars }).map((_, index) => (
      <Star
        key={index}
        size={14}
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

  const toggleSeason = (seasonNumber) => {
    if (expandedSeason === seasonNumber) {
      setExpandedSeason(null);
    } else {
      setExpandedSeason(seasonNumber);
    }
  };

  if (loading) {
    return <ShowDetailsLoader />;
  }

  if (error || !show) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">
            ⚠️ {error || "Show not found"}
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
        {/* HERO BANNER - Clean text on image, no dark overlay */}
        <div className="relative w-full px-4 sm:px-6 md:px-12 mt-6 select-none">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] border border-white/5 shadow-2xl bg-[#0f0f0f]">
            <img
              src={`${IMAGE_BASE_URL}/${BACKDROP_SIZE}${show.backdrop_path || show.poster_path}`}
              alt={show.name}
              className="w-full h-full object-cover object-top transition-all duration-700"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=No+Image";
              }}
            />
            
            {/* MINIMAL gradient - just for text readability, no dark background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center pb-8 sm:pb-10 md:pb-14 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
              <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 drop-shadow-lg max-w-4xl text-center">
                {show.name}
              </h1>
              <p className="text-white/95 text-xs sm:text-sm md:text-base max-w-2xl lg:max-w-3xl leading-relaxed mb-5 sm:mb-7 font-normal drop-shadow-md text-center line-clamp-2 sm:line-clamp-3">
                {show.overview || "No description available."}
              </p>

              <div className="flex items-center gap-3 flex-wrap justify-center">
                <button
                  onClick={handlePlay}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg transition-all duration-300 cursor-pointer text-xs sm:text-sm md:text-base shadow-lg"
                >
                  <Play size={16} fill="currentColor" className="sm:w-5 sm:h-5" />
                  <span>Play Trailer</span>
                </button>
                <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
                  <Plus size={16} className="sm:w-4 sm:h-4" />
                </button>
                <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
                  <ThumbsUp size={16} className="sm:w-4 sm:h-4" />
                </button>
                <button className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-sm">
                  <Volume2 size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* METADATA DASHBOARD GRID SECTION */}
        <div className="mx-4 sm:mx-6 md:mx-12 my-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-6">
            {/* Description */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8">
              <h3 className="text-zinc-500 text-xs sm:text-sm font-bold mb-3">
                Description
              </h3>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-light">
                {show.overview || "No description available."}
              </p>
            </div>

            {/* Seasons and Episodes Section - FULLY RESPONSIVE */}
            {seasons.length > 0 && (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8">
                <h3 className="text-white text-base sm:text-lg mb-4 font-bold tracking-tight">
                  Seasons and Episodes
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  {seasons.map((season) => (
                    <div
                      key={season.id}
                      className="border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden"
                    >
                      {/* Season Header */}
                      <button
                        onClick={() => toggleSeason(season.season_number)}
                        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-[#0f0f0f] hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <h4 className="text-white font-bold text-sm sm:text-base md:text-lg">
                            Season{" "}
                            {String(season.season_number).padStart(2, "0")}
                          </h4>
                          <span className="text-zinc-500 text-xs sm:text-sm font-normal">
                            {season.episode_count} Episodes
                          </span>
                        </div>

                        {/* Arrow icon */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60">
                          {expandedSeason === season.season_number ? (
                            <ArrowLeft size={14} className="rotate-90" />
                          ) : (
                            <ArrowLeft size={14} className="-rotate-90" />
                          )}
                        </div>
                      </button>

                      {/* Episodes List - RESPONSIVE GRID LAYOUT */}
                      {expandedSeason === season.season_number &&
                        episodes[season.season_number] && (
                          <div className="divide-y divide-white/5 bg-[#141414] px-3 sm:px-4 md:px-6">
                            {episodes[season.season_number].map((episode) => (
                              <div key={episode.id} className="py-4 sm:py-5 md:py-6">
                                {/* Mobile Layout (stacked) */}
                                <div className="block md:hidden">
                                  <div className="flex flex-col gap-3">
                                    {/* Episode Number and Runtime */}
                                    <div className="flex items-center justify-between">
                                      <span className="text-zinc-500 font-bold text-lg">
                                        {String(episode.episode_number).padStart(2, "0")}
                                      </span>
                                      <div className="flex items-center gap-1.5 bg-[#0f0f0f] border border-white/10 px-2.5 py-1.5 rounded-xl">
                                        <Clock size={12} className="text-zinc-400" />
                                        <span className="text-zinc-300 text-xs font-medium">
                                          {formatRuntime(episode.runtime)}
                                        </span>
                                      </div>
                                    </div>

                                    {/* Episode Thumbnail */}
                                    <div
                                      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group/thumb bg-zinc-800"
                                      onClick={() => {
                                        const trailerKey = getTrailerKey();
                                        if (trailerKey) {
                                          window.open(
                                            `https://www.youtube.com/watch?v=${trailerKey}`,
                                            "_blank",
                                          );
                                        }
                                      }}
                                    >
                                      <img
                                        src={
                                          episode.still_path
                                            ? `${IMAGE_BASE_URL}/w300${episode.still_path}`
                                            : `https://image.tmdb.org/t/p/w300${show.backdrop_path}`
                                        }
                                        alt={episode.name}
                                        className="w-full h-full object-cover group-hover/thumb:brightness-75 transition-all duration-300"
                                        onError={(e) => {
                                          e.target.src = `https://image.tmdb.org/t/p/w300${show.backdrop_path}`;
                                        }}
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover/thumb:scale-110 transition-transform duration-300">
                                          <Play
                                            size={16}
                                            fill="white"
                                            className="text-white ml-0.5"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Episode Info */}
                                    <div>
                                      <h5 className="text-white font-semibold text-sm sm:text-base leading-snug mb-2">
                                        Chapter {String(episode.episode_number).padStart(2, "0")}: {episode.name}
                                      </h5>
                                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                                        {episode.overview || "No description available."}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Tablet/Desktop Layout (horizontal) */}
                                <div className="hidden md:flex md:items-start md:gap-4 lg:gap-5">
                                  {/* Episode Number */}
                                  <span className="text-zinc-500 font-bold text-xl w-10 shrink-0 self-center">
                                    {String(episode.episode_number).padStart(2, "0")}
                                  </span>

                                  {/* Episode Thumbnail */}
                                  <div
                                    className="relative w-32 sm:w-40 md:w-44 lg:w-48 h-20 sm:h-24 md:h-28 lg:h-32 rounded-xl overflow-hidden shrink-0 cursor-pointer group/thumb bg-zinc-800"
                                    onClick={() => {
                                      const trailerKey = getTrailerKey();
                                      if (trailerKey) {
                                        window.open(
                                          `https://www.youtube.com/watch?v=${trailerKey}`,
                                          "_blank",
                                        );
                                      }
                                    }}
                                  >
                                    <img
                                      src={
                                        episode.still_path
                                          ? `${IMAGE_BASE_URL}/w300${episode.still_path}`
                                          : `https://image.tmdb.org/t/p/w300${show.backdrop_path}`
                                      }
                                      alt={episode.name}
                                      className="w-full h-full object-cover group-hover/thumb:brightness-75 transition-all duration-300"
                                      onError={(e) => {
                                        e.target.src = `https://image.tmdb.org/t/p/w300${show.backdrop_path}`;
                                      }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover/thumb:scale-110 transition-transform duration-300">
                                        <Play
                                          size={14}
                                          fill="white"
                                          className="text-white ml-0.5"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Episode Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                      <h5 className="text-white font-semibold text-sm sm:text-base leading-snug">
                                        Chapter {String(episode.episode_number).padStart(2, "0")}: {episode.name}
                                      </h5>
                                      <div className="flex items-center gap-1.5 bg-[#0f0f0f] border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shrink-0 self-start sm:self-center">
                                        <Clock size={12} className="text-zinc-400" />
                                        <span className="text-zinc-300 text-xs font-medium">
                                          {formatRuntime(episode.runtime)}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                                      {episode.overview || "No description available."}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cast Section - Responsive */}
            {credits?.cast && credits.cast.length > 0 && (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8">
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

            {/* REVIEWS CONTAINER - Responsive */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-zinc-500 text-xs sm:text-sm font-bold">Reviews</h3>
                <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-xs px-3 sm:px-4 py-2 rounded-xl transition-all cursor-pointer text-zinc-200 flex items-center gap-1.5 w-full sm:w-auto justify-center">
                  <span className="text-base font-normal">+</span> Add Your Review
                </button>
              </div>

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reviews.slice(0, 2).map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#0f0f0f]/60 border border-white/5 rounded-xl p-5 sm:p-7 flex flex-col justify-between min-h-48 sm:min-h-56"
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

          {/* 📋 RIGHT SIDEBAR - Responsive */}
          <div className="lg:col-span-4 bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-7">
            
            {/* Released Year Container */}
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-normal mb-2 tracking-wide">
                <Calendar size={14} className="text-zinc-500" />
                <span>Released Year</span>
              </div>
              <p className="text-white text-sm sm:text-lg font-bold">
                {getYear(show.first_air_date)}
              </p>
            </div>

            {/* Available Languages Container */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm font-normal mb-3 tracking-wide">
                <Languages size={14} className="text-zinc-500" />
                <span>Available Languages</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {show.spoken_languages && show.spoken_languages.length > 0 ? (
                  show.spoken_languages.slice(0, 5).map((lang) => (
                    <span
                      key={lang.iso_639_1}
                      className="bg-[#111111] border border-white/5 text-zinc-200 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium"
                    >
                      {lang.english_name}
                    </span>
                  ))
                ) : (
                  ["English", "Hindi", "Tamil", "Telugu", "Kannada"].map((fallback) => (
                    <span
                      key={fallback}
                      className="bg-[#111111] border border-white/5 text-zinc-200 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium"
                    >
                      {fallback}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Ratings Grid Section */}
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-normal mb-3 tracking-wide">
                <Award size={14} className="text-zinc-500" />
                <span>Ratings</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#111111] border border-white/5 p-3 sm:p-4 rounded-xl">
                  <p className="text-xs sm:text-sm font-semibold text-white mb-2">IMDb</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    <div className="flex gap-0.5">
                      {renderStars(8.5)}
                    </div>
                    <span className="text-xs font-bold text-zinc-300 ml-0.5">4.5</span>
                  </div>
                </div>
                
                <div className="bg-[#111111] border border-white/5 p-3 sm:p-4 rounded-xl">
                  <p className="text-xs sm:text-sm font-semibold text-white mb-2">Streamvibe</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    <div className="flex gap-0.5">
                      {renderStars(8.0)}
                    </div>
                    <span className="text-xs font-bold text-zinc-300 ml-0.5">4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Genres Tag Cloud Container */}
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm font-normal mb-3 tracking-wide">
                <Grid size={14} className="text-zinc-500" />
                <span>Genres</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {show.genres && show.genres.length > 0 ? (
                  show.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-[#111111] border border-white/5 text-zinc-200 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium"
                    >
                      {genre.name}
                    </span>
                  ))
                ) : (
                  ["Sci-Fi TV", "Teen TV Shows", "US TV Shows"].map((fallback) => (
                    <span
                      key={fallback}
                      className="bg-[#111111] border border-white/5 text-zinc-200 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium"
                    >
                      {fallback}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Director Content Section */}
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-normal mb-2.5 tracking-wide">
                <User size={14} className="text-zinc-500" />
                <span>Director</span>
              </div>
              <div className="bg-[#111111] border border-white/5 p-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                  <img
                    src={
                      credits?.crew?.find((m) => m.job === "Director" || m.job === "Creator")?.profile_path
                        ? `${IMAGE_BASE_URL}/w185${credits.crew.find((m) => m.job === "Director" || m.job === "Creator").profile_path}`
                        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                    }
                    alt="Director"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">
                    {credits?.crew?.find((m) => m.job === "Director" || m.job === "Creator")?.name || "The Duffer Brothers"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">From USA</p>
                </div>
              </div>
            </div>

            {/* Music Content Section */}
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-normal mb-2.5 tracking-wide">
                <Music size={14} className="text-zinc-500" />
                <span>Music</span>
              </div>
              <div className="bg-[#111111] border border-white/5 p-3 rounded-xl flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                    alt="Music Composer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">
                    {credits?.crew?.find((m) => m.job === "Musical Director" || m.department === "Sound")?.name || "Kyle Dixon"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">From USA</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <FreeTrialSection />
      </div>

      <Footer />

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
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

export default ShowOpenPage;