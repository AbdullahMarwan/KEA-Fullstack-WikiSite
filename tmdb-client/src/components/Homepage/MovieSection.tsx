import React, { useState } from "react";
import { HStack, Heading } from "@chakra-ui/react";
import Cards from "./Cards";
import background from "../../assets/trending-bg.svg";
import { useEffect } from "react";
import {
  returnLinks,
  returnTitle,
  fetchMovies,
  updateActiveLink,
} from "../../utils/movieSectionHelper";
import LinkSelector from "./LinkSelector";
import ApiClient from "../../services/api-client";

interface MovieSectionProps {
  sectionType: "popular" | "tv-series" | "trending";
}

interface Movies {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  content_type?: string;
  type?: string;
  first_air_date?: string;
  release_date?: string;
  overview?: string;
}

const moviesApi = new ApiClient<Movies[]>("/api/content"); // State to store the movie array
// const favoritesApi = new ApiClient<Favorite[]>("/api/favorites");

const movieSection: React.FC<MovieSectionProps> = ({ sectionType }) => {
  const [activeLink, setActiveLink] = useState<string>("day"); // TODO Make this dynamic
  const [movies, setMovies] = useState<Movies[]>([]); // State to store the movie array
  const [links, setLinks] = useState<any[]>([]); // Initialize with popularMoviesLinks
  const [title, setTitle] = useState<string>("Trending"); // Initialize with an Trending string

  // Preload background image to prevent layout shifts
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Starting fetch...");
        const data = await moviesApi.getAll();
        console.log("API response type:", typeof data);
        console.log("API response:", data);
        console.log("Is array:", Array.isArray(data));
        console.log("Data length:", data?.length);

        if (Array.isArray(data)) {
          console.log("Setting movies with array data");
          setMovies(data);
        } else if (data && data.results && Array.isArray(data.results)) {
          console.log("Setting movies with data.results");
          setMovies(data.results);
        } else {
          console.error("Unexpected data structure:", data);
          setMovies([]);
        }

        // Log what's in the movies state after setting it
        setTimeout(
          () => console.log("Movies state after update:", movies),
          100
        );
      } catch (error) {
        console.error("Error details:", error);
        setMovies([]);
      } finally {
        // Set links and title based on sectionType
        const initialLinks = returnLinks(sectionType);
        setLinks(initialLinks);
        setTitle(returnTitle(sectionType));
      }
    };
    fetchData();
  }, [sectionType]);

  useEffect(() => {
    // Ensure links are available before accessing the first value
    if (links.length > 0) {
      const firstLinkValue = links[0].value;
      updateActiveLink(firstLinkValue, setActiveLink); // Update activeLink with the first value
    }
  }, [links]);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = background;
  }, []);

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
        <HStack w="100%" flexDirection={"column"}>
          <HStack spacing={4} mb={4} width="100%">
            {title && (
              <Heading fontSize="1.5rem" fontWeight="500" color="black">
                {title}
              </Heading>
            )}

            {/* {links.length > 0 && (
              <LinkSelector
                links={links}
                activeLink={activeLink}
                onLinkClick={(linkName: string) => {
                  updateActiveLink(linkName, setActiveLink); // Update the activeLink state
                  fetchMovies(sectionType, setMovies, linkName); // Refetch movies with the new activeLink
                }}
                maxVisible={links.length}
                activeTextColor="linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)"
                inactiveTextColor="rgb(3, 37, 65)"
                borderColor="rgb(3, 37, 65)"
                activeBgColor="rgb(3, 37, 65)"
              />
            )} */}
          </HStack>
          <Cards
            customData={movies} // Pass the fetched movies as customData
            maxItems={10}
            showLinkSelector={false}
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default movieSection;
