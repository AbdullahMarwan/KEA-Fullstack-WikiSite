import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import Cards from "./Cards";
import background from "../../assets/trending-bg.svg";
import { useEffect } from "react";

import {
  fetchPopularMovies,
  fetchPopularTvSeries,
  fetchTrendingMovies,
} from "../../services/api";

interface MovieSectionProps {
  sectionType: "popular" | "tv-series" | "trending";
}

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

const movieSection: React.FC<MovieSectionProps> = ({ sectionType }) => {
  //   const [activeLink, setActiveLink] = React.useState("Vises nu");
  const [activeLink, setActiveLink] = useState<string>("Trending");
  const [movies, setMovies] = useState<any[]>([]); // State to store the movie array
  const [links, setLinks] = useState<any[]>([]); // Initialize with popularMoviesLinks
  const [title, setTitle] = useState<string>("Trending"); // Initialize with an Trending string

  const getFetchFunction = async (category: string) => {
    switch (category) {
      case "popular":
        return fetchPopularMovies;
      case "tv-series":
        return fetchPopularTvSeries;
      case "trending":
        return fetchTrendingMovies;
      default:
        return fetchTrendingMovies;
    }
  };

  const returnLinks = (category: string) => {
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

  const returnTitle = (category: string) => {
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

  const fetchMovies = async () => {
    try {
      const fetchFunction = await getFetchFunction(sectionType); // Get the appropriate fetch function
      const data = await fetchFunction(); // Call the fetch function to get the data
      setMovies(data.results || data); // Update the movies state
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const updateActiveLink = (value: string) => {
    
    setActiveLink(value);
  };

  // Preload background image to prevent layout shifts
  useEffect(() => {
    setLinks(returnLinks(sectionType));
    setTitle(returnTitle(sectionType));
    fetchMovies();
    updateActiveLink("Today");

    const img = new Image();
    img.src = background;
  }, []);

  //Temp Console logs
  console.log("Usestate in main", activeLink);
  //   console.log("Usestate in main", links);

  return (
    <HStack
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      mt={"50px"}
    >
      <HStack
        p="20px"
        display={"flex"}
        alignItems={"flex-start"}
        flexDirection={"column"}
        maxWidth={"1300px"}
      >
        <HStack w="100%">
          <Cards
            customData={movies} // Pass the fetched movies as customData
            maxItems={10}
            title={title}
            showLinkSelector={true}
            links={links}
            defaultTimeWindow={activeLink}
            onLinkClick={updateActiveLink} // Pass the callback to update activeLink
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default movieSection;
