import { HStack, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/api";
import Cards from "./Cards";
import background from "../assets/trending-bg.svg";
import LinkSelector from "./LinkSelector";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [activeLink, setActiveLink] = useState("I dag");

  const links = [
    { name: "I dag", href: "#" },
    { name: "Denne uge", href: "#" },
  ];

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results); // Access the results array
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <HStack display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <HStack
        p="20px"
        display={"flex"}
        alignItems={"flex-start"}
        flexDirection={"column"}
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
        >
          <Cards />
        </HStack>
        <HStack
          h={"25vh"}
          w={"100%"}
          bg={`url($bg})`}
          backgroundSize="cover"
          backgroundPosition="center"
        ></HStack>
      </HStack>
    </HStack>
  );
};

export default TrendingMovies;
