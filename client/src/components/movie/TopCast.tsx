import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import Cards from "../Homepage/Cards";
import { useMovie } from "../../context/MovieContext";

const TopCast = () => {
  const { movie, loading, error } = useMovie();

  if (loading) {
    return <Box>Loading...</Box>; // Show a loading state
  }

  if (error) {
    return <Box>Error: {error}</Box>; // Show an error state
  }

  if (
    !movie ||
    !movie.credits ||
    !movie.credits.cast ||
    movie.credits.cast.length === 0
  ) {
    return (
      <Box width="100%">
        <Heading size="lg" mb={4}>
          Top Billed Cast
        </Heading>
        <Box>No cast information available.</Box>
      </Box>
    );
  }

  return (
    <Box width="100%">
      <Heading size="lg" mb={4}>
        Top Billed Cast
      </Heading>
      <Cards
        customData={movie.credits.cast} // Use cast data from MovieContext
        maxItems={10}
        cardType="cast"
        showLinkSelector={false}
        cardSize="small"
      />
    </Box>
  );
};

export default TopCast;
