import React, { useEffect, useState } from "react";
import { Card, CardHeader, Heading, CardBody, Text } from "@chakra-ui/react";
import { fetchTrendingMovies } from "../services/api";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
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
            }}
          />

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
