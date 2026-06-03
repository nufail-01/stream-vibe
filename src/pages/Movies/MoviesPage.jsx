import { useState } from "react";
import Navbar from "../../features/navbar/components/Navbar";
import Footer from "../../features/footer/components/Footer";
import MoviesBanner from "../../features/movies/components/MoviesBanner";
import ToggleBar from "../../shared/components/ToggleBar"; // Import ToggleBar

// Movie Components
import GenresSection from "../../features/movies/components/GenresSection";
import TopTenSection from "../../features/movies/components/TopTenSection";
import TrendingSection from "../../features/movies/components/TrendingSection";
import NewReleasesSection from "../../features/movies/components/NewReleasesSection";
import MustWatchSection from "../../features/movies/components/MustWatchSection";

// Show Components
import ShowGenresSection from "../../features/shows/components/ShowGenreSection";
import ShowTopTenSection from "../../features/shows/components/ShowTopTenSection";
import TrendingShowsSection from "../../features/shows/components/TrendingShowsSection";
import NewReleasesShowsSection from "../../features/shows/components/NewReleasesShowsSection";
import MustWatchShowsSection from "../../features/shows/components/MustWatchShowsSection";
import FreeTrialSection from "../../features/movies/components/FreeTrialSection";

const MoviesPage = () => {
  const [contentType, setContentType] = useState("movies"); // "movies" or "shows"

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <div className="pt-20">
        <MoviesBanner />

        {/* Toggle Bar - positioned below banner */}
        <ToggleBar onToggle={setContentType} defaultTab="movies" />

        {/* Conditionally render Movies or Shows section */}
        {contentType === "movies" ? (
          <div className="mx-6 md:mx-12 my-10 relative">
            <div className="border border-white/10 rounded-2xl overflow-hidden">
              <div id="genres">
                <GenresSection />
              </div>
              <div id="top-ten">
                <TopTenSection />
              </div>
              <div id="trending">
                <TrendingSection />
              </div>
              <div id="new-release">
                <NewReleasesSection />
              </div>
              <div id="popular">
                <MustWatchSection />
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-6 md:mx-12 my-10 relative">
            <div className="border border-white/10 rounded-2xl overflow-hidden">
              <div id="genres">
                <ShowGenresSection />
              </div>
              <div id="top-ten">
                <ShowTopTenSection />
              </div>
              <div id="trending">
                <TrendingShowsSection />
              </div>
              <div id="new-release">
                <NewReleasesShowsSection />
              </div>
              <div id="popular">
                <MustWatchShowsSection />
              </div>
            </div>
          </div>
        )}

        <FreeTrialSection />
      </div>
      <Footer />
    </div>
  );
};

export default MoviesPage;
