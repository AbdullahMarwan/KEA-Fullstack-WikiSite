import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import Cards from "./Cards";
import LinkSelector from "./LinkSelector";
import { fetchTvShows } from "../services/api";

const TvShows = () => {
  const [activeLink, setActiveLink] = useState("I dag");

  const links = [
    { name: "I dag", href: "#" },
    { name: "Denne uge", href: "#" },
  ];

  return (
    <HStack
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      mt={"50px"}
    >
      <HStack
        p="20px"
        display={"flex"}
        alignItems={"flex-start"}
        flexDirection={"column"}
        maxWidth={"1300px"}
      >
        <HStack>
          <h3
            style={{
              color: "black",
              fontSize: "1.5rem",
              fontWeight: "500",
            }}
          >
            TV Shows
          </h3>
          <LinkSelector
            links={links}
            activeLink={activeLink}
            onLinkClick={setActiveLink}
            maxVisible={4}
            activeTextColor="linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)"
            inactiveTextColor="rgb(3, 37, 65)"
            borderColor="rgb(3, 37, 65)" // Teal border
            activeBgColor="rgb(3, 37, 65)" // Default teal gradient
          />
        </HStack>
        <HStack w="100%">
          <Cards fetchFunction={fetchTvShows} />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default TvShows;
