// const FreeTrialSection = () => {
//     return (
//       <section className="bg-[#141414] px-6 md:px-12 pb-24">

//         {/* CTA Container — movie posters background ke saath */}
//         <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[220px] flex items-center">

//           {/* Background — movie posters mosaic */}
//           <div className="absolute inset-0 grid grid-cols-6 opacity-40">
//             {Array.from({ length: 18 }).map((_, idx) => (
//               <img
//                 key={idx}
//                 src={`https://picsum.photos/seed/trial${idx}/200/300`}
//                 alt=""
//                 className="w-full h-full object-cover"
//               />
//             ))}
//           </div>

//           {/* Red gradient overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-900/40 to-transparent" />

//           {/* Dark overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

//           {/* Content */}
//           <div className="relative z-10 flex items-center justify-between w-full px-10 py-10">
//             <div>
//               <h3 className="text-white font-bold text-2xl md:text-3xl mb-2">
//                 Start your free trial today!
//               </h3>
//               <p className="text-white/60 text-sm max-w-lg">
//                 This is a clear and concise call to action that encourages users
//                 to sign up for a free trial of StreamVibe.
//               </p>
//             </div>

//             <button className="shrink-0 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer">
//               Start a Free Trial
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   };

//   export default FreeTrialSection;

// rough




import { useEffect, useState } from "react";
import { fetchMovies, getMoviePoster } from "../../movies/constants/movies";

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
    <section className="bg-[#141414] px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[280px] sm:min-h-[320px] md:min-h-[360px] flex items-center">

        {/* TMDB Poster Mosaic Background */}
        <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 opacity-30">
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
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
          <div className="flex-1">
            <h3 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3">
              Start your free trial today!
            </h3>

            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed">
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
          </div>

          <button className="shrink-0 bg-red-600 hover:bg-red-500 text-white font-semibold px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 transform text-sm sm:text-base whitespace-nowrap">
            Start a Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;