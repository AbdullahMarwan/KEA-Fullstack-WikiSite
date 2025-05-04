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

////////////////////////////////////////////////////////////////////////
/////////////////////// Individual movie fetches ///////////////////////
////////////////////////////////////////////////////////////////////////

// Fetch trailers for a specific movie
export const fetchMovieTrailers = async (movieId: string | number) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    return { results: [] };
  }
};

// Fetch images for a specific movie
export const fetchMovieImages = async (movieId: string | number) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/images?api_key=${apiKey}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    return { results: [] };
  }
};

// Fetch Keywords for a specific movie
export const fetchMovieKeywords = async (movieId: string | number) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/keywords?api_key=${apiKey}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
    return { results: [] };
  }
};

// Fetch Keywords for a specific movie
export const fetchMoviePopularityChart = async (movieId: string | number) => {
  try {
    const response = await fetch(
      `${baseUrl}/movie/${movieId}/keywords?api_key=${apiKey}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
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

export const fetchMediaForMovie = async (movieId: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}/external_ids?api_key=${apiKey}`
    );
    return response.data; // Return the entire response object
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
          .map((cast: { character: string; original_title: string; release_date: string }) => ({
            type: "cast", // Add type to differentiate cast roles
            character: cast.character,
            title: cast.original_title,
            release_date: cast.release_date,
          }))
          .filter((item: { character: string; title: string }) => item.character && item.title);
    
        return cast;
      } catch (error) {
        console.error("Error fetching combined credits:", error);
        return [];
      }
    };


    
      // Fetch crew jobs
      export const fetchCrewJobs = async (personId: string) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${apiKey}`
          );
          const data = await response.json();
      
          // Process crew data
          const crew = data.crew
            .map((crew: { job: string; title: string }) => ({
              type: "crew", // Add type to differentiate crew roles
              job: crew.job,
              title: crew.title || crew.name,
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
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKey}`
      );
      const data = await response.json();
      console.log("data", data)

      return {
        name: data.name,
        profile_path: data.profile_path,
        biography: data.biography,
        known_for_department: data.known_for_department,
        gender: data.gender,
        birthday: data.birthday,
        place_of_birth: data.place_of_birth,
      };
    } catch (error) {
      console.error("Error fetching person details:", error);
      return null;
    }
  };
