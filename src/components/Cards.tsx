import React, { useEffect, useState } from "react";
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
import { fetchTrendingMovies } from "../services/api";
import VoteAverageRing from "./voteAverageRing";
import MenuOnCards from "./MenuOnCards";

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

interface CardsProps {
  fetchFunction?: () => Promise<any>; // Default fetch function can be overridden
  maxItems?: number; // Optional max number of items to display
}

const Cards: React.FC<CardsProps> = ({
  fetchFunction = fetchTrendingMovies, // Default to fetchTrendingMovies if no function is provided
  maxItems = 10,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching new data

    const getMovies = async () => {
      try {
        const data = await fetchFunction();
        setMovies(data.results); // Access the results array
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    getMovies();
  }, [fetchFunction]); // Add fetchFunction to the dependency array

  return (
    <HStack
      overflowX="auto" // Enable horizontal scrolling
      whiteSpace="nowrap"
      width="100%"
      maxWidth="1300px"
      padding="10px"
      boxSizing="border-box"
      alignItems="flex-start" // Prevent stretching of child elements
      minHeight="420px" // Fixed minimum height to prevent layout shifts
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
                height="420px" // Add a fixed height to match the loaded content
                flex="0 0 auto"
                marginRight="20px"
                backgroundColor="transparent"
              >
                <Skeleton height="300px" borderRadius="10px" />
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
                height="420px" // Match the height of the skeleton
                flex="0 0 auto"
                marginRight="20px"
                backgroundColor="transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.05, // Staggered animation
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
                    position={"absolute"}
                    bottom={"-1em"}
                    left={"20px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
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
                    <Heading fontSize={"1em"} color="black" isTruncated>
                      {movie.title}
                    </Heading>
                  </CardHeader>
                  <Text fontSize={"1em"} color="black" noOfLines={1}>
                    {movie.release_date}
                  </Text>
                  <MenuOnCards movie={movie} type="default" />
                </CardBody>
              </MotionCard>
            ))}
          </MotionBox>
        )}
      </AnimatePresence>
    </HStack>
  );
};

export default Cards;
