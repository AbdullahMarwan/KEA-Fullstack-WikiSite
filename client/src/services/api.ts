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
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// Fetch trailers for a specific movie
export const fetchMovieTrailers = async (movieId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching trailers for movie ${movieId}:`, error);
    return [];
  }
};

// Updated version of fetchPopularTrailers with actual YouTube links
export const fetchPopularTrailers = async () => {
  try {
    // First get popular movies
    const response = await axios.get(
      `${baseUrl}/movie/popular?api_key=${apiKey}`
    );

    const movies = response.data.results.slice(0, 4); // Limit to 4 movies for performance

    // For each movie, fetch its trailers
    const moviesWithTrailers = await Promise.all(
      movies.map(async (movie: any) => {
        const trailers = await fetchMovieTrailers(movie.id);

        // Find YouTube trailers (prioritize "Trailer" type and "YouTube" site)
        const youtubeTrailers = trailers.filter(
          (video: any) =>
            video.site === "YouTube" && video.type.includes("Trailer")
        );

        // If no specific trailers, use any YouTube video
        const youtubeVideos = trailers.filter(
          (video: any) => video.site === "YouTube"
        );

        // Format YouTube links
        const youtubeLinks = (
          youtubeTrailers.length > 0 ? youtubeTrailers : youtubeVideos
        ).map((video: any) => `https://www.youtube.com/watch?v=${video.key}`);

        return {
          movieId: movie.id,
          title: movie.title,
          overview: movie.overview,
          backdrop_path: movie.backdrop_path,
          poster_path: movie.poster_path,
          youtubeLinks: youtubeLinks,
        };
      })
    );

    return moviesWithTrailers;
  } catch (error) {
    console.error("Error fetching popular trailers:", error);
    throw error;
  }
};

// Do the same for upcoming trailers
export const fetchUpcomingTrailers = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/upcoming?api_key=${apiKey}`
    );

    const movies = response.data.results.slice(0, 4);

    const moviesWithTrailers = await Promise.all(
      movies.map(async (movie: any) => {
        const trailers = await fetchMovieTrailers(movie.id);

        const youtubeTrailers = trailers.filter(
          (video: any) =>
            video.site === "YouTube" && video.type.includes("Trailer")
        );

        const youtubeVideos = trailers.filter(
          (video: any) => video.site === "YouTube"
        );

        const youtubeLinks = (
          youtubeTrailers.length > 0 ? youtubeTrailers : youtubeVideos
        ).map((video: any) => `https://www.youtube.com/watch?v=${video.key}`);

        return {
          movieId: movie.id,
          title: movie.title,
          overview: movie.overview,
          backdrop_path: movie.backdrop_path,
          poster_path: movie.poster_path,
          youtubeLinks: youtubeLinks,
        };
      })
    );

    return moviesWithTrailers;
  } catch (error) {
    console.error("Error fetching upcoming trailers:", error);
    throw error;
  }
};

// Fetching now playing movies
export const fetchNowPlayingMovies = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/now_playing?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

// Fetching top rated movies
export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/top_rated?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

// Fetching upcoming movies
export const fetchUpcomingMovies = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/upcoming?api_key=${apiKey}`
    );
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

// fetch specific movie by ID

// In your api.ts file
export const fetchMovieById = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${movieId}:`, error);
    throw error;
  }
};

// fetch specific movie by ID

// In your api.ts file
export const fetchMovieCredits = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${movieId}:`, error);
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

export const fetchPopularPersons = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/trending/person/day?api_key=${apiKey}`
    );
    return response.data; // Return the entire response object
  } catch (error) {
    console.error("Error fetching popular persons:", error);
    throw error;
  }
};
