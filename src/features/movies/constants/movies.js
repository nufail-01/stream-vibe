const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

// Cache object to store fetched data
const cache = new Map();

export const fetchMovies = async (category = "trending", type = "movie") => {
  const cacheKey = `${category}-${type}`;
  
  // Return cached data if available
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  try {
    let endpoint = "";
    
    switch(category) {
      case "trending":
        endpoint = `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`;
        break;
      case "popular":
        endpoint = `${BASE_URL}/${type}/popular?api_key=${API_KEY}`;
        break;
      case "top_rated":
        endpoint = `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}`;
        break;
      case "now_playing":
        endpoint = `${BASE_URL}/${type}/now_playing?api_key=${API_KEY}`;
        break;
      case "upcoming":
        endpoint = `${BASE_URL}/${type}/upcoming?api_key=${API_KEY}`;
        break;
      default:
        endpoint = `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`;
    }
    
    const response = await fetch(endpoint);
    const data = await response.json();
    
    // Ensure data.results is an array
    const results = Array.isArray(data?.results) ? data.results : [];
    // Store in cache
    cache.set(cacheKey, results);
    
    return results;
  } catch (error) {
    console.error("TMDB fetch error:", error);
    return [];
  }
};

export const getMoviePoster = (posterPath) => {
  if (!posterPath) return "https://picsum.photos/seed/fallback/200/300";
  return `${IMAGE_BASE_URL}${posterPath}`;
};