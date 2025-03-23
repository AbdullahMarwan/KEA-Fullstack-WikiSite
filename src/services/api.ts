import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/trending/movie/day?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchTrailerMovies = async () => {
  try {
    const trendingMovies = await fetchTrendingMovies();
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
