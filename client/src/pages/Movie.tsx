import { Box, HStack, Link } from "@chakra-ui/react";
import SecondaryNav from "../components/movie/SecondaryNav";
import Banner from "../components/movie/Banner";
import TopCast from "../components/movie/TopCast";
import MovieAside from "../components/movie/MovieAside";
import SocialCtn from "../components/movie/SocialCtn";
import Media from "../components/movie/Media";
import { MovieProvider, useMovie } from "../context/MovieContext";

function MovieContent() {
  const { movie, loading, error } = useMovie();

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p>Loading...</p>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p>Error: {error}</p>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <p>Movie not found</p>
      </Box>
    );
  }

  return (
    <>
      <Banner movie={{ ...movie, genres: movie.genres || [] }} />

      <HStack
        spacing={4}
        width="100%"
        display="flex"
        justifyContent="center"
        pt="30px"
        pb="30px"
      >
        <Box maxW="1300px" width="100%">
          <HStack width="100%" align="flex-start" spacing={10}>
            <Box flex="7" width="70%">
              <TopCast movie={{ ...movie, genres: movie.genres || [] }} />
              <Link
                fontWeight={700}
                _hover={{ textDecoration: "none" }}
                mt={4}
                display="block"
              >
                Full Cast & Crew
              </Link>
              <SocialCtn />
              <Media />
            </Box>
            <Box flex="3" width="30%">
              <MovieAside movie={movie} />
            </Box>
          </HStack>
        </Box>
      </HStack>
    </>
  );
}

function Movie() {
  return (
    <MovieProvider>
      <Box p="0" m="0">
        <SecondaryNav />
        <MovieContent />
      </Box>
    </MovieProvider>
  );
}

export default Movie;
