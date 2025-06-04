import React, { useState } from "react";
import {
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Image,
  Box,
  Flex,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { ChevronDownIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import { MAX_WIDTH } from "../../../src/utils/constants";
// Import your existing VoteAverageRing component
import VoteAverageRing from "../Homepage/voteAverageRing.tsx";

// Sample movie data - replace with API calls
const sampleMovies = [
  {
    id: 1,
    title: "Ballerina",
    poster_path: "/hYPUGwdNuxOOJ1OxmhKTCDMjUyF.jpg",
    release_date: "June 4, 2025",
    overview:
      "Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.",
    vote_average: 7.4, // Make sure these match your component's expected format
  },
  {
    id: 2,
    title: "Sinners",
    poster_path: "/uRdpVgEufzYNVnDPTXEjdkl1tTL.jpg",
    release_date: "April 16, 2025",
    overview:
      "Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back.",
    vote_average: 7.5,
  },
];

const FavoriteList = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [sortBy, setSortBy] = useState("Date Added");

  // Filter movies or TV shows based on active tab
  const favoriteMovies = sampleMovies;
  const favoriteTVShows = [];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <VStack width="100%" alignItems="center" p={5}>
      <VStack alignItems="flex-start" width="100%" maxWidth={MAX_WIDTH}>
        {/* Header section */}
        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <HStack gap={4}>
            <Heading>My Favorites</Heading>

            {/* Tab Navigation */}
            <Tabs
              variant="unstyled"
              defaultIndex={0}
              onChange={(index) =>
                handleTabChange(index === 0 ? "movies" : "tv")
              }
            >
              <TabList>
                <Tab
                  borderBottom="4px solid"
                  borderColor={
                    activeTab === "movies" ? "pink.500" : "transparent"
                  }
                  fontWeight="semibold"
                  _selected={{ color: "pink.500" }}
                  onClick={() => handleTabChange("movies")}
                >
                  Movies{" "}
                  <Badge ml={1} colorScheme="pink" borderRadius="full">
                    {favoriteMovies.length}
                  </Badge>
                </Tab>
                <Tab
                  borderBottom="4px solid"
                  borderColor={activeTab === "tv" ? "pink.500" : "transparent"}
                  _selected={{ color: "pink.500" }}
                  onClick={() => handleTabChange("tv")}
                >
                  TV{" "}
                  <Badge ml={1} borderRadius="full">
                    {favoriteTVShows.length}
                  </Badge>
                </Tab>
              </TabList>
            </Tabs>
          </HStack>

          {/* Filters */}
          <HStack>
            <Text>Filter by:</Text>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme="pink"
                variant="outline"
              >
                {sortBy}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setSortBy("Date Added")}>
                  Date Added
                </MenuItem>
                <MenuItem onClick={() => setSortBy("Title")}>Title</MenuItem>
                <MenuItem onClick={() => setSortBy("Rating")}>Rating</MenuItem>
              </MenuList>
            </Menu>
            <Text>Order:</Text>
            <IconButton
              aria-label="Sort order"
              icon={<ChevronDownIcon />}
              variant="outline"
            />
          </HStack>
        </Flex>

        {/* Movie Cards */}
        {activeTab === "movies" &&
          favoriteMovies.map((movie) => (
            <Box
              key={movie.id}
              width="100%"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mb={4}
            >
              <Flex alignItems="center">
                {/* Movie Poster */}
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  width="150px"
                  height="225px"
                  objectFit="cover"
                />

                {/* Movie Details */}
                <Box p={4} flex="1">
                  <Flex alignItems="center" mb={2}>
                    {/* Using VoteAverageRing instead of RatingBadge */}
                    <VoteAverageRing voteAverage={movie.vote_average} />

                    <Box ml={3}>
                      <Heading size="md">{movie.title}</Heading>
                      <Text color="gray.500">{movie.release_date}</Text>
                    </Box>
                  </Flex>

                  <Text mb={4}>{movie.overview}</Text>

                  {/* Action Buttons */}
                  <HStack spacing={2}>
                    <Button
                      leftIcon={<span>★</span>}
                      variant="outline"
                      size="sm"
                    >
                      Rate it!
                    </Button>
                    <Button leftIcon={<FaHeart />} colorScheme="pink" size="sm">
                      Favorite
                    </Button>
                    <Button leftIcon={<AddIcon />} variant="outline" size="sm">
                      Add to list
                    </Button>
                    <Button
                      leftIcon={<CloseIcon />}
                      variant="outline"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </HStack>
                </Box>
              </Flex>
            </Box>
          ))}

        {/* Empty state for TV shows */}
        {activeTab === "tv" && favoriteTVShows.length === 0 && (
          <Box textAlign="center" py={10} width="100%">
            <Text fontSize="xl">No favorite TV shows yet</Text>
          </Box>
        )}
      </VStack>
    </VStack>
  );
};

export default FavoriteList;
