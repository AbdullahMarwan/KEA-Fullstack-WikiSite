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


export const fetchTrailerMovies = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/popular?api_key=${apiKey}`
    );
    console.log(response.data)
    return response.data; // Return the entire response object
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