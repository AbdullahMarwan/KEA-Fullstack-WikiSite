// Movie.tsx
import React, { useEffect, useState } from "react";
import { Box, HStack, Text, Link } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchMovieById, fetchMovieCredits } from "../services/api";
import SecondaryNav from "../components/movie/SecondaryNav";
import Banner from "../components/movie/Banner";
import TopCast from "../components/movie/TopCast";
import MovieAside from "../components/movie/MovieAside";

// Define the Movie interface here (you can also move it to a types file)
interface Genre {
  id: number;
  name: string;
}

interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  // Add other properties as needed
}

interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  // Add other properties as needed
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres?: Genre[];
  credits?: Credits; // Should be an object, not an array, and it's optional
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

function Movie() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credit, setCredit] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Fetch movie details
        const movieData = await fetchMovieById(id);

        console.log(movieData);

        // Fetch credits separately
        const creditData = await fetchMovieCredits(id);

        // Create a complete movie object with credits
        const completeMovie = {
          ...movieData,
          genres: movieData.genres ?? [], // Ensure genres is always an array
          credits: creditData, // Add credits to the movie object
        };

        setMovie(completeMovie);
        setError(null);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to fetch movie details");
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  return (
    <Box p="0" m="0">
      <SecondaryNav />
      {loading ? (
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <p>Loading...</p>
        </Box>
      ) : error ? (
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <p>Error: {error}</p>
        </Box>
      ) : movie ? (
        <>
          <Banner movie={{ ...movie, genres: movie.genres ?? [] }} />
        </>
      ) : (
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <p>Movie not found</p>
        </Box>
      )}

      <HStack
        spacing={4}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        pt={"30px"}
        pb={"30px"}
      >
        <Box maxW={"1300px"} width="100%">
          {" "}
          <HStack
            width="100%"
            align="flex-start"
            alignItems={"center"}
            gap={10}
          >
            {" "}
            <Box flex="8" maxW="80%">
              {" "}
              {movie && (
                <TopCast movie={{ ...movie, genres: movie.genres ?? [] }} />
              )}
            </Box>
            <Box flex="2">{movie && <MovieAside movie={movie} />}</Box>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}

export default Movie;
