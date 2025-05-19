import { fetchTemplate } from "../services/api";

const trendingMoviesLinks = [
  { name: "Today", href: "#", value: "day" },
  { name: "This Week", href: "#", value: "week" },
];
const tvShowsMoviesLinks = [
  { name: "Popular", href: "#", value: "popular" },
  { name: "Airing Today", href: "#", value: "airing-today" },
  { name: "Top Rated", href: "#", value: "top-rated" },
];
const popularMoviesLinks = [
  { name: "Now Playing", href: "#", value: "now-playing" },
  { name: "Popular", href: "#", value: "popular" },
  { name: "Top Rated", href: "#", value: "top-rated" },
  { name: "Upcoming", href: "#", value: "upcoming" },
];

export const getFetchFunction = async (
  category: string,
  activeLink: string
) => {
  switch (category) {
    case "popular":
      return fetchTemplate(activeLink, "movie"); // "movie" is the type for popular movies
    case "tv-series":
      return fetchTemplate(activeLink, "tv"); // "tv" is the type for TV series
    case "trending":
      return fetchTemplate("trending", "movie"); // "trending" is a category for movies
    default:
      return fetchTemplate("trending", "movie"); // Default to trending movies
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
  activeLink: string,
  timeWindow?: string
) => {
  try {
    let category = activeLink;
    let type = "movie"; // Default to "movie"
    let usedTimeWindow = timeWindow || "day"; // Default to week if not provided

    if (sectionType === "tv-series") {
      type = "tv"; // Set type to "tv" for TV series
    } else if (sectionType === "trending") {
      category = "trending"; // Set category to "trending" for trending movies
      // Use timeWindow only for trending
      usedTimeWindow = activeLink;
    }

    const data = await fetchTemplate(category, type, usedTimeWindow);
    setMovies(data.results || []);
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
