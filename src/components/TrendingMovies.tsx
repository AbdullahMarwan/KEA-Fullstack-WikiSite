import { HStack, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/api";
import Cards from "./Cards";
import background from "../assets/trending-bg.svg";
import LinkSelector from "./LinkSelector";

const TrendingMovies = () => {
  const [activeLink, setActiveLink] = useState("I dag");
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

  // Preload background image to prevent layout shifts
  useEffect(() => {
    const img = new Image();
    img.src = background;
  }, []);

  const links = [
    { name: "I dag", href: "#" },
    { name: "Denne uge", href: "#" },
  ];

  // Update timeWindow when activeLink changes
  useEffect(() => {
    if (activeLink === "I dag") {
      setTimeWindow("day");
    } else if (activeLink === "Denne uge") {
      setTimeWindow("week");
    }
  }, [activeLink]);

  // Handle link click to update active link
  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  // Create a memoized fetch function that uses the current timeWindow
  const fetchMoviesWithTimeWindow = React.useCallback(() => {
    return fetchTrendingMovies(timeWindow);
  }, [timeWindow]);

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
        <HStack>
          <h3
            style={{
              color: "black",
              fontSize: "1.5rem",
              fontWeight: "500",
            }}
          >
            Trending
          </h3>
          <LinkSelector
            links={links}
            activeLink={activeLink}
            onLinkClick={setActiveLink}
            maxVisible={2}
            activeTextColor="linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)"
            inactiveTextColor="rgb(3, 37, 65)"
            borderColor="rgb(3, 37, 65)" // Teal border
            activeBgColor="rgb(3, 37, 65)" // Default teal gradient
          />
        </HStack>
        <HStack
          w="100%"
          bg={`url(${background})`}
          backgroundSize="cover"
          backgroundPosition="center"
          minHeight="420px" // Add a minimum height to prevent collapse
          position="relative" // Important for maintaining layout
        >
          <Cards
            fetchFunction={fetchMoviesWithTimeWindow}
            maxItems={10}
            key={timeWindow} // Add a key to force re-render when timeWindow changes
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default TrendingMovies;
