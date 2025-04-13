import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  HStack,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Box,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTrendingMovies } from "../../services/api";
import VoteAverageRing from "./voteAverageRing";
import MenuOnCards from "./MenuOnCards";
import LinkSelector from "./LinkSelector";

// Create motion components
const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

interface TvShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string;
  vote_average: number;
}

// Enhanced props to include links and selection options
interface CardsProps {
  fetchFunction?: (timeWindow?: string) => Promise<any>; // Updated to accept timeWindow parameter
  maxItems?: number;
  title?: string;
  showLinkSelector?: boolean; // Whether to show the link selector
  links?: Array<{ name: string; href: string; value?: string }>; // Links with optional value
  defaultTimeWindow?: string; // Default time window value
}

const Cards: React.FC<CardsProps> = ({
  fetchFunction = fetchTrendingMovies,
  maxItems = 10,
  title = "Trending",
  showLinkSelector = false,
  links = [
    { name: "I dag", href: "#", value: "day" },
    { name: "Denne uge", href: "#", value: "week" },
  ],
  defaultTimeWindow = "day",
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLink, setActiveLink] = useState(links[0].name);
  const [timeWindow, setTimeWindow] = useState(defaultTimeWindow);

  // Update timeWindow when activeLink changes
  useEffect(() => {
    // Find the corresponding link and get its value
    const selected = links.find((link) => link.name === activeLink);
    if (selected && selected.value) {
      setTimeWindow(selected.value);
    }
  }, [activeLink, links]);

  // Handle link click to update active link
  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  // Create a memoized fetch function that uses the current timeWindow
  const fetchWithTimeWindow = useCallback(() => {
    return fetchFunction(timeWindow);
  }, [fetchFunction, timeWindow]);

  // Fetch movies when timeWindow changes
  useEffect(() => {
    setIsLoading(true);

    const getMovies = async () => {
      try {
        const data = await fetchWithTimeWindow();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [fetchWithTimeWindow]);

  // Format date to show month name and year
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Unknown Date";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) return "Unknown Date";

      // Get month name and year
      const monthNames = [
        "Januar",
        "Februar",
        "Marts",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "December",
      ];

      const monthIndex = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();

      return `${day}. ${monthNames[monthIndex]} ${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown Date";
    }
  };

  return (
    <Box width="100%">
      {/* Title and Link Selector Header */}
      {(title || showLinkSelector) && (
        <HStack spacing={4} mb={4} width="100%" justifyContent="flex-start">
          {title && (
            <Heading fontSize="1.5rem" fontWeight="500" color="black">
              {title}
            </Heading>
          )}

          {showLinkSelector && (
            <LinkSelector
              links={links}
              activeLink={activeLink}
              onLinkClick={handleLinkClick}
              maxVisible={links.length}
              activeTextColor="linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)"
              inactiveTextColor="rgb(3, 37, 65)"
              borderColor="rgb(3, 37, 65)"
              activeBgColor="rgb(3, 37, 65)"
            />
          )}
        </HStack>
      )}

      {/* Movies List with Animation */}
      <HStack
        overflowX="auto"
        whiteSpace="nowrap"
        width="100%"
        padding="10px"
        boxSizing="border-box"
        alignItems="flex-start"
        minHeight="400px"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <MotionBox
              key="loading"
              display="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              width="100%"
            >
              {Array.from({ length: maxItems }).map((_, index) => (
                <Card
                  key={index}
                  display="inline-block"
                  width="250px"
                  height="400px"
                  flex="0 0 auto"
                  marginRight="20px"
                  backgroundColor="transparent"
                >
                  <Skeleton height="400px" borderRadius="10px" />
                  <CardBody padding="20px 20px 20px 20px">
                    <SkeletonText noOfLines={2} spacing="4" />
                    <SkeletonCircle size="10" marginTop="10px" />
                  </CardBody>
                </Card>
              ))}
            </MotionBox>
          ) : (
            <MotionBox
              key="content"
              display="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              width="100%"
            >
              {movies.slice(0, maxItems).map((movie, index) => (
                <MotionCard
                  key={movie.id}
                  display="inline-block"
                  width="250px"
                  height="400px"
                  flex="0 0 auto"
                  marginRight="20px"
                  backgroundColor="transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.05,
                      duration: 0.4,
                    },
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "300px",
                      position: "relative",
                      borderRadius: "10px",
                    }}
                  >
                    <HStack
                      position="absolute"
                      bottom="-1em"
                      left="20px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <VoteAverageRing
                        radius={50}
                        stroke={4}
                        progress={Math.round(movie.vote_average * 10)}
                      />
                    </HStack>
                  </div>
                  <CardBody padding="20px 20px 20px 20px">
                    <CardHeader padding="0">
                      <Heading fontSize="1em" color="black" isTruncated>
                        {movie.title ||
                          (movie as unknown as TvShow).name ||
                          "Unknown Title"}
                      </Heading>
                    </CardHeader>
                    <Text fontSize="1em" color="black" noOfLines={1}>
                      {formatDate(
                        movie.release_date ||
                          (movie as unknown as TvShow).first_air_date
                      )}
                    </Text>
                    <MenuOnCards
                      movie={movie}
                      type="default"
                      instanceId={`${title}-${timeWindow}-${index}-${movie.id}`}
                    />
                  </CardBody>
                </MotionCard>
              ))}
            </MotionBox>
          )}
        </AnimatePresence>
      </HStack>
    </Box>
  );
};

export default Cards;
