import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching movies //////////////////////////////
////////////////////////////////////////////////////////////////////////

export const fetchTemplate = async (
  timeWindow: string = "day",
  type: string
) => {
  let url = "https://api.themoviedb.org/3";
  switch (type) {
    case "trending":
      url = `${baseUrl}/trending/movie/${timeWindow}?api_key=${apiKey}`;
      break;
    case "popular":
      url = `${baseUrl}/movie/${timeWindow}?api_key=${apiKey}`;
      break;
    case "tv":
      url = `${baseUrl}/discover/tv?api_key=${apiKey}`;
    case "now-playing":
      url = `${baseUrl}/movie/now_playing?api_key=${apiKey}`;
      break;
    case "top-rated":
      url = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
      break;
    case "upcoming":
      url = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
      break;
    default:
      `${baseUrl}/movie/${timeWindow}?api_key=${apiKey}`;
      break;
  }
  try {
    const response = await axios.get(url);
    return { data: response.data, results: response.data.results };
  } catch (error) {
    console.error(`Error fetching trending ${timeWindow} movies:`, error);
    throw error;
  }
};

export const fetchMovieIdTemplate = async (
  movieId: string | number,
  type: string
) => {
  let url = "https://api.themoviedb.org/3";
  switch (type) {
    case "movie-trailer":
      url = `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`;
      break;
    case "movie-images":
      url = `${baseUrl}/movie/${movieId}/images?api_key=${apiKey}`;
      break;
    case "movie-keywords":
      url = `${baseUrl}/movie/${movieId}/keywords?api_key=${apiKey}`;
      break;
    case "movie-media":
      url = `${baseUrl}/movie/${movieId}/external_ids?api_key=${apiKey}`;
      break;
    case "movie-by-id":
      url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
      break;
    case "movie-credits":
      url = `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`;
      break;
    default:
      url;
      break;
  }
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching movieID ${movieId} movies:`, error);
    return { results: [] };
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
        const trailersResponse = await fetchMovieTrailers(movie.id); // TODO: Update with new fetch

        // Ensure we have a results array to work with
        const trailerResults = trailersResponse?.results || [];

        // Add safety check to ensure trailerResults is an array
        if (!Array.isArray(trailerResults)) {
          console.log(
            `Trailers for movie ${movie.id} is not an array:`,
            trailersResponse
          );
          return {
            movieId: movie.id,
            title: movie.title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
            youtubeLinks: [], // Empty array if no valid trailers
          };
        }

        // Find YouTube trailers (prioritize "Trailer" type and "YouTube" site)
        const youtubeTrailers = trailerResults.filter(
          (video: any) =>
            video.site === "YouTube" && video.type.includes("Trailer")
        );

        // If no specific trailers, use any YouTube video
        const youtubeVideos = trailerResults.filter(
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
    return []; // Return empty array instead of throwing
  }
};

// Do the same for upcoming trailers
// Fix fetchUpcomingTrailers to match the fixed fetchPopularTrailers
export const fetchUpcomingTrailers = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/upcoming?api_key=${apiKey}`
    );

    const movies = response.data.results.slice(0, 4);

    const moviesWithTrailers = await Promise.all(
      movies.map(async (movie: any) => {
        const trailersResponse = await fetchMovieTrailers(movie.id);

        // Ensure we have a results array to work with
        const trailerResults = trailersResponse?.results || [];

        // Add safety check to ensure trailerResults is an array
        if (!Array.isArray(trailerResults)) {
          console.log(
            `Trailers for movie ${movie.id} is not an array:`,
            trailersResponse
          );
          return {
            movieId: movie.id,
            title: movie.title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
            youtubeLinks: [], // Empty array if no valid trailers
          };
        }

        // Find YouTube trailers (prioritize "Trailer" type and "YouTube" site)
        const youtubeTrailers = trailerResults.filter(
          (video: any) =>
            video.site === "YouTube" && video.type.includes("Trailer")
        );

        // If no specific trailers, use any YouTube video
        const youtubeVideos = trailerResults.filter(
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
    console.error("Error fetching upcoming trailers:", error);
    return []; // Return empty array instead of throwing - this was missing before
  }
};

// fetch specific movie by ID

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching TV shows //////////////////////////////
////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching Persons ///////////////////////////////
////////////////////////////////////////////////////////////////////////

export const fetchPopularPersons = async () => {
  try {
    const totalPagesToFetch = 5; // 100 persons / 20 persons per page = 5 pages
    const allResults: any[] = [];

    for (let page = 1; page <= totalPagesToFetch; page++) {
      const response = await axios.get(
        `${baseUrl}/person/popular?api_key=${apiKey}&page=${page}`
      );
      allResults.push(...response.data.results); // Combine results from each page
    }

    return allResults; // Return all 100 persons
  } catch (error) {
    console.error("Error fetching popular persons:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching Movie Reviews /////////////////////////
////////////////////////////////////////////////////////////////////////

export const fetchMovieReviews = async (movieId: number) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`
    );
    return response.data; // Return the entire response object
  } catch (error) {
    console.error("Error fetching popular persons:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching recommendations ///////////////////////
////////////////////////////////////////////////////////////////////////

export const fetchRecommendations = async (movieId: number) => {
  //TODO
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}/recommendations?api_key=${apiKey}`
    );
    return response.data; // Return the entire response object
  } catch (error) {
    console.error("Error fetching popular persons:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching social media for movie ////////////////
////////////////////////////////////////////////////////////////////////
