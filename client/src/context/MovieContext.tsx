import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieIdTemplate,
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

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres?: Genre[];
  credits?: Credits;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
  runtime?: number;
  tagline: string;
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  MovieMediaData?: MovieMediaData;
  keywords?: {
    id: number;
    keywords: Array<{
      id: number;
      name: string;
    }>;
  };
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
  videos: Trailer[];
  keywords: Keywords | null; // Add this line
  selectedTrailer: Trailer | null;
  setSelectedTrailer: (trailer: Trailer | null) => void;
  isLoadingTrailers: boolean;
  activeMediaTab: string;
  setActiveMediaTab: (tab: string) => void;
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

interface Keywords {
  id: number;
  keywords: Array<{
    id: number;
    name: string;
  }>;
}

const MovieContext = createContext<MovieContextType>({
  activeMediaTab: "videos",
  setActiveMediaTab: () => {},
  movie: null,
  loading: true,
  error: null,
  trailers: [],
  videos: [],
  images: null,
  keywords: null,
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
  const [keywords, setKeywords] = useState<Keywords | null>(null);
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
        // Run all fetch requests in parallel
        const [
          movieData,
          movieImages,
          keywordsData,
          creditData,
          movieMediaData,
        ] = await Promise.all([
          fetchMovieIdTemplate(id, "movie-by-id"),
          fetchMovieIdTemplate(id, "movie-images"),
          fetchMovieIdTemplate(id, "movie-keywords"),
          fetchMovieIdTemplate(id, "movie-credits"),
          fetchMovieIdTemplate(id, "movie-media"),
        ]);

        setImages(movieImages);
        // Rest of your code remains the same

        const completeMovie = {
          ...movieData,
          genres: movieData.genres ?? [],
          credits: creditData,
          MovieMediaData: movieMediaData,
          keywords: keywordsData, // Add keywords to the movie object
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
        const trailerData = await fetchMovieIdTemplate(movie.id, "movie-trailer");

        // Log the response to inspect its structure
        console.log("Trailer Data:", trailerData);

        // Ensure trailerData is an array or extract the array from the response
        const allVideos = Array.isArray(trailerData)
          ? trailerData.slice(0, 4) // If it's an array, slice it
          : trailerData.results?.slice(0, 4) || []; // If it's an object, access the results property

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

  const contextValue = useMemo(
    () => ({
      movie,
      loading,
      error,
      trailers,
      videos,
      images,
      keywords,
      selectedTrailer,
      setSelectedTrailer,
      isLoadingTrailers,
      activeMediaTab,
      setActiveMediaTab,
    }),
    [
      movie,
      loading,
      error,
      trailers,
      videos,
      keywords,
      images,
      selectedTrailer,
      isLoadingTrailers,
      activeMediaTab,
    ]
  );

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
