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
  Grid,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fetchTemplate } from "../../services/api";
import LinkSelector from "./LinkSelector";
import { Link as ReactRouterLink } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaListUl } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import ApiClient from "../../services/api-client";
import VoteAverageRing from "./VoteAverageRing";

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
  popularity: number;
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

interface Favorite {
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
  // Add any other properties you use
}

const favoritesApi = new ApiClient<Favorite[]>("/api/favorites");

// Enhanced props to include links and custom data
interface CardsProps {
  movieId?: number; // Optional movieId prop for fetching specific movie data
  fetchFunction?: (timeWindow?: string, type?: string) => Promise<any>; // Updated to accept timeWindow parameter
  maxItems?: number;
  title?: string;
  showLinkSelector?: boolean; // Whether to show the link selector
  links?: Array<{ name: string; href: string; value?: string }>; // Links with optional value
  defaultTimeWindow?: string; // Default time window value
  customData?: any[]; // For passing in cast or other pre-fetched data
  cardType?: "movie" | "person" | "cast" | "recommendations"; // Type of card to display
  cardSize?: "small" | "medium" | "large";
  onLinkClick?: (linkName: string) => void; // Add the onLinkClick prop
  isGrid?: boolean;
  showCardMenu?: boolean; // Add this new prop
}

const Cards: React.FC<CardsProps> = ({
  fetchFunction = () => fetchTemplate("day", "trending"),
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
  onLinkClick,
  isGrid = false,
  showCardMenu = true,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLink, setActiveLink] = useState(
    links.length > 0 ? links[0].name : ""
  );
  const [timeWindow, setTimeWindow] = useState(defaultTimeWindow);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Move this inside the component and use state to make it reactive
  const [userLoggedIn, setUserLoggedIn] = useState(
    localStorage.getItem("user") !== null
  );

  // Add effect to listen for login/logout changes
  useEffect(() => {
    // Check login status on mount
    setUserLoggedIn(localStorage.getItem("user") !== null);

    // Listen for storage changes (logout events from other components)
    const handleStorageChange = () => {
      setUserLoggedIn(localStorage.getItem("user") !== null);
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for immediate updates within the same page
    const handleLoginChange = () => {
      setUserLoggedIn(localStorage.getItem("user") !== null);
    };

    window.addEventListener("loginStateChange", handleLoginChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStateChange", handleLoginChange);
    };
  }, []);

  // Calculate card dimensions based on size
  const getCardDimensions = () => {
    if (cardType === "recommendations") {
      return { width: "250px", height: "175px" };
    }

    if (isGrid === true) {
      return { width: "100%", height: "100%" };
    }

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
    setActiveLink(linkName); // Update local state
    if (onLinkClick) {
      onLinkClick(linkName); // Call the parent callback
    }
  };

  // Create a memoized fetch function that uses the current timeWindow
  const fetchWithTimeWindow = useCallback(() => {
    return typeof fetchFunction === "function"
      ? fetchFunction(timeWindow)
      : Promise.resolve(fetchFunction);
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

  // Add this useEffect after your other useEffects
  useEffect(() => {
    // Function to close the menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      // Skip if no menu is open
      if (openMenuId === null) return;

      // Check if click target is inside a menu or button
      const target = event.target as HTMLElement;
      const isMenuClick = target.closest(".card-menu");
      const isButtonClick = target.closest(".card-btn");

      // If clicking outside both menu and button, close the menu
      if (!isMenuClick && !isButtonClick) {
        setOpenMenuId(null);
      }
    };

    // Add document-level event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]); // Re-add listener when openMenuId changes

  const toast = useToast(); // Add this

  // Add this new function
  const handleAddToFavorites = async (contentId: number) => {
    try {
      // Get user ID from localStorage
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        console.error("No user found in localStorage");
        return;
      }

      const userData = JSON.parse(userStr);
      let userId;
      // Extract user ID from various possible structures
      if (userData.id) {
        userId = userData.id;
      } else if (userData.user_id) {
        userId = userData.user_id;
      } else if (userData.user && userData.user.user_id) {
        userId = userData.user.user_id;
      }

      // Make API call to add to favorites
      await favoritesApi.addFavorite(userId, contentId);

      // Show success toast
      toast({
        title: "Added to favorites",
        description: "This item has been added to your favorites",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      // Show error toast
    }
  };

  return (
    <Box position="relative" width="100%">
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
            />
          )}
        </HStack>
      )}

      <Box position="relative" width="100%" maxWidth="80vw" overflowX="scroll">
        {isLoading ? (
          isGrid ? (
            // Grid layout for skeletons
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)", // 2 skeletons per row on small screens
                md: "repeat(3, 1fr)", // 3 skeletons per row on medium screens
                lg: "repeat(4, 1fr)", // 4 skeletons per row on large screens
              }}
              gap={6} // Space between skeletons
            >
              {Array.from({ length: maxItems }).map((_, index) => (
                <Card
                  key={index}
                  width="100%"
                  height={height}
                  backgroundColor="transparent"
                >
                  <Skeleton
                    height={cardType === "cast" ? "225px" : "300px"}
                    borderRadius="10px"
                  />
                  <CardBody p="4">
                    <SkeletonText noOfLines={2} spacing="4" />
                    {cardType !== "cast" && <SkeletonCircle size="10" mt="4" />}
                  </CardBody>
                </Card>
              ))}
            </Grid>
          ) : (
            // Horizontal scrolling layout for skeletons
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
                    {cardType !== "cast" && <SkeletonCircle size="10" mt="4" />}
                  </CardBody>
                </Card>
              ))}
            </MotionBox>
          )
        ) : (
          // Render actual content
          <MotionBox
            key="content"
            display={isGrid ? "grid" : "flex"}
            gridTemplateColumns={
              isGrid
                ? {
                    base: "repeat(2, 1fr)", // 2 cards per row on small screens
                    md: "repeat(3, 1fr)", // 3 cards per row on medium screens
                    lg: "repeat(4, 1fr)", // 4 cards per row on large screens
                  }
                : undefined
            }
            gap={isGrid ? 6 : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            width="100%"
          >
            {items.slice(0, maxItems).map((item, index) => {
              const details = getItemDetails(item);

              // Handler to toggle the menu
              const handleToggleMenu = (e: React.MouseEvent, id: number) => {
                e.stopPropagation();
                e.preventDefault();
                setOpenMenuId(openMenuId === id ? null : id);
              };

              return (
                <MotionCard
                  key={`${details.id}-${index}`}
                  display="inline-block"
                  width={width}
                  height={height}
                  flex="0 0 auto"
                  marginRight={isGrid ? undefined : "20px"}
                  backgroundColor="transparent"
                  boxShadow="none"
                  borderRadius="10px"
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
                  <Box
                    as={ReactRouterLink}
                    to={details.linkPath}
                    position="relative"
                    borderRadius="10px"
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
                      objectFit="cover"
                      borderRadius="10px"
                      fallbackSrc="/placeholder-image.jpg"
                    />

                    {!details.isCast &&
                      details.rating !== null &&
                      cardType !== "recommendations" && (
                        <Box
                          position="absolute"
                          left="10px"
                          bottom="-20px"
                          background="rgba(3, 37, 65, 0.8)"
                          borderRadius="50%"
                          width="50px"
                          height="50px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <VoteAverageRing
                            radius={50}
                            stroke={6}
                            progress={(details.rating || 0) * 10}
                          />
                        </Box>
                      )}

                    {/* Only render the card-btn if showCardMenu is true */}
                    {showCardMenu && (
                      <Box
                        className="card-btn"
                        backgroundColor="rgba(100, 100, 100, 0.8)"
                        width="2rem"
                        height="2rem"
                        position="absolute"
                        top="10px"
                        right="10px"
                        borderRadius="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        cursor="pointer"
                        onClick={(e) => handleToggleMenu(e, details.id)}
                        _hover={{
                          backgroundColor: "rgba(120, 120, 120, 0.9)",
                        }}
                      >
                        <HiDotsHorizontal size="1.5rem" color="white" />

                        {/* Conditionally render the menu */}
                        {openMenuId === details.id && (
                          <VStack
                            className="card-menu"
                            zIndex="1000"
                            position="absolute"
                            top="120%"
                            right="0"
                            gap="0"
                            minW="180px"
                            backgroundColor="white"
                            borderRadius="10px"
                            alignItems="flex-start"
                            boxShadow="0px 4px 10px rgba(0,0,0,0.2)"
                            overflow="hidden"
                          >
                            {userLoggedIn ? (
                              <>
                                <HStack
                                  _hover={{
                                    backgroundColor: "gray.100",
                                    cursor: "pointer",
                                  }}
                                  width="100%"
                                  p="0.75rem 1rem"
                                  borderTopLeftRadius="10px"
                                  borderTopRightRadius="10px"
                                >
                                  <Icon as={FaListUl} color="black.500" />
                                  <Text>Add to list</Text>
                                </HStack>

                                <HStack
                                  _hover={{
                                    backgroundColor: "gray.100",
                                    cursor: "pointer",
                                  }}
                                  width="100%"
                                  p="0.75rem 1rem"
                                  onClick={() =>
                                    handleAddToFavorites(details.id)
                                  }
                                >
                                  <Icon as={FaHeart} color="black.500" />
                                  <Text>Favorite</Text>
                                </HStack>

                                <HStack
                                  _hover={{
                                    backgroundColor: "gray.100",
                                    cursor: "pointer",
                                  }}
                                  width="100%"
                                  p="0.75rem 1rem"
                                >
                                  <Icon as={IoBookmark} color="black.500" />
                                  <Text>Watchlist</Text>
                                </HStack>

                                <HStack
                                  _hover={{
                                    backgroundColor: "gray.100",
                                    cursor: "pointer",
                                  }}
                                  width="100%"
                                  p="0.75rem 1rem"
                                  borderBottomLeftRadius="10px"
                                  borderBottomRightRadius="10px"
                                >
                                  <Icon as={IoStar} color="black.500" />
                                  <Text>Your rating</Text>
                                </HStack>
                              </>
                            ) : (
                              <HStack
                                as={ReactRouterLink}
                                to={"/login"}
                                _hover={{
                                  backgroundColor: "gray.100",
                                  cursor: "pointer",
                                }}
                                width="100%"
                                p="0.75rem 1rem"
                                borderRadius="10px"
                              >
                                <Text>Login to add to lists</Text>
                                <IoIosArrowForward />
                              </HStack>
                            )}
                          </VStack>
                        )}
                      </Box>
                    )}
                  </Box>
                  <CardBody
                    height={"20%"}
                    display={"flex"}
                    alignItems={"center"}
                    padding={cardType === "recommendations" ? "0px" : "15px"}
                  >
                    <Box>
                      <Heading fontSize="1em" color="black" noOfLines={1}>
                        {details.name}
                      </Heading>
                      <Text fontSize="0.9em" color="gray.500" noOfLines={1}>
                        {details.subtitle}
                      </Text>
                    </Box>
                  </CardBody>
                </MotionCard>
              );
            })}
          </MotionBox>
        )}
      </Box>
    </Box>
  );
};

export default Cards;
