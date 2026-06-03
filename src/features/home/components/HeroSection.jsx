import MovieGrid from "../../movies/components/MovieGrid";
import Button from "../../../shared/components/Button";
import StreamVibeLogo from "../../../assets/icons/hero-icon.svg?react";

const CenterPlayButton = () => (
  <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-10">
    <StreamVibeLogo className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48" />
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* ── Background: Movie grid mosaic ── */}
      <MovieGrid />

      {/* ── Dark gradient overlays for readability ── */}
      {/* Top fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/60 via-transparent to-transparent pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent pointer-events-none" />

      {/* Center vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_60%_50%_at_50%_50%] from-[#141414]/30 to-transparent pointer-events-none" />
      {/* ── Foreground content ── */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen pb-10 sm:pb-16 md:pb-20 px-4 sm:px-6 text-center">
        <div className="w-full max-w-7xl mx-auto">
        {/* Center play button */}
        <CenterPlayButton />

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight">
          The Best Streaming Experience
        </h1>

        {/* Subtext */}
        <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-3xl sm:max-w-4xl md:max-w-6xl leading-relaxed mb-6 sm:mb-8 md:mb-10 px-2">
          StreamVibe is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere. With StreamVibe, you
          can enjoy a wide variety of content, including the latest
          blockbusters, classic movies, popular TV shows, and more. You can also
          create your own watchlists, so you can easily find the content you
          want to watch.
        </p>

        {/* CTA Button */}
        <Button variant="primary">Start Watching Now</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

