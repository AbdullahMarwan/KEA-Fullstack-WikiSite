import React, { useState, useEffect } from "react";
import { Input, Button, HStack, Box } from "@chakra-ui/react";
import { MAX_WIDTH } from "../utils/constants";
import { fetchTrendingMovies } from "../services/api";

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
}

const SearchMovieSection = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRandomBackdrop = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        // Get a random movie from the results that has a backdrop image
        const movies = data.results.filter(
          (movie: Movie) => movie.backdrop_path
        );
        const randomIndex = Math.floor(Math.random() * movies.length);
        setRandomMovie(movies[randomIndex]);
      } catch (error) {
        console.error("Error fetching movie backdrop:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRandomBackdrop();
  }, []);

  // Build the full image URL - backdrop images usually look better for hero sections
  const backdropUrl = randomMovie
    ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
    : "";

  return (
    <Box
      as="section"
      width="100%"
      height="35vh" // Maintain a 16:9 aspect ratio with width
      position="relative"
      display="flex"
      alignItems="center"
      flexDirection="column"
      padding="20px"
      backgroundImage={isLoading ? "none" : `url(${backdropUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(rgba(3, 36, 64, 0.8), rgba(3, 36, 64, 0.8))",
        zIndex: 1,
      }}
    >
      <HStack
        maxWidth={MAX_WIDTH}
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        height="100%"
        width="100%"
        position="relative"
        zIndex={2} // Make content appear above the overlay
      >
        <HStack
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          w="100%"
        >
          <h2
            style={{
              fontSize: "3em",
              color: "white",
              fontWeight: "700",
              textAlign: "left",
            }}
          >
            Velkommen.
          </h2>
          <h3
            style={{
              fontSize: "2em",
              color: "white",
              fontWeight: "500",
              lineHeight: "1",
            }}
          >
            Millioner af film, TV-serier og personer at opdage. Udforsk nu.
          </h3>
        </HStack>
        <HStack
          width="100%"
          justifyContent="center"
          bg="white"
          height="50px"
          borderRadius="50px"
          padding={0}
        >
          <Input
            placeholder="Søg efter en film, TV-serie, person..."
            color="grey"
            _placeholder={{ color: "gray.500" }}
            height="100%"
            borderRadius="50px 0 0 50px"
            border="none"
            _focus={{ boxShadow: "none" }}
          />
          <Button
            bgGradient="linear(to-r, rgba(30, 213, 169, 1), rgba(1, 180, 228, 1))"
            color="white"
            height="100%"
            width="100px"
            fontWeight="400"
            borderRadius="0 50px 50px 0"
            _hover={{
              bgGradient:
                "linear(to-r, rgba(30, 213, 169, 0.8), rgba(1, 180, 228, 0.8))",
            }}
          >
            Søg
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default SearchMovieSection;
