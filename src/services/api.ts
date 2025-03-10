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
