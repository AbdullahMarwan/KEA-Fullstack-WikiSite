import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import TrailerCards from "./TrailerCards";
import trailerBackground from "../../assets/images/latest-trailers-bg.webp"; // Your background image

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
            { name: "Upcoming", href: "#", value: "upcoming" },
            // Only include links that have corresponding API functions
          ]}
          defaultTimeWindow="popular"
        />
      </Box>
    </HStack>
  );
};

export default LatestTrailers;
