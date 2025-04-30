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

const movieSection = () => {
  const trendingMoviesLinks = [
    { name: "I dag", href: "#", value: "day" },
    { name: "Denne uge", href: "#", value: "week" },
  ];
  const tvShowsMoviesLinks = [
    { name: "Populært", href: "#", value: "popular" },
    { name: "sendes i dag", href: "#", value: "airing_today" },
    { name: "Bedste anmeldelser", href: "#", value: "top_rated" },
  ];
  const popularMoviesLinks = [
    { name: "Vises nu", href: "#", value: "now_playing" },
    { name: "Populært", href: "#", value: "popular" },
    { name: "bedste anmeldelser", href: "#", value: "top_rated" },
    { name: "Kommende", href: "#", value: "upcoming" },
  ];

  const [activeLink, setActiveLink] = React.useState("Vises nu");
  const [movies, setMovies] = useState<any[]>([]); // State to store the movie array
  const [links, setLinks] = useState<any[]>([]); // Initialize with popularMoviesLinks
//   const [links, setLinks] = useState(popularMoviesLinks); // Initialize with popularMoviesLinks

  const getFetchFunction = (category: string) => {
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

  // Preload background image to prevent layout shifts
  useEffect(() => {
    setLinks(trendingMoviesLinks);
    const img = new Image();
    img.src = background;
  }, []);

  console.log("Usestate in main", links);

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
            title="Film"
            showLinkSelector={true}
            links={links}
            defaultTimeWindow="popular"
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default movieSection;
