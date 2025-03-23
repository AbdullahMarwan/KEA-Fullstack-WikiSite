import React from "react";
import { HStack } from "@chakra-ui/react";
import Cards from "./Cards";
import LinkSelector from "./LinkSelector";
import { fetchPopularMovies } from "../services/api";

const FreeToWatch = () => {
  const [activeLink, setActiveLink] = React.useState("Film");

  const links = [
    { name: "Film", href: "#" },
    { name: "TV", href: "#" },
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
            Gratis at se
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
          <Cards fetchFunction={fetchPopularMovies} />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default FreeToWatch;
