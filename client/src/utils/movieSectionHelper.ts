import {
  fetchPopularMovies,
  fetchPopularTvSeries,
  fetchTrendingMovies,
} from "../services/api";

const trendingMoviesLinks = [
  { name: "Today", href: "#", value: "day" },
  { name: "This Week", href: "#", value: "week" },
];
const tvShowsMoviesLinks = [
  { name: "Popular", href: "#", value: "popular" },
  { name: "Airing Today", href: "#", value: "airing_today" },
  { name: "Top Rated", href: "#", value: "top_rated" },
];
const popularMoviesLinks = [
  { name: "Now Playing", href: "#", value: "now_playing" },
  { name: "Popular", href: "#", value: "popular" },
  { name: "Top Rated", href: "#", value: "top_rated" },
  { name: "Upcoming", href: "#", value: "upcoming" },
];

export const getFetchFunction = async (category: string, activeLink: string) => {
  switch (category) {
    case "popular":
      return fetchPopularMovies(activeLink);
    case "tv-series":
      return fetchPopularTvSeries(activeLink);
    case "trending":
      return fetchTrendingMovies(activeLink);
    default:
      return fetchTrendingMovies(activeLink);
  }
};

export const returnLinks = (category: string) => {
  switch (category) {
    case "popular":
      return popularMoviesLinks;
    case "tv-series":
      return tvShowsMoviesLinks;
    case "trending":
      return trendingMoviesLinks;
    default:
      return trendingMoviesLinks;
  }
};

export const returnTitle = (category: string) => {
  switch (category) {
    case "popular":
      return "Popular";
    case "tv-series":
      return "Tv Shows";
    case "trending":
      return "Trending";
    default:
      return "Trending";
  }
};

export const fetchMovies = async (
  sectionType: string,
  setMovies: React.Dispatch<React.SetStateAction<any[]>>,
  activeLink: string
) => {
  try {
    const data = await getFetchFunction(sectionType, activeLink); // Call the fetch function to get the data
    setMovies(data.results || data); // Update the movies state
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const updateActiveLink = (
  value: string,
  setActiveLink: React.Dispatch<React.SetStateAction<string>>
) => {
  setActiveLink(value);
};
