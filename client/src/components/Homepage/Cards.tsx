import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Heading,
  CardBody,
  Text,
  HStack,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Box,
  Image,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTrendingMovies } from "../../services/api";
import VoteAverageRing from "./voteAverageRing";
import MenuOnCards from "./MenuOnCards";
import LinkSelector from "./LinkSelector";
import { Link as ReactRouterLink } from "react-router-dom";

// Create motion components
const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  cardType: "movie";
  vote_average: number;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  cardType: "cast";
  profile_path: string | null;
}

type CardItem = Movie | Cast;

interface TvShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string;
  vote_average: number;
}

// Enhanced props to include links and custom data
interface CardsProps {
  fetchFunction?: (timeWindow?: string) => Promise<any>; // Updated to accept timeWindow parameter
  maxItems?: number;
  title?: string;
  showLinkSelector?: boolean; // Whether to show the link selector
  links?: Array<{ name: string; href: string; value?: string }>; // Links with optional value
  defaultTimeWindow?: string; // Default time window value
  customData?: any[]; // For passing in cast or other pre-fetched data
  cardType?: "movie" | "person" | "cast"; // Type of card to display
  cardSize?: "small" | "medium" | "large";
}

const Cards: React.FC<CardsProps> = ({
  fetchFunction = fetchTrendingMovies,
  maxItems = 10,
  title = "",
  showLinkSelector = false,
  links = [
    { name: "I dag", href: "#", value: "day" },
    { name: "Denne uge", href: "#", value: "week" },
  ],
  defaultTimeWindow = "day",
  customData = null,
  cardType = "movie",
  cardSize = "medium",
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLink, setActiveLink] = useState(
    links.length > 0 ? links[0].name : ""
  );
  const [timeWindow, setTimeWindow] = useState(defaultTimeWindow);

  // Calculate card dimensions based on size
  const getCardDimensions = () => {
    switch (cardSize) {
      case "small":
        return { width: "150px", height: "300px" };
      case "large":
        return { width: "300px", height: "450px" };
      case "medium":
      default:
        return { width: "250px", height: "450px" };
    }
  };

  const { width, height } = getCardDimensions();

  // Update timeWindow when activeLink changes
  useEffect(() => {
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

  // Fetch data or use provided custom data
  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      try {
        // If customData is provided, use it directly
        if (customData) {
          setItems(customData);
          setIsLoading(false);
          return;
        }

        // Otherwise fetch data
        const data = await fetchWithTimeWindow();
        setItems(data.results || data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [fetchWithTimeWindow, customData]);

  // Format date to show month name and year
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) return "";

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
      return "";
    }
  };

  // Determine the details of an item based on its type
  const getItemDetails = (item: any) => {
    // Fix the logical error in this condition
    if (cardType === "cast") {
      return {
        id: item.id,
        name: item.name,
        subtitle: item.character,
        imagePath: item.profile_path,
        linkPath: `/person/${item.id}`,
        rating: null, // Cast doesn't have ratings
        isCast: true, // Add a flag we can check later
      };
    }

    // Check if it has character property (another way to detect cast)
    if ("character" in item) {
      return {
        id: item.id,
        name: item.name,
        subtitle: item.character,
        imagePath: item.profile_path,
        linkPath: `/person/${item.id}`,
        rating: null,
        isCast: true,
      };
    }

    // For TV shows
    if ("first_air_date" in item) {
      return {
        id: item.id,
        name: item.name,
        subtitle: formatDate(item.first_air_date),
        imagePath: item.poster_path,
        linkPath: `/tv/${item.id}`,
        rating: item.vote_average,
        isCast: false,
      };
    }

    // Default: movies
    return {
      id: item.id,
      name: item.title || "Unknown Title",
      subtitle: formatDate(item.release_date),
      imagePath: item.poster_path,
      linkPath: `/movie/${item.id}`,
      rating: item.vote_average,
      isCast: false,
    };
  };

  return (
    <Box
      position="relative" // Make the main container relative
      width="100%"
    >
      {" "}
      {/* Remove the maxW and use width 100% to respect parent container */}
      {/* Title and Link Selector Header */}
      {(title || showLinkSelector) && (
        <HStack spacing={4} mb={4} width="100%">
          {title && (
            <Heading fontSize="1.5rem" fontWeight="500" color="black">
              {title}
            </Heading>
          )}

          {showLinkSelector && links.length > 0 && (
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
      {/* Container with blur overlay */}
      <Box position="relative" width="100%">
        {/* Fixed blur overlay */}
        <Box
          position="absolute"
          top={0}
          right={0}
          height="100%"
          width="60px"
          zIndex={2}
          pointerEvents="none" // Let events pass through
          background="linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 70%, rgba(255,255,255,1) 100%)"
        />

        {/* Scrollable content */}
        <Box
          overflowX="auto"
          whiteSpace="nowrap"
          padding="10px"
          boxSizing="border-box"
          css={{
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
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
                    width={width}
                    height={height}
                    flex="0 0 auto"
                    marginRight="20px"
                    backgroundColor="transparent"
                  >
                    <Skeleton
                      height={cardType === "cast" ? "225px" : "300px"}
                      borderRadius="10px"
                    />
                    <CardBody p="4">
                      <SkeletonText noOfLines={2} spacing="4" />
                      {cardType !== "cast" && (
                        <SkeletonCircle size="10" mt="4" />
                      )}
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
                {items.slice(0, maxItems).map((item, index) => {
                  const details = getItemDetails(item);

                  return (
                    <MotionCard
                      key={`${details.id}-${index}`}
                      display="inline-block"
                      width={width}
                      height={height}
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
                      borderRadius="10px"
                      overflow="hidden"
                    >
                      <Box
                        as={ReactRouterLink}
                        to={details.linkPath}
                        position="relative"
                        borderRadius="10px"
                        overflow="hidden"
                        height={cardType === "cast" ? "250px" : "350px"}
                        width={"300px"}
                      >
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${
                            details.imagePath || ""
                          }`}
                          alt={details.name}
                          width="100%"
                          height="80%"
                          objectFit="cover" // Changed from "cover" to "contain"
                          borderRadius="10px"
                          fallbackSrc="/placeholder-image.jpg"
                        />

                        {/* Only show rating for movies/TV shows, never for cast */}
                        {!details.isCast && details.rating !== null && (
                          <HStack
                            position="absolute"
                            bottom="-15px"
                            left="10px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <VoteAverageRing
                              radius={50}
                              stroke={4}
                              progress={Math.round(details.rating * 10)}
                            />
                          </HStack>
                        )}
                      </Box>

                      <CardBody p="4" pt={cardType === "cast" ? "2" : "6"}>
                        <Box whiteSpace="normal">
                          <Heading
                            fontSize="1em"
                            color="black"
                            as={ReactRouterLink}
                            to={details.linkPath}
                            _hover={{ color: "#022441" }}
                            noOfLines={1}
                          >
                            {details.name}
                          </Heading>

                          {details.subtitle && (
                            <Text
                              fontSize="0.9em"
                              color="gray.500"
                              noOfLines={1}
                              mt="1"
                            >
                              {details.subtitle}
                            </Text>
                          )}
                        </Box>

                        {/* Only show menu for movies/TV shows, not cast */}
                        {cardType !== "cast" && (
                          <MenuOnCards
                            movie={item}
                            type="default"
                            instanceId={`${title}-${timeWindow}-${index}-${details.id}`}
                          />
                        )}
                      </CardBody>
                    </MotionCard>
                  );
                })}
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
