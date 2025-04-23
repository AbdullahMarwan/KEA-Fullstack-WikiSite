// src/contexts/MovieContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieById,
  fetchMovieCredits,
  fetchMediaForMovie,
} from "../services/api";

// Define your interfaces
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
  genres?: Genre[];
  credits?: Credits;
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

interface MovieContextType {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

interface TopCastProps {
  movie: Movie;
}

interface MovieMediaData {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

const MovieContext = createContext<MovieContextType>({
  movie: null,
  loading: true,
  error: null,
});

export const useMovie = () => useContext(MovieContext);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
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

        const movieMediaData = await fetchMediaForMovie(id);

        // Create a complete movie object with credits
        const completeMovie = {
          ...movieData,
          genres: movieData.genres ?? [],
          credits: creditData,
          MovieMediaData: movieMediaData, // Ensure this is populated
        };

        console.log("complete movie:" + completeMovie);

        console.log("Fetched movie data:", completeMovie); // Debug log
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
    <MovieContext.Provider value={{ movie, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
};
