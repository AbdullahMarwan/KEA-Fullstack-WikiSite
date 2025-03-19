import { HStack, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../services/api";
import Cards from "./Cards";
import background from "../assets/trending-bg.svg";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);

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
          <Button
            bg={"rgb(3, 37, 65)"}
            borderRadius={"25px"}
            w="6.25em"
            h="1.875em"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            _hover={{ bg: "rgb(3, 37, 65)" }}
            _active={{ bg: "rgb(3, 37, 65)" }}
          >
            <a
              style={{
                background:
                  "linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              i dag
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{
                width: "1em",
                height: "1em",
                marginLeft: "0.5em",
                fill: "url(#gradient)",
              }}
            >
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#c0fecf", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#1ed5a9", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </Button>
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
