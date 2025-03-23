import React, { useState } from "react";
import {
  HStack,
  Box,
  Heading,
  Link,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import TrailerCards from "./TrailerCards";

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
    >
      <Box p="20px">
        <Box display="flex" alignItems="flex-end" mb={"20px"}>
          <Heading fontSize="1.5rem" fontWeight="700" color="white" mr="1em">
            Seneste Trailers
          </Heading>
          <UnorderedList
            display="flex"
            listStyleType="none"
            p="0"
            m="0"
            border="1px solid #1ed5aa"
            borderRadius="25px"
            mt="10px"
          >
            {links.map((link) => (
              <ListItem
                key={link.name}
                style={{
                  borderRadius: "25px",
                  height: "1.875em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: activeLink === link.name ? "rgb(3, 37, 65)" : "white",
                  cursor: "pointer",
                  background:
                    activeLink === link.name
                      ? "linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)"
                      : "rgb(3, 37, 65)",
                  fontWeight: 600,
                }}
              >
                <Link
                  href={link.href}
                  className="nav-link"
                  padding="1em"
                  style={{ color: "inherit", textDecoration: "none" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveLink(link.name);
                  }}
                >
                  {link.name}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <TrailerCards />
      </Box>
    </HStack>
  );
};

export default LatestTrailers;
