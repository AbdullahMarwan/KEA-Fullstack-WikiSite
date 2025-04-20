// Banner.tsx
import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import MovieDetails from "./MovieDetails";

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
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  runtime?: number;
  tagline: string;
}

interface BannerProps {
  movie: Movie;
}

const Banner: React.FC<BannerProps> = ({ movie }) => {
  return (
    <Box
      backgroundImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}
      backgroundSize="cover"
      backgroundPosition="left calc((50vw - 170px) - 340px) top"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"20px"}
    >
      <MovieDetails movie={movie} />
    </Box>
  );
};

export default Banner;
