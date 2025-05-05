import { HStack, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { fetchTemplate } from "../../services/api";
import Cards from "./Cards";
import background from "../../assets/trending-bg.svg";

const TrendingMovies = () => {
  // Preload background image to prevent layout shifts
  useEffect(() => {
    const img = new Image();
    img.src = background;
  }, []);

  return (
    <HStack display="flex" alignItems="center" flexDirection="column" mt="50px">
      <Box
        p="20px"
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        maxWidth="1300px"
        width="100%"
      >
        <Box
          w="100%"
          bg={`url(${background})`}
          backgroundSize="cover"
          backgroundPosition="center"
          minHeight="420px"
          position="relative"
          borderRadius="8px"
        >
          <Cards
            fetchFunction={() => fetchTemplate("day", "trending")} // Pass as a function reference
            maxItems={10}
            title="Trending"
            showLinkSelector={true}
            links={[
              { name: "I dag", href: "#", value: "day" },
              { name: "Denne uge", href: "#", value: "week" },
            ]}
            defaultTimeWindow="day"
          />
        </Box>
      </Box>
    </HStack>
  );
};

export default TrendingMovies;
