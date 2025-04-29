import React from "react";
import { Box, HStack, Heading, Link, Text } from "@chakra-ui/react";
import { useMovie } from "../../context/MovieContext";
import MediaVideos from "./MediaVideos";

function Media() {
  const { movie, videos, images, activeMediaTab, setActiveMediaTab } =
    useMovie();

  // Safety check
  if (!movie) return null;

  return (
    <Box mt={10} borderTop="1px solid #d7d7d7" pt={10} width="100%">
      <HStack mb={5}>
        <Heading fontSize="1.75em" fontWeight={600} mr={5}>
          Media
        </Heading>
        <Link
          fontSize="1.25em"
          _hover={{ textDecoration: "none" }}
          onClick={() => setActiveMediaTab("popular")}
          borderBottom={
            activeMediaTab === "popular" ? "1px solid black" : "none"
          }
          fontWeight={activeMediaTab === "popular" ? "bold" : "normal"}
        >
          Most Popular
        </Link>
        <Link
          fontSize="1.25em"
          _hover={{ textDecoration: "none" }}
          onClick={() => setActiveMediaTab("videos")}
          borderBottom={
            activeMediaTab === "videos" ? "1px solid black" : "none" // Fixed this line
          }
          fontWeight={activeMediaTab === "videos" ? "bold" : "normal"}
        >
          Videos{" "}
          <Text
            as={"span"}
            fontSize={"0.75em"}
            fontWeight={"600"}
            color="gray.500"
          >
            ({videos?.length ? videos.length : 0})
          </Text>{" "}
        </Link>
        <Link
          fontSize="1.25em"
          _hover={{ textDecoration: "none" }}
          onClick={() => setActiveMediaTab("backdrops")}
          borderBottom={
            activeMediaTab === "backdrops" ? "1px solid black" : "none" // Fixed this line
          }
          fontWeight={activeMediaTab === "backdrops" ? "bold" : "normal"}
        >
          Backdrops{" "}
          <Text
            as={"span"}
            fontSize={"0.75em"}
            fontWeight={"600"}
            color="gray.500"
          >
            ({images?.backdrops ? images.backdrops.length : 0})
          </Text>
        </Link>
        <Link
          fontSize="1.25em"
          _hover={{ textDecoration: "none" }}
          onClick={() => setActiveMediaTab("posters")}
          borderBottom={
            activeMediaTab === "posters" ? "1px solid black" : "none" // Fixed this line
          }
          fontWeight={activeMediaTab === "posters" ? "bold" : "normal"}
        >
          Posters{" "}
          <Text
            as={"span"}
            fontSize={"0.75em"}
            fontWeight={"600"}
            color="gray.500"
          >
            ({images?.posters ? images.posters.length : 0})
          </Text>
        </Link>
      </HStack>

      {/* Include MediaVideos component */}
      <MediaVideos />
    </Box>
  );
}

export default Media;
