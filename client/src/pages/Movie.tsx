// Movie.tsx
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchMovieById, fetchMovieCredits } from "../services/api";
import SecondaryNav from "../components/movie/SecondaryNav";
import Banner from "../components/movie/Banner";
import TopCast from "../components/movie/TopCast";

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
  genres: Genre[];
  credits?: Credits; // Should be an object, not an array, and it's optional
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  runtime?: number;
  tagline: string;
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

        // Fetch credits separately
        const creditData = await fetchMovieCredits(id);

        console.log("Movie data:", movieData);
        console.log("Credit data:", creditData);

        // Create a complete movie object with credits
        const completeMovie = {
          ...movieData,
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
          <Banner movie={movie} />
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
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        {movie && <TopCast movie={movie} />}
      </Box>
    </Box>
  );
}

export default Movie;
