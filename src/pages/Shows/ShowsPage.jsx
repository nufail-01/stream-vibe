import { useState } from "react";
import Navbar from "../../features/navbar/components/Navbar";
import Footer from "../../features/footer/components/Footer";
import MoviesBanner from "../../features/movies/components/MoviesBanner";
import ToggleBar from "../../shared/components/ToggleBar";
import FreeTrialSection from "../../features/movies/components/FreeTrialSection";

// Show Components
import ShowGenreSection from "../../features/shows/components/ShowGenreSection";
import ShowTopTenSection from "../../features/shows/components/ShowTopTenSection";
import TrendingShowsSection from "../../features/shows/components/TrendingShowsSection";
import NewReleasesShowsSection from "../../features/shows/components/NewReleasesShowsSection";
import MustWatchShowsSection from "../../features/shows/components/MustWatchShowsSection";

// Movie Components
import GenresSection from "../../features/movies/components/GenresSection";
import TopTenSection from "../../features/movies/components/TopTenSection";
import TrendingSection from "../../features/movies/components/TrendingSection";
import NewReleasesSection from "../../features/movies/components/NewReleasesSection";
import MustWatchSection from "../../features/movies/components/MustWatchSection";

const ShowsPage = () => {
  const [contentType, setContentType] = useState("shows"); // ✅ Default "shows"

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <div className="pt-20">

        {/* ✅ Banner */}
        <MoviesBanner />

        {/* ✅ Toggle */}
        <ToggleBar onToggle={setContentType} defaultTab="shows" />

        {/* ✅ Badge + Border container */}
        <div className="mx-4 sm:mx-6 md:mx-12 my-10 relative">

          {/* ✅ Badge — shows ya movies */}
          <div className="absolute -top-4 left-8 z-10">
            <span className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl">
              {contentType === "shows" ? "Shows" : "Movies"}
            </span>
          </div>

          {/* ✅ Content — toggle se switch */}
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            {contentType === "shows" ? (
              <>
                <div id="genres"><ShowGenreSection /></div>
                <div id="top-ten"><ShowTopTenSection /></div>
                <div id="trending"><TrendingShowsSection /></div>
                <div id="new-release"><NewReleasesShowsSection /></div>
                <div id="popular"><MustWatchShowsSection /></div>
              </>
            ) : (
              <>
                <div id="genres"><GenresSection /></div>
                <div id="top-ten"><TopTenSection /></div>
                <div id="trending"><TrendingSection /></div>
                <div id="new-release"><NewReleasesSection /></div>
                <div id="popular"><MustWatchSection /></div>
              </>
            )}
          </div>
        </div>

        <FreeTrialSection />
      </div>
      <Footer />
    </div>
  );
};

export default ShowsPage;