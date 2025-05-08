import { fetchMovieIdTemplate } from "../../services/api";
import { useMovie } from "../../context/MovieContext";
import React, { useState, useEffect } from "react";
import Cards from "../Homepage/Cards";
import { Heading, Box } from "@chakra-ui/react";

function Recommendations() {
  const { movie } = useMovie();
  const [isLoading, setIsLoading] = useState(true);

  const getRecommendations = async () => {
    if (!movie?.id) return;
    try {
      const response = await fetchMovieIdTemplate(movie.id, "movie-recommendations");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, [movie?.id]);

  return (
    <>
      <Box mt={10} borderTop="1px solid #d7d7d7" pt={10} width="100%">
        <Heading fontSize="1.75em" fontWeight={600}>
          Recommendations
        </Heading>
        {isLoading ? (
          <p>Loading recommendations...</p>
        ) : movie ? (
          <Cards
            fetchFunction={() => fetchMovieIdTemplate(movie.id, "movie-recommendations")}
            movieId={movie.id}
            cardType="recommendations"
          />
        ) : null}
      </Box>
    </>
  );
}

export default Recommendations;
