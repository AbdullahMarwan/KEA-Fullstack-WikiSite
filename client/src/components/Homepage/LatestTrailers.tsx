import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import TrailerCards from "./TrailerCards";
import trailerBackground from "../../assets/images/latest-trailers-bg.webp"; // Your background image
import { fetchTrendingMovies } from "../../services/api"; // Import fetchTrendingMovies

const LatestTrailers = () => {
  let defaultTimeWindow = "popular";

  return (
    <HStack
      display="flex"
      alignItems="center"
      flexDirection="column"
      mt="50px"
      width="100%"
      backgroundImage={`linear-gradient(rgba(3, 37, 65, 0.8), rgba(3, 37, 65, 0.8)), url(${trailerBackground})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      py="30px"
    >
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth="1300px"
        padding="0 20px"
      >
        <TrailerCards
          title="Latest Trailers"
          showLinkSelector={true}
          links={[
            { name: "Populært", href: "#", value: "popular" },
            { name: "Streaming", href: "#", value: "streaming" },
            { name: "På TV", href: "#", value: "on-tv" },
            { name: "Til Leje", href: "#", value: "for-rent" },
            { name: "I Biograferne", href: "#", value: "in-theaters" },
          ]}
          defaultTimeWindow={
            defaultTimeWindow === "popular" ? "popular" : "trending"
          }
        />
      </Box>
    </HStack>
  );
};

export default LatestTrailers;
