import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchMovieIdTemplate } from "../services/api";

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

// Add TV interface
export interface TvShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  genres?: Genre[];
  credits?: Credits;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
  number_of_seasons: number;
  number_of_episodes: number;
  tagline: string;
  status: string;
  original_language: string;
  TvMediaData?: MovieMediaData; // Reusing the same interface
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
  movie: Movie | TvShow | null;
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
  mediaType: "movie" | "tv";
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

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovie = () => useContext(MovieContext);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [movie, setMovie] = useState<Movie | TvShow | null>(null);
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Add these missing state variables
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [videos, setVideos] = useState<Trailer[]>([]);
  const [images, setImages] = useState<Images | null>(null);
  const [keywords, setKeywords] = useState<Keywords | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null);
  const [isLoadingTrailers, setIsLoadingTrailers] = useState<boolean>(false);
  const [activeMediaTab, setActiveMediaTab] = useState<string>("videos");

  // Fetch movie details and credits
  useEffect(() => {
    const getMediaDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);
      setIsLoadingTrailers(true);

      // Check if the URL path includes /tv/ to determine if it's a TV show
      const isTV = location.pathname.includes("/tv/");
      const currentMediaType = isTV ? "tv" : "movie";
      setMediaType(currentMediaType);

      try {
        // Use the same function for both movie and TV data, passing the mediaType
        const [
          mediaData,
          imageData,
          keywordsData,
          creditData,
          mediaExternalData,
          trailersData,
        ] = await Promise.all([
          fetchMovieIdTemplate(id, "by-id", currentMediaType),
          fetchMovieIdTemplate(id, "images", currentMediaType),
          fetchMovieIdTemplate(id, "keywords", currentMediaType),
          fetchMovieIdTemplate(id, "credits", currentMediaType),
          fetchMovieIdTemplate(id, "media", currentMediaType),
          fetchMovieIdTemplate(id, "trailer", currentMediaType),
        ]);

        // Set all the state variables
        setMovie({
          ...mediaData,
          credits: creditData,
          keywords: keywordsData,
          MovieMediaData: mediaExternalData,
        });

        setImages(imageData);
        setKeywords(keywordsData);

        // Handle videos and trailers
        if (trailersData.results) {
          const allVideos = trailersData.results;
          setVideos(allVideos);

          // Filter for trailers specifically
          const trailerVideos = allVideos.filter(
            (video) => video.type.toLowerCase() === "trailer"
          );
          setTrailers(trailerVideos);

          // Set the first trailer as selected if available
          if (trailerVideos.length > 0) {
            setSelectedTrailer(trailerVideos[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to fetch details");
      } finally {
        setLoading(false);
        setIsLoadingTrailers(false);
      }
    };

    getMediaDetails();
  }, [id, location.pathname]); // Add location.pathname as a dependency

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
      mediaType, // Add this line to include mediaType in the context value
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
      mediaType, // Add this dependency as well
    ]
  );

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
