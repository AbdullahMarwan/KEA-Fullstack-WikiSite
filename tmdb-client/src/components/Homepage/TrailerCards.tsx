import React, { useEffect, useState, useCallback } from "react";
import {
  Heading,
  Card,
  CardBody,
  CardHeader,
  Box,
  Skeleton,
  SkeletonText,
  HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import MenuOnCards from "./MenuOnCards";
import LinkSelector from "./LinkSelector";
import ApiClient from "../../services/api-client";

// Create motion components
const MotionCard = motion(Card);
const MotionBox = motion(Box);
const trailerApi = new ApiClient<Trailer[]>("/api/trailers");

interface Trailer {
  id: number;
  title: string;
  overview: string;
  video: boolean;
  youtubeLinks: string[];
  backdrop_path: string;
  poster_path: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface TrailerCardsProps {
  title?: string;
  showLinkSelector?: boolean;
  links?: Array<{ name: string; href: string; value?: string }>;
  defaultTimeWindow?: string;
}

const TrailerCards: React.FC<TrailerCardsProps> = ({
  title = "Latest Trailers",
  showLinkSelector = false,
  links = [
    { name: "Populært", href: "#", value: "popular" },
    { name: "Upcoming", href: "#", value: "upcoming" },
  ],
  defaultTimeWindow = "popular",
}) => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLink, setActiveLink] = useState(links[0].value);
  const [timeWindow, setTimeWindow] = useState(defaultTimeWindow);

  // Update timeWindow when activeLink changes
  useEffect(() => {
    const selected = links.find((link) => link.value === activeLink);
    if (selected && selected.value) {
      setTimeWindow(selected.value);
    }
  }, [activeLink, links]);

  // Handle link click to update active link
  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  // Update the fetchData function to use your API
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Use the timeWindow to determine which endpoint to call
      const endpoint =
        timeWindow === "popular" ? "popular-trailer" : "upcoming-trailer";

      // Use your ApiClient to fetch trailers
      const trailerData = await trailerApi.get(endpoint);
      console.log("Trailer data from API:", trailerData);

      // Set the trailers
      setTrailers(
        trailerData.map((movie: any) => ({
          id: movie.movieId,
          title: movie.title || "Unknown Title",
          overview: movie.overview || "No overview available",
          video: true,
          youtubeLinks: movie.youtubeLinks || [],
          backdrop_path: movie.backdrop_path || "",
          poster_path: movie.poster_path || "",
        }))
      );

      // Also set trending movies from the same data
      setTrendingMovies(
        trailerData.map((movie: any) => ({
          id: movie.movieId,
          title: movie.title || "Unknown Title",
          poster_path: movie.poster_path || "",
        }))
      );
    } catch (error) {
      console.error("Error fetching trailers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [timeWindow]);

  // Fetch data when timeWindow changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box width="100%" maxWidth="1300px">
      {/* Title and Link Selector Header */}
      {(title || showLinkSelector) && (
        <HStack spacing={4} mb={4} width="100%" justifyContent="flex-start">
          {title && (
            <Heading fontSize="1.5rem" fontWeight="500" color="white">
              {title}
            </Heading>
          )}

          {showLinkSelector && (
            <LinkSelector
              links={links}
              activeLink={activeLink}
              onLinkClick={handleLinkClick}
              maxVisible={5}
              activeTextColor="linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)"
              inactiveTextColor="#fff"
              borderColor="rgba(255,255,255,0.2)"
              activeBgColor="rgba(255,255,255,0.2)"
            />
          )}
        </HStack>
      )}

      {/* Trailer Cards with Animation */}
      <Box
        display="flex"
        overflowX="auto"
        width="100%"
        css={{
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
        minHeight="220px" // Fixed height to prevent layout shift
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <MotionBox
              key={`content-${timeWindow}-${Date.now()}`} // Add timestamp to force re-render
              display="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              width="100%"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={`skeleton-${index}`}
                  flexShrink={0}
                  width="300px"
                  marginRight="20px"
                  backgroundColor="transparent"
                >
                  <Skeleton
                    height="calc(300px / 1.78)"
                    borderRadius="10px"
                    marginBottom="10px"
                  />
                  <CardBody padding="20px 20px 20px 0px" textAlign="center">
                    <SkeletonText noOfLines={2} spacing="4" />
                  </CardBody>
                </Card>
              ))}
            </MotionBox>
          ) : (
            <MotionBox
              key={`content-${timeWindow}`} // Add timeWindow to key to force re-render
              display="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              width="100%"
            >
              {trendingMovies.slice(0, 4).map((movie, index) => (
                <MotionCard
                  key={`${timeWindow}-${movie.id}-${index}`}
                  flexShrink={0}
                  width="300px"
                  marginRight="20px"
                  backgroundColor="transparent"
                  position="relative"
                  cursor="pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.05,
                      duration: 0.4,
                    },
                  }}
                  onClick={() => {
                    const trailer = trailers.find(
                      (trailer) => trailer.id === movie.id
                    );
                    if (trailer && trailer.youtubeLinks.length > 0) {
                      window.open(
                        trailer.youtubeLinks[0],
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                >
                  <Box
                    backgroundImage={
                      movie.poster_path
                        ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                        : "url('https://via.placeholder.com/500x281?text=No+Image+Available')"
                    }
                    backgroundSize="cover"
                    backgroundPosition="center"
                    height="calc(300px / 1.78)"
                    position="relative"
                    borderRadius="10px"
                    overflow="hidden"
                  />
                  <CardBody padding="20px 20px 20px 0px" textAlign="center">
                    <CardHeader padding="0">
                      <Heading fontSize="1em" color="white" isTruncated>
                        {movie.title || "Unknown Title"}
                      </Heading>
                    </CardHeader>
                    <MenuOnCards
                      movie={{
                        id: movie.id,
                      }}
                      type="trending"
                      instanceId={`trailer-${timeWindow}-${index}-${movie.id}`} // Use instanceId to fix menu issues
                    />
                  </CardBody>
                </MotionCard>
              ))}
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default TrailerCards;
