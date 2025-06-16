import { fetchMovieIdTemplate } from "../../services/api";
import { useMovie } from "../../context/MovieContext";
import React, { useState, useEffect } from "react";
import Cards from "../Homepage/Cards";
import { Heading, Box } from "@chakra-ui/react";

function Recommendations() {
  const { movie, mediaType } = useMovie(); // Get mediaType from context
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]); // State to store the recommendations array

  const getRecommendations = async () => {
    if (!movie?.id) return;

    setIsLoading(true);
    try {
      // Use the correct parameter name and pass the mediaType
      const response = await fetchMovieIdTemplate(
        movie.id,
        "recommendations", // Changed from "movie-recommendations"
        mediaType // Pass the media type (movie or tv)
      );

      if (response && response.results) {
        setMovies(response.results);
      } else {
        console.error(
          "No recommendations found or invalid response format",
          response
        );
        setMovies([]);
      }
    } catch (error) {
      console.error(`Error fetching ${mediaType} recommendations:`, error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, [movie?.id, mediaType]); // Add mediaType as dependency

  return (
    <>
      <Box mt={10} borderTop="1px solid #d7d7d7" pt={10} width="100%">
        <Heading fontSize="1.75em" fontWeight={600}>
          Recommendations
        </Heading>
        {isLoading ? (
          <p>Loading recommendations...</p>
        ) : movies.length > 0 ? (
          <Cards
            customData={movies}
            movieId={movie?.id}
            maxItems={4}
            cardType="recommendations"
          />
        ) : (
          <p>No recommendations available</p>
        )}
      </Box>
    </>
  );
}

export default Recommendations;
