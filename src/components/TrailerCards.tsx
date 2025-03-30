import React, { useEffect, useState } from "react";
import {
  Heading,
  Card,
  CardBody,
  CardHeader,
  Box,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { fetchTrailerMovies } from "../services/api";
import { fetchTrendingMovies } from "../services/api";
import MenuOnCards from "./MenuOnCards";

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
  backdrop_path: string;
}

const TrailerCards = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trailerData = await fetchTrailerMovies();
        const trendingData = await fetchTrendingMovies();

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

        trendingData.results.slice(0, 4).forEach((movie: any) => {
          movie.title = movie.title || "Unknown Title";
        });

        setTrendingMovies(trendingData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      display="flex"
      overflowX="auto"
      width="100%"
      maxWidth="1300px"
      css={{
        "&::-webkit-scrollbar": {
          height: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
      }}
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
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
          ))
        : trendingMovies.slice(0, 4).map((movie) => (
            <Skeleton
              key={`trending-${movie.id}`}
              isLoaded={!isLoading} // Skeleton will disappear when loading is complete
              flexShrink={0}
              width="300px"
              marginRight="20px"
            >
              <Card
                backgroundColor="transparent"
                position="relative"
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
                cursor="pointer"
              >
                <Box
                  backgroundImage={`url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}
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
                  />
                </CardBody>
              </Card>
            </Skeleton>
          ))}
    </Box>
  );
};

export default TrailerCards;
