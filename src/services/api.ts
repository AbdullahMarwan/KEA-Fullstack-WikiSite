import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching movies //////////////////////////////
////////////////////////////////////////////////////////////////////////

// Fetching Trending movies - for both day and week
export const fetchTrendingMovies = async (timeWindow: string = "day") => {
  try {
    const response = await axios.get(
      `${baseUrl}/trending/movie/${timeWindow}?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error(`Error fetching trending ${timeWindow} movies:`, error);
    throw error;
  }
};

// fetching popular movies

export const fetchPopularMovies = async (timeWindow: string = "popular") => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${timeWindow}?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// Fetching movies with trailers

export const fetchTrailerMovies = async () => {
  try {
    const trendingMovies = await fetchTrendingMovies();
    const popularMovies = await fetchPopularMovies();
    const trailerMoviesData = await Promise.all(
      trendingMovies.results.slice(0, 4).map(async (movie: any) => {
        const response = await axios.get(
          `${baseUrl}/movie/${movie.id}/videos?api_key=${apiKey}`
        );
        const youtubeLinks = response.data.results
          .filter((result: any) => result.type === "Trailer")
          .map(
            (result: any) => `https://www.youtube.com/watch?v=${result.key}`
          );
        return { movieId: movie.id, youtubeLinks };
      })
    );
    return trailerMoviesData; // Return the array of trailer movies data for each movie ID
  } catch (error) {
    console.error("Error fetching trailer movies:", error);
    throw error;
  }
};

// Fetching streamable movies

export const fetchStreamingMovies = async () => {
  try {
    const response = await axios.get(
      `
      ${baseUrl}/discover/movie?sort_by=popularity.desc&watch_region=US&with_watch_monetization_types=flatrate?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching TV shows //////////////////////////////
////////////////////////////////////////////////////////////////////////

export const fetchTvShows = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/discover/tv?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// Fetching Trending movies - for both day and week
export const fetchPopularTvSeries = async (category: string = "popular") => {
  // Validate the category to ensure it's one of the allowed options
  const validCategories = ["popular", "top_rated", "airing_today"];
  const endpoint = validCategories.includes(category) ? category : "popular";

  try {
    const response = await axios.get(
      `${baseUrl}/tv/${endpoint}?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error(`Error fetching TV shows for category ${category}:`, error);
    throw error;
  }
};
