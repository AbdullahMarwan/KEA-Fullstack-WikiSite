import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieById,
  fetchMovieCredits,
  fetchMediaForMovie,
  fetchMovieTrailers,
  fetchMovieImages,
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
  MovieMediaData?: MovieMediaData;
}

interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  published_at: string;
  official: boolean;
}

interface MovieMediaData {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

interface MovieContextType {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
  trailers: Trailer[];
  images: Images | null;
  videos: Trailer[]; // Add this line
  selectedTrailer: Trailer | null;
  setSelectedTrailer: (trailer: Trailer | null) => void;
  isLoadingTrailers: boolean;
  activeMediaTab: string; // Add this
  setActiveMediaTab: (tab: string) => void; // Add this
}

interface Images {
  id: number;
  backdrops: Array<{
    aspect_ratio: number;
    height: number;
    file_path: string;
    vote_average: number;
  }>;
  posters: Array<{
    aspect_ratio: number;
    height: number;
    file_path: string;
    vote_average: number;
  }>;
}

const MovieContext = createContext<MovieContextType>({
  activeMediaTab: "videos", // Provide a default value, not a type
  setActiveMediaTab: () => {}, // Provide a no-op function
  movie: null,
  loading: true,
  error: null,
  trailers: [],
  videos: [], // Add this line
  images: null,
  selectedTrailer: null,
  setSelectedTrailer: () => {},
  isLoadingTrailers: false,
});

export const useMovie = () => useContext(MovieContext);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Images | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [videos, setVideos] = useState<Trailer[]>([]);
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [isLoadingTrailers, setIsLoadingTrailers] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<string>("videos");

  // Fetch movie details and credits
  useEffect(() => {
    const getMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Fetch movie details
        const movieData = await fetchMovieById(id);

        // fetch movie images
        const movieImages = await fetchMovieImages(id);
        setImages(movieImages);

        // Fetch credits separately
        const creditData = await fetchMovieCredits(id);

        // Fetch external media links
        const movieMediaData = await fetchMediaForMovie(id);

        // Create a complete movie object with credits
        const completeMovie = {
          ...movieData,
          genres: movieData.genres ?? [],
          credits: creditData,
          MovieMediaData: movieMediaData,
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

  // Fetch trailers once we have the movie ID
  useEffect(() => {
    const getTrailers = async () => {
      if (!movie?.id) return;

      setIsLoadingTrailers(true);
      try {
        const trailerData = await fetchMovieTrailers(movie.id);

        // Make sure we're accessing the right property
        const allVideos = trailerData.results || [];

        // Filter for YouTube trailers
        const youtubeTrailers = allVideos.filter(
          (video: Trailer) =>
            video.site === "YouTube" &&
            (video.type.includes("Trailer") || video.type.includes("Teaser"))
        );

        setVideos(allVideos); // Store all videos
        setTrailers(youtubeTrailers); // Store only trailers/teasers

        // Set default trailer
        if (youtubeTrailers.length > 0) {
          setSelectedTrailer(youtubeTrailers[0]);
        }
      } catch (error) {
        console.error("Error fetching trailers:", error);
      } finally {
        setIsLoadingTrailers(false);
      }
    };

    if (movie?.id) {
      getTrailers();
    }
  }, [movie?.id]);

  return (
    <MovieContext.Provider
      value={{
        movie,
        loading,
        error,
        trailers,
        videos, // Add this line
        images,
        selectedTrailer,
        setSelectedTrailer,
        isLoadingTrailers,
        activeMediaTab,
        setActiveMediaTab,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
