import React, { useState, useEffect } from "react";
import {
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Image,
  Box,
  Flex,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tabs,
  TabList,
  Tab,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import VoteAverageRing from "../Homepage/voteAverageRing"; // Adjust path if needed

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("movies");
  const [sortBy, setSortBy] = useState("Date Added");
  const toast = useToast();

  // Get user ID from localStorage
  const getUserId = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      const userData = JSON.parse(userStr);
      console.log("Parsed user data:", userData);

      // Check all possible locations for the ID
      if (userData.id) {
        return userData.id;
      } else if (userData.user_id) {
        return userData.user_id;
      } else if (userData.user && userData.user.user_id) {
        return userData.user.user_id;
      }

      console.error("Could not find user ID in stored data:", userData);
      return null;
    } catch (error) {
      console.error("Error getting user ID:", error);
      return null;
    }
  };

  // Fetch favorites
  const fetchFavorites = async () => {
    const userId = getUserId();
    console.log(userId);
    if (!userId) {
      setLoading(false);
      toast({
        title: "Not logged in",
        description: "Please log in to view favorites",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/favorites/${userId}`
      );
      setFavorites(response.data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      toast({
        title: "Error fetching favorites",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Remove favorite
  const handleRemove = async (contentId: number) => {
    const userId = getUserId();
    if (!userId) return;

    try {
      console.log("About to send DELETE request");
      // Ensure both IDs are numbers
      const numUserId = Number(userId);
      const numContentId = Number(contentId);

      const deleteUrl = `${
        import.meta.env.VITE_API_URL
      }/api/favorites/${numUserId}/${numContentId}`;

      console.log(
        "DELETE URL:",
        deleteUrl,
        "Content ID type:",
        typeof numContentId,
        "Value:",
        numContentId
      );

      const response = await axios.delete(deleteUrl);
      console.log("DELETE response:", response);

      // Update state to remove item locally
      setFavorites(favorites.filter((item) => item.id !== numContentId));
      toast({
        title: "Success",
        description: "Removed from favorites",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Filter by content type
  const filteredFavorites = favorites.filter((item) =>
    activeTab === "movies"
      ? item.content_type === "movie"
      : item.content_type === "tv"
  );

  // Sort items based on selection
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === "Title") {
      return (a.title || a.name).localeCompare(b.title || b.name);
    } else if (sortBy === "Rating") {
      return b.vote_average - a.vote_average;
    }
    // Default: Date Added (just use the array order)
    return 0;
  });

  // Count by type
  const movieCount = favorites.filter((item) => item.type === "movie").length;
  const tvCount = favorites.filter((item) => item.type === "tv").length;

  if (loading) {
    return (
      <VStack width="100%" py={10}>
        <Spinner size="xl" color="pink.500" />
        <Text mt={4}>Loading your favorites...</Text>
      </VStack>
    );
  }

  return (
    <VStack width="100%" alignItems="center" p={5} spacing={6}>
      <Flex
        width="100%"
        maxWidth="1200px"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>
          <Heading>My Favorites</Heading>
          <Tabs variant="unstyled" index={activeTab === "movies" ? 0 : 1}>
            <TabList>
              <Tab
                _selected={{ color: "pink.500" }}
                borderBottom="4px solid"
                borderColor={
                  activeTab === "movies" ? "pink.500" : "transparent"
                }
                onClick={() => setActiveTab("movies")}
              >
                Movies{" "}
                <Badge ml={1} colorScheme="pink" borderRadius="full">
                  {movieCount}
                </Badge>
              </Tab>
              <Tab
                _selected={{ color: "pink.500" }}
                borderBottom="4px solid"
                borderColor={activeTab === "tv" ? "pink.500" : "transparent"}
                onClick={() => setActiveTab("tv")}
              >
                TV Shows{" "}
                <Badge ml={1} borderRadius="full">
                  {tvCount}
                </Badge>
              </Tab>
            </TabList>
          </Tabs>
        </HStack>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="outline"
          >
            Sort: {sortBy}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSortBy("Date Added")}>
              Date Added
            </MenuItem>
            <MenuItem onClick={() => setSortBy("Title")}>Title</MenuItem>
            <MenuItem onClick={() => setSortBy("Rating")}>Rating</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {sortedFavorites.length > 0 ? (
        <VStack width="100%" maxWidth="1200px" spacing={4} align="stretch">
          {sortedFavorites.map((item) => (
            <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
            >
              <Flex>
                <Image
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  alt={item.title || item.name}
                  width="130px"
                  height="195px"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/130x195?text=No+Image"
                />
                <Box p={4} flex="1">
                  <Flex justify="space-between" align="start">
                    <Box>
                      <Heading size="md" mb={1}>
                        {item.title || item.name}
                      </Heading>
                      <Text color="gray.500" fontSize="sm" mb={2}>
                        {item.release_date || item.first_air_date
                          ? new Date(
                              item.release_date || item.first_air_date
                            ).getFullYear()
                          : "Unknown year"}
                      </Text>
                    </Box>
                    <VoteAverageRing voteAverage={item.vote_average || 0} />
                  </Flex>

                  <Text noOfLines={2} mb={4} fontSize="sm">
                    {item.overview || "No overview available"}
                  </Text>

                  <Button
                    leftIcon={<CloseIcon />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove from favorites
                  </Button>
                </Box>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        <Box textAlign="center" py={10} width="100%">
          <Text fontSize="xl">
            No {activeTab === "movies" ? "movies" : "TV shows"} in your
            favorites yet
          </Text>
          <Text mt={2} color="gray.500">
            Add content to your favorites to see them here
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default FavoriteList;
