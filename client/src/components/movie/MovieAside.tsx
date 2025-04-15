import React from "react";
import { Box, HStack, Link, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa6";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  runtime?: number;
  tagline: string;
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
}

interface MovieAsideProps {
  movie: Movie;
}

function MovieAside({ movie }: MovieAsideProps) {
  return (
    <>
      <Box
        boxSize={"100%"}
        fontSize={"1.5em"}
        display="flex"
        alignItems={"center"}
        gap={3}
      >
        <Link>
          <FaFacebook color="#272627" />
        </Link>
        <Link borderRight={"1px solid #d7d7d7"} pr={3}>
          <FaInstagram color="#272627" />
        </Link>
        <Link>
          <FaLink color="#272627" />
        </Link>
      </Box>
      <HStack
        mt={10}
        gap={3}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
      >
        <Box>
          <Text fontWeight={700}>Status</Text>
          <Text>{movie.status}</Text>
        </Box>
        <Box>
          <Text fontWeight={700}>Original Language</Text>
          <Text>{movie.original_language}</Text>
        </Box>
        <Box>
          <Text fontWeight={700}>Budget</Text>
          <Text>${movie.budget.toLocaleString("en-US")}</Text>
        </Box>
        <Box>
          <Text fontWeight={700}>Revenue</Text>
          <Text>${movie.revenue.toLocaleString("en-US")}</Text>
        </Box>
      </HStack>
    </>
  );
}

export default MovieAside;
