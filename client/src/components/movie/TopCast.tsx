import React from "react";
import { Heading, HStack, Box, Text } from "@chakra-ui/react";
import Cards from "../Homepage/Cards";

interface Genre {
  id: number;
  name: string;
}

interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres: Genre[];
  credits?: Credits;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  runtime?: number;
  tagline: string;
}

interface TopCastProps {
  movie: Movie;
}

function TopCast({ movie }: TopCastProps) {
  // Check if movie has credits and cast
  if (
    !movie.credits ||
    !movie.credits.cast ||
    movie.credits.cast.length === 0
  ) {
    return (
      <Box maxW={"1300px"} width={"100%"} pt={"30px"} pb={"30px"}>
        <Heading size="lg" mb={4}>
          Top Billed Cast
        </Heading>
        <Text>No cast information available.</Text>
      </Box>
    );
  }

  // Transform cast data to match the format expected by Cards
  const castAsMovies = movie.credits.cast.map((person) => ({
    id: person.id,
    title: person.name,
    overview: person.character,
    poster_path: person.profile_path,
    vote_average: 0, // Not applicable for cast
    release_date: "", // Not applicable for cast
  }));

  return (
    <Box maxW={"1300px"} width={"100%"} pt={"30px"} pb={"30px"}>
      <Cards
        customData={movie.credits.cast}
        maxItems={10}
        title="Top Billed Cast"
        cardType="cast" // This is critical - make sure it's set to "cast"
        showLinkSelector={false}
      />
    </Box>
  );
}

export default TopCast;
