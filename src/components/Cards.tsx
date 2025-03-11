import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  HStack,
} from "@chakra-ui/react";
import { fetchTrendingMovies } from "../services/api";
import ProgressRing from "./ProgressRing"; // Import the ProgressRing component

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

const Cards = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results); // Access the results array
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div
      style={{
        overflowX: "scroll",
        whiteSpace: "nowrap",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      {movies.slice(0, 10).map((movie) => (
        <Card
          key={movie.id}
          display="inline-block"
          width="200px"
          marginRight={"20px"}
          backgroundColor="transparent"
        >
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
              position: "relative",
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
              <ProgressRing
                radius={50}
                stroke={4}
                progress={Math.round(movie.vote_average * 10)}
              />
            </HStack>
          </div>
          <CardBody padding="20px 20px 20px 0px">
            <CardHeader padding="0">
              <Heading fontSize={"1em"} color="black" isTruncated>
                {movie.title}
              </Heading>
            </CardHeader>
            <Text fontSize={"1em"} color="black" noOfLines={1}>
              {movie.release_date}
            </Text>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
