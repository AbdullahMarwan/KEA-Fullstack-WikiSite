// MovieDetails.tsx
import React from "react";
import {
  HStack,
  Box,
  Image,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import VoteAverageRing from "../Homepage/voteAverageRing";
import ToolTips from "./ToolTips";
import Credits from "./Credits";
import Emoji from "./Emoji";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres: Genre[];
  credits?: Credits; // Should be an object, not an array, and it's optional
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  runtime?: number;
  tagline: string;
}

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <HStack
      width="90%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      columnGap={10}
      maxW="1300px"
      flexDirection={{ base: "column", md: "row" }}
      alignItems={{ base: "stretch", md: "center" }}
    >
      <Image
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      height={{ base: "auto", md: "500px" }}
      maxW={{ base: "100%", md: "unset" }}
      borderRadius="10px"
      objectFit="cover"
      mb={{ base: 4, md: 0 }}
      />
      <Box
      color="white"
      height="100%"
      width="100%"
      display="flex"
      alignItems="space-around"
      flexDirection="column"
      gap={5}
      >
      <Heading>
        {movie.title}{" "}
        <Box as="span" fontWeight="400" color="gray.300">
        ({new Date(movie.release_date).getFullYear()})
        </Box>
      </Heading>
      <Box as="span" fontWeight="400" color="gray.400">
        {movie.release_date}
        <Box as="span" mx={2}>
        •
        </Box>
        {movie.genres.map((genre) => genre.name).join(", ")}
        <Box as="span" mx={2}>
        •
        </Box>
        {movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : ""}
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <VoteAverageRing
        radius={50}
        stroke={4}
        progress={Math.round(movie.vote_average * 10)}
        />
        <Text fontWeight="700" ml={2}>
        User Score
        </Text>
        <Emoji />
        <Button
        background="#022441"
        ml={4}
        color="white"
        _hover={{
          transform: "scale(1.05)",
          transition: "transform 0.2s ease-in-out",
        }}
        >
        What's your vibe?
        </Button>
      </Box>
      <ToolTips />
      <Text fontSize="lg" fontStyle="italic" color="gray.300">
        {movie.tagline}
      </Text>
      <Box>
        <Heading fontSize="1.5em" fontWeight={600}>
        Overview
        </Heading>
        <Text fontSize="lg" fontStyle="italic" color="gray.300">
        {movie.overview}
        </Text>
      </Box>
      <Credits movie={movie} />
      </Box>
    </HStack>
  );
};

export default MovieDetails;
