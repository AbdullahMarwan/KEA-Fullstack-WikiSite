import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3"; // Add this
const apiKey = import.meta.env.VITE_API_KEY; // Add this

////////////////////////////////////////////////////////////////////////
/////////////////////// Fetching movies //////////////////////////////
////////////////////////////////////////////////////////////////////////

export const fetchTemplate = async (
  category: string = "popular", // Default to "popular"
  type: string = "movie", // Default to "movie"
  timeWindow: string = "day" // Default to "day"
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
    console.error(`Error fetching ${type} ${category}:`, error);
    throw error;
  }
};

export const fetchMovieIdTemplate = async (
  id: string | number,
  type: string,
  mediaType: "movie" | "tv" = "movie" // new parameter, defaults to "movie"
) => {
  let url = "https://api.themoviedb.org/3";
  switch (type) {
    case "trailer":
      url = `${baseUrl}/${mediaType}/${id}/videos?api_key=${apiKey}`;
      break;
    case "images":
      url = `${baseUrl}/${mediaType}/${id}/images?api_key=${apiKey}`;
      break;
    case "keywords":
      url = `${baseUrl}/${mediaType}/${id}/keywords?api_key=${apiKey}`;
      break;
    case "media":
      url = `${baseUrl}/${mediaType}/${id}/external_ids?api_key=${apiKey}`;
      break;
    case "by-id":
      url = `${baseUrl}/${mediaType}/${id}?api_key=${apiKey}`;
      break;
    case "credits":
      url = `${baseUrl}/${mediaType}/${id}/credits?api_key=${apiKey}`;
      break;
    case "review":
      url = `${baseUrl}/${mediaType}/${id}/reviews?api_key=${apiKey}`;
      break;
    case "recommendations":
      url = `${baseUrl}/${mediaType}/${id}/recommendations?api_key=${apiKey}`;
      break;
    default:
      break;
  }
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return { results: [] };
  }
};

// Updated version of fetchPopularTrailers with actual YouTube links
export const fetchTrailerTemplate = async (type: string) => {
  let url = "https://api.themoviedb.org/3";
  switch (type) {
    case "popular-trailer":
      url = `${baseUrl}/movie/popular?api_key=${apiKey}`;
      break;
    case "upcoming-trailer":
      url = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
      break;
    default:
      url;
      break;
  }
  try {
    // First get popular movies
    const response = await axios.get(url);

    const movies = response.data.results.slice(0, 4); // Limit to 4 movies for performance

    // For each movie, fetch its trailers
    const moviesWithTrailers = await Promise.all(
      movies.map(async (movie: any) => {
        const trailersResponse = await fetchMovieIdTemplate(
          movie.id,
          "movie-trailer"
        ); // TODO: Update with new fetch

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
/////////////////////// Fetching person details ////////////////
////////////////////////////////////////////////////////////////////////

// Fetch credits
export const fetchCredits = async (personId: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}`
    );
    const data = await response.json();
    return data.cast
      .map((item: { original_title: string; backdrop_path: string }) => ({
        original_title: item.original_title,
        backdrop_path: item.backdrop_path,
      }))
      .filter((item) => item.original_title);
  } catch (error) {
    console.error("Error fetching credits:", error);
    return [];
  }
};

// Fetch combined credits
export const fetchCombinedCredits = async (personId: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}`
    );
    const data = await response.json();

    // Process cast data
    const cast = data.cast
      .map(
        (cast: {
          character: string;
          original_title: string;
          release_date: string;
        }) => ({
          type: "cast", // Add type to differentiate cast roles
          character: cast.character,
          title: cast.original_title,
          release_date: cast.release_date,
        })
      )
      .filter(
        (item: { character: string; title: string }) =>
          item.character && item.title
      );

    return cast;
  } catch (error) {
    console.error("Error fetching combined credits:", error);
    return [];
  }
};

// Fetch crew jobs
export const fetchCrewJobs = async (personId: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}`
    );

    console.log("testing", response.data.crew);
    // Process crew data
    const crew = response.data.crew
      .map((crew: { job: string; title: string }) => ({
        type: "crew", // Add type to differentiate crew roles
        job: crew.job,
        title: crew.title || response.data.crew.name,
      }))
      .filter((crew: { job: string }) => crew.job);

    return crew;
  } catch (error) {
    console.error("Error fetching crew jobs:", error);
    return [];
  }
};

// Fetch person details
export const fetchPersonDetails = async (personId: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/person/${personId}?api_key=${apiKey}`
    );
    return response.data; // Return the entire response object like fetchRecommendations
  } catch (error) {
    console.error(`Error fetching person details for ID ${personId}:`, error);
    throw error; // Throw the error to handle it in the calling function
  }
};
