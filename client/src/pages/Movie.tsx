import { Box, HStack, Link } from "@chakra-ui/react";
import SecondaryNav from "../components/movie/SecondaryNav";
import Banner from "../components/movie/Banner";
import TopCast from "../components/movie/TopCast";
import MovieAside from "../components/movie/MovieAside";
import SocialCtn from "../components/movie/SocialCtn";
import Media from "../components/movie/Media";
import { MovieProvider, useMovie } from "../context/MovieContext";
import Recommendations from "../components/movie/Recommendations";

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
    
    <Box 
    maxWidth={"100vw"}
    overflow={"scroll"}
    >
      
      <Banner movie={{ ...movie, genres: movie.genres || [] }} />

      <HStack
        spacing={4}
        width="100%"
        display="flex"
        justifyContent="center"
        pt="30px"
        pb="30px"
      >
        <Box width="100%">
          <HStack 
          maxWidth={{ sm:"90%", base: "100%"}} 
          margin={{ sm:"1em", base: "none"}} 
          align="flex-start" spacing={10}>
            <Box flex="7" width="70%">
              <TopCast />
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
              <Recommendations />
            </Box>
            <Box
              flex="3"
              width="30%"
              display={{ sm: "none", md:"block", base: "block" }}
            >
              <MovieAside
              movie={movie}
              movieMediaData={movie.MovieMediaData} // Pass movieMediaData to MovieAside
              />
            </Box>
          </HStack>
        </Box>
      </HStack>
      </Box>
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
