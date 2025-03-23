import React, { useState } from "react";
import { HStack, Box, Heading } from "@chakra-ui/react";
import TrailerCards from "./TrailerCards";
import LinkSelector from "./LinkSelector";

const LatestTrailers = () => {
  const [activeLink, setActiveLink] = useState("Popular");

  const links = [
    { name: "Popular", href: "#" },
    { name: "Streaming", href: "#" },
    { name: "På tv", href: "#" },
    { name: "til leje", href: "#" },
    { name: "I biograferne", href: "#" },
  ];

  return (
    <HStack
      bg="#032541"
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      mt={"50px"}
    >
      <HStack
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        width="100%"
        maxWidth={"1300px"}
      >
        <Box p="20px" width="100%">
          <Box
            display="flex"
            alignItems={{ base: "flex-start", md: "flex-end" }}
            flexDirection={{ base: "column", md: "row" }}
            mb={"20px"}
            gap={{ base: "10px", md: "0" }}
          >
            <Heading fontSize="1.5rem" fontWeight="700" color="white" mr="1em">
              Seneste Trailers
            </Heading>

            <LinkSelector
              links={links}
              activeLink={activeLink}
              onLinkClick={setActiveLink}
              maxVisible={5} // Adjust this number as needed
            />
          </Box>
          <TrailerCards />
        </Box>
      </HStack>
    </HStack>
  );
};

export default LatestTrailers;
