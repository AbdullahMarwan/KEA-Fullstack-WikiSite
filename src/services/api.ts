import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/trending/movie/day?api_key=${apiKey}`
    );
    return response.data; // Return the entire response object
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchTrailerId = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/popular?api_key=${apiKey}`
    );
    const Ids = response.data.results.slice(0, 10).map((movie: any) => movie.id); // Limit to 10 items
    const limitedResults = await Promise.all(Ids.map(async (id: number) => {
      const trailerData = await fetchTrailerMovies(id);
      const youtubeLinks = trailerData.results.map((trailer: any) => `https://www.youtube.com/watch?v=${trailer.key}`);
      return youtubeLinks;
    }));
    return { results: limitedResults.flat() }; // Flatten the array of arrays and return the modified response object
  } catch (error) {
    console.error("Error fetching trailer movies:", error);
    throw error;
  }
};

export const fetchTrailerMovies = async (id: number) => {
  try {
    
        const response = await axios.get(
          `${baseUrl}/movie/${id}/videos?api_key=${apiKey}`
        );
        console.log(response)
      return response.data; // Return the array of trailer movies data
  } catch (error) {
    console.error("Error fetching trailer movies:", error);
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
}
