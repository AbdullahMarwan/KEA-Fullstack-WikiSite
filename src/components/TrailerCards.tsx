import React, { useEffect, useState } from "react";
import {
  HStack,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";
import { fetchTrailerMovies } from "../services/api";
import { fetchTrendingMovies } from "../services/api";

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

  useEffect(() => {
    const getTrailerMovies = async () => {
      try {
        const data = await fetchTrailerMovies();

        setTrailers(
          data.map((movie: any) => ({
            id: movie.movieId,
            title: movie.title || "Unknown Title",
            overview: movie.overview || "No overview available",
            video: true,
            youtubeLinks: movie.youtubeLinks || [],
            backdrop_path: movie.backdrop_path || "",
            poster_path: movie.poster_path || "",
          }))
        );
      } catch (error) {
        console.error("Error fetching trailer movies:", error);
      }
    };

    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        data.results.slice(0, 4).forEach((movie: any) => {
          movie.title = movie.title || "Unknown Title";
        });

        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    getTrailerMovies();
    getTrendingMovies();
  }, []);

  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = "black";
    e.currentTarget.style.color = "white";
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.style.color = "black";
  };

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
      {trendingMovies.slice(0, 4).map((movie) => (
        <Card
          key={movie.id}
          flexShrink={0}
          width="300px"
          marginRight="20px"
          backgroundColor="transparent"
          onClick={() => {
            const trailer = trailers.find((trailer) => trailer.id === movie.id);
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
          >
            <Box
              position="absolute"
              top="50%"
              left="50%"
              height={"100px"}
              width={"100px"}
              transform="translate(-50%, -50%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="5em"
                height="5em"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </Box>
            <HStack
              position="absolute"
              top="10px"
              right="10px"
              width="2em"
              height="2em"
              backgroundColor="rgba(128, 128, 128, 0.7)"
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                const menu = document.getElementById(`menu-${movie.id}`);
                if (menu) {
                  menu.style.display =
                    menu.style.display === "block" ? "none" : "block";
                }
              }}
            >
              <FaEllipsisH color="rgb(3, 37, 65)" />
            </HStack>

            {/* Dropdown menu */}
            <Box
              id={`menu-${movie.id}`}
              position="absolute"
              top="40px"
              right="10px"
              backgroundColor="white"
              borderRadius="8px"
              boxShadow="0 2px 10px rgba(0,0,0,0.2)"
              zIndex={10}
              display="none"
              width="200px"
            >
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                <li
                  style={{
                    padding: "10px 20px",
                    color: "black",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </svg>
                  <Text ml="10px" fontWeight="600">
                    Favorite
                  </Text>
                </li>
                <li
                  style={{
                    padding: "10px 20px",
                    color: "black",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    height="1em"
                    width="1em"
                  >
                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                  </svg>
                  <Text ml="10px" fontWeight="600">
                    Bookmark
                  </Text>
                </li>
                <li
                  style={{
                    padding: "10px 20px",
                    color: "black",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    height="1em"
                    width="1em"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                  <Text ml="10px" fontWeight="600">
                    Rate
                  </Text>
                </li>
              </ul>
            </Box>
          </Box>

          <CardBody padding="20px 20px 20px 0px" textAlign="center">
            <CardHeader padding="0">
              <Heading fontSize="1em" color="white" isTruncated>
                {movie.title || "Unknown Title"}
              </Heading>
            </CardHeader>
          </CardBody>
        </Card>
      ))}
    </Box>
  );
};

export default TrailerCards;
