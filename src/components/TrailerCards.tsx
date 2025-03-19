import React, { useEffect, useState } from "react";
import { HStack, Heading, Card, CardBody, CardHeader } from "@chakra-ui/react";
import { FaEllipsisH } from "react-icons/fa";
import { fetchTrailerMovies } from "../services/api";

interface Trailer {
  id: number;
  title: string;
  video: boolean;
  backdrop_path: string;
  poster_path: string;
}

const TrailerCards = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);

  useEffect(() => {
    const getTrailerMovies = async () => {
      try {
        const data = await fetchTrailerMovies();
        setTrailers(data.results); // Access the results array
      } catch (error) {
        console.error("Error fetching trailer movies:", error);
      }
    };

    getTrailerMovies();
  }, []);

  return (
    <div
      style={{
        overflowX: "scroll", // Enable horizontal scrolling
        whiteSpace: "nowrap", // Prevent wrapping
        width: "100%",
        maxWidth: "1300px",
      }}
    >
      {trailers.slice(0, 4).map((trailer) => (
        <Card
          key={trailer.id}
          display="inline-block"
          width="300px" // Adjusted width for responsiveness
          marginRight={"20px"}
          backgroundColor="transparent"
        >
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${trailer.poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "calc(300px / 1.78)",
              position: "relative",
              borderRadius: "10px",
            }}
          >
            <HStack
              position={"absolute"}
              top={"10px"}
              right={"10px"}
              width={"2em"}
              height={"2em"}
              backgroundColor={"rgba(128, 128, 128, 0.7)"}
              borderRadius={"50%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              cursor={"pointer"}
              onClick={() => {
                const menu = document.getElementById(`menu-${trailer.id}`);
                if (menu) {
                  menu.style.display =
                    menu.style.display === "block" ? "none" : "block";
                }
              }}
            >
              <FaEllipsisH color="rgb(3, 37, 65)" />
            </HStack>
          </div>
          <CardBody padding="20px 20px 20px 0px" textAlign={"center"}>
            <CardHeader padding="0">
              <Heading fontSize={"1em"} color="black" isTruncated>
                {trailer.title}
              </Heading>
            </CardHeader>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default TrailerCards;
