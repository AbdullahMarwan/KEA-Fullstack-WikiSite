import React, { useState } from "react";
import { HStack, Heading } from "@chakra-ui/react";
import Cards from "./Cards";
import background from "../../assets/trending-bg.svg";
import { useEffect } from "react";
import {
  returnLinks,
  returnTitle,
  updateActiveLink,
} from "../../utils/movieSectionHelper";
import LinkSelector from "./LinkSelector";
import ApiClient from "../../services/api-client";

interface MovieSectionProps {
  sectionType: "popular" | "tv-series" | "trending";
}

interface Movie {
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

// Create API client for content
const contentApi = new ApiClient<Movie[]>("/api/content");

const movieSection: React.FC<MovieSectionProps> = ({ sectionType }) => {
  const [activeLink, setActiveLink] = useState<string>("day");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("Trending");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch content from database using API client
  const fetchContentFromDatabase = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching content from database...", sectionType);

      // Convert sectionType to query parameters
      const params: Record<string, string> = {};

      if (sectionType === "trending") {
        params.trending = "true";
      } else if (sectionType === "popular") {
        params.popular = "true";
      } else if (sectionType === "tv-series") {
        params.content_type = "tv";
      }

      // Pass as AxiosRequestConfig object with params
      const data = await contentApi.getAll({ params });
      console.log("Data received:", data);

      // Set the movies data
      setMovies(data);
    } catch (error) {
      console.error("Error fetching content:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Set links and title
  useEffect(() => {
    const initialLinks = returnLinks(sectionType);
    setLinks(initialLinks);
    setTitle(returnTitle(sectionType));
  }, [sectionType]);

  // Fetch content when links change
  useEffect(() => {
    if (links.length > 0) {
      const firstLinkValue = links[0].value;
      updateActiveLink(firstLinkValue, setActiveLink);

      // Use our new function that fetches from the database
      fetchContentFromDatabase();
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

            {links.length > 0 && (
              <LinkSelector
                links={links}
                activeLink={activeLink}
                onLinkClick={(linkName: string) => {
                  updateActiveLink(linkName, setActiveLink);
                  // Keep using the database fetch instead of the original fetchMovies
                  fetchContentFromDatabase();
                }}
                maxVisible={links.length}
                activeTextColor="linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)"
                inactiveTextColor="rgb(3, 37, 65)"
                borderColor="rgb(3, 37, 65)"
                activeBgColor="rgb(3, 37, 65)"
              />
            )}
          </HStack>

          <Cards customData={movies} maxItems={10} showLinkSelector={false} />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default movieSection;
