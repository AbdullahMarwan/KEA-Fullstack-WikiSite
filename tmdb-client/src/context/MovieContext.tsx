import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
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
  mediaType: 'movie' | 'tv';
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
  mediaType: "movie",
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
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');


  // Fetch movie details and credits
  useEffect(() => {
    const getMediaDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        if (mediaType === "tv") {
          // Fetch TV show data
          const [
            tvData,
            tvImages,
            keywordsData,
            creditData,
            tvMediaData,
          ] = await Promise.all([
            fetchMovieIdTemplate(id, "by-id", "tv"),
            fetchMovieIdTemplate(id, "images", "tv"),
            fetchMovieIdTemplate(id, "keywords", "tv"),
            fetchMovieIdTemplate(id, "credits", "tv"),
            fetchMovieIdTemplate(id, "media", "tv"),
          ]);

          setImages(tvImages);

          const completeTv = {
            ...tvData,
            genres: tvData.genres ?? [],
            credits: creditData,
            TvMediaData: tvMediaData,
            keywords: keywordsData,
          };

          setMovie(completeTv);
          setError(null);
        } else {
          // Fetch Movie data (existing logic)
          const [
            movieData,
            movieImages,
            keywordsData,
            creditData,
            movieMediaData,
          ] = await Promise.all([
            fetchMovieIdTemplate(id, "by-id", "movie"),
            fetchMovieIdTemplate(id, "images", "movie"),
            fetchMovieIdTemplate(id, "keywords", "movie"),
            fetchMovieIdTemplate(id, "credits", "movie"),
            fetchMovieIdTemplate(id, "media", "movie"),
          ]);

          setImages(movieImages);

          const completeMovie = {
            ...movieData,
            genres: movieData.genres ?? [],
            credits: creditData,
            MovieMediaData: movieMediaData,
            keywords: keywordsData,
          };

          setMovie(completeMovie);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to fetch details");
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    getMediaDetails();
  }, [id, mediaType]);

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
