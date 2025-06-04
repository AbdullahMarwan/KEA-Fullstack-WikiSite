import axios from "axios";

// Constants
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";
const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper function for error handling
const handleApiError = (error: any, message: string) => {
  console.error(message, error);
  throw error;
};

// Type definitions
export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Favorite {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  content_type: string;
}

// ============ AUTH ENDPOINTS ============
export const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${serverUrl}/api/users/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      handleApiError(error, "Login failed");
      return { error: true, message: "Invalid credentials" };
    }
  },

  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(`${serverUrl}/api/users/register`, {
        username: firstName, // Using firstName as username for now
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      handleApiError(error, "Registration failed");
      return { error: true, message: "Registration failed" };
    }
  },
};

// ============ USER ENDPOINTS ============
export const userApi = {
  getFavorites: async (userId: number) => {
    try {
      const response = await axios.get(`${serverUrl}/api/favorites/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch favorites");
      return [];
    }
  },

  addFavorite: async (userId: number, contentId: number) => {
    try {
      const response = await axios.post(`${serverUrl}/api/favorites`, {
        user_id: userId,
        content_id: contentId,
      });
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to add favorite");
      return { success: false };
    }
  },

  removeFavorite: async (userId: number, contentId: number) => {
    try {
      const response = await axios.delete(
        `${serverUrl}/api/favorites/${userId}/${contentId}`
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to remove favorite");
      return { success: false };
    }
  },
};

// ============ TMDB ENDPOINTS ============
export const tmdbApi = {
  // Movies and TV shows
  fetchContent: async (
    category: string = "popular",
    type: string = "movie",
    timeWindow: string = "day"
  ) => {
    let url = "";

    // Construct the URL based on the type and category
    switch (type) {
      case "movie":
        switch (category) {
          case "trending":
            url = `${baseUrl}/trending/movie/${timeWindow}?api_key=${apiKey}`;
            break;
          case "popular":
            url = `${baseUrl}/movie/popular?api_key=${apiKey}`;
            break;
          case "now-playing":
            url = `${baseUrl}/movie/now_playing?api_key=${apiKey}`;
            break;
          case "upcoming":
            url = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
            break;
          case "top-rated":
            url = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
            break;
          default:
            throw new Error(`Invalid movie category: ${category}`);
        }
        break;

      case "tv":
        switch (category) {
          case "popular":
            url = `${baseUrl}/tv/popular?api_key=${apiKey}`;
            break;
          case "airing-today":
            url = `${baseUrl}/tv/airing_today?api_key=${apiKey}`;
            break;
          case "on-the-air":
            url = `${baseUrl}/tv/on_the_air?api_key=${apiKey}`;
            break;
          case "top-rated":
            url = `${baseUrl}/tv/top_rated?api_key=${apiKey}`;
            break;
          default:
            throw new Error(`Invalid TV category: ${category}`);
        }
        break;

      default:
        throw new Error(`Invalid type: ${type}`);
    }

    try {
      const response = await axios.get(url);
      const results = Array.isArray(response.data?.results)
        ? response.data.results
        : [];
      return { data: response.data, results };
    } catch (error) {
      handleApiError(error, `Error fetching ${type} ${category}`);
      return { data: {}, results: [] };
    }
  },

  // Get details for a movie/TV show by ID
  fetchContentDetails: async (
    id: string | number,
    mediaType: "movie" | "tv" = "movie"
  ) => {
    try {
      const detailsPromise = axios.get(
        `${baseUrl}/${mediaType}/${id}?api_key=${apiKey}`
      );

      const creditsPromise = axios.get(
        `${baseUrl}/${mediaType}/${id}/credits?api_key=${apiKey}`
      );

      const imagesPromise = axios.get(
        `${baseUrl}/${mediaType}/${id}/images?api_key=${apiKey}`
      );

      const videosPromise = axios.get(
        `${baseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}`
      );

      const keywordsPromise = axios.get(
        `${baseUrl}/${mediaType}/${id}/keywords?api_key=${apiKey}`
      );

      const externalIdsPromise = axios.get(
        `${baseUrl}/${mediaType}/${id}/external_ids?api_key=${apiKey}`
      );

      const recommendationsPromise = axios.get(
        `${baseUrl}/${mediaType}/${id}/recommendations?api_key=${apiKey}`
      );

      const [
        details,
        credits,
        images,
        videos,
        keywords,
        externalIds,
        recommendations,
      ] = await Promise.all([
        detailsPromise,
        creditsPromise,
        imagesPromise,
        videosPromise,
        keywordsPromise,
        externalIdsPromise,
        recommendationsPromise,
      ]);

      return {
        ...details.data,
        credits: credits.data,
        images: images.data,
        videos: videos.data,
        keywords: keywords.data,
        externalIds: externalIds.data,
        recommendations: recommendations.data,
      };
    } catch (error) {
      handleApiError(error, `Error fetching ${mediaType} details for ID ${id}`);
      return null;
    }
  },

  // Person endpoints
  fetchPopularPersons: async (page = 1) => {
    try {
      const response = await axios.get(
        `${baseUrl}/person/popular?api_key=${apiKey}&page=${page}`
      );
      return response.data.results;
    } catch (error) {
      handleApiError(error, "Error fetching popular persons");
      return [];
    }
  },

  fetchPersonDetails: async (personId: string) => {
    try {
      const detailsPromise = axios.get(
        `${baseUrl}/person/${personId}?api_key=${apiKey}`
      );

      const combinedCreditsPromise = axios.get(
        `${baseUrl}/person/${personId}/combined_credits?api_key=${apiKey}`
      );

      const [details, combinedCredits] = await Promise.all([
        detailsPromise,
        combinedCreditsPromise,
      ]);

      return {
        ...details.data,
        credits: combinedCredits.data,
      };
    } catch (error) {
      handleApiError(error, `Error fetching person details for ID ${personId}`);
      return null;
    }
  },

  // Search endpoints
  search: async (query: string, page = 1) => {
    try {
      const response = await axios.get(
        `${baseUrl}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}&page=${page}`
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Error searching");
      return { results: [] };
    }
  },

  // Trailers
  fetchTrailers: async (type: "popular" | "upcoming" = "popular") => {
    let url = `${baseUrl}/movie/${type}?api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const movies = response.data.results.slice(0, 4);

      const moviesWithTrailers = await Promise.all(
        movies.map(async (movie: any) => {
          const trailersResponse = await axios.get(
            `${baseUrl}/movie/${movie.id}/videos?api_key=${apiKey}`
          );

          const trailerResults = trailersResponse.data?.results || [];

          // Find YouTube trailers
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
      handleApiError(error, `Error fetching ${type} trailers`);
      return [];
    }
  },
};

// Export a default unified API object
export default {
  auth: authApi,
  user: userApi,
  tmdb: tmdbApi,
};
