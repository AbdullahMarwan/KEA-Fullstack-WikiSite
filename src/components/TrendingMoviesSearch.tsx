import { Heading, ListItem, UnorderedList, Box, Link } from "@chakra-ui/react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { Link as ReactRouterLink } from "react-router-dom";
import { fetchTrendingMovies } from "../services/api";
import { useState, useEffect } from "react";

const TrendingMoviesSearch = () => {
  // Fetch trending movies data
  const [movies, setMovies] = useState<Movie[]>([]);

  interface Movie {
    id: number;
    title: string;
  }

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results); // Access the results array
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  const listMovies = movies.slice(0, 4).map((movie) => (
    <ListItem
      key={movie.id}
      listStyleType="none"
      borderTop="1px solid rgb(227, 227, 227)"
      width="100%"
      _hover={{ bg: "#dee2e6" }}
      cursor="pointer"
    >
      <Link
        as={ReactRouterLink}
        to={`/movies/${movie.id}`}
        display="flex"
        alignItems="center"
        width="100%"
        _hover={{ textDecoration: "none" }}
      >
        <Box
          display="flex"
          alignItems="center"
          maxWidth="1300px"
          width="100%"
          margin="0 auto"
          px="20px" // Add horizontal padding
          py="8px" // Add vertical padding for better clickable area
        >
          <Box
            display="flex"
            boxSize={"1.5em"}
            alignItems="center"
            justifyContent="center"
            color="grey"
            mr="10px"
          >
            <IoSearchSharp />
          </Box>
          <Box>{movie.title}</Box>
        </Box>
      </Link>
    </ListItem>
  ));

  return (
    <Box
      position="absolute"
      className="trending-movies-search-ctn"
      top="100%"
      left={0}
      zIndex={5}
      width="100%"
      bg="white"
      boxShadow="0 2px 8px rgba(0,0,0,0.1)"
    >
      {/* Trending header with full-width border */}
      <Box borderTop="1px solid rgb(227, 227, 227)" width="100%" p={"10px 0px"}>
        <Box
          display="flex"
          alignItems="center"
          maxWidth="1300px"
          margin="0 auto"
          gap="15px"
          px="20px" // Add horizontal padding
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="black"
          >
            <FaArrowTrendUp />
          </Box>
          <Heading fontSize="1.25em" fontWeight="600">
            Trending
          </Heading>
        </Box>
      </Box>

      {/* List items with full-width borders */}
      <UnorderedList marginInlineStart={0} m={0} p={0}>
        {listMovies}
      </UnorderedList>
    </Box>
  );
};

export default TrendingMoviesSearch;
