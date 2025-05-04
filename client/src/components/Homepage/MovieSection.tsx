import React, { useState } from "react";
import { HStack, Heading } from "@chakra-ui/react";
import Cards from "./Cards";
import background from "../../assets/trending-bg.svg";
import { useEffect } from "react";
import {
  returnLinks,
  returnTitle,
  fetchMovies,
} from "../../utils/movieSectionhelper";
import LinkSelector from "./LinkSelector";

interface MovieSectionProps {
  sectionType: "popular" | "tv-series" | "trending";
}

const movieSection: React.FC<MovieSectionProps> = ({ sectionType }) => {
  const [activeLink, setActiveLink] = useState<string>("day"); // TODO Make this dynamic
  const [movies, setMovies] = useState<any[]>([]); // State to store the movie array
  const [links, setLinks] = useState<any[]>([]); // Initialize with popularMoviesLinks
  const [title, setTitle] = useState<string>("Trending"); // Initialize with an Trending string

  const updateActiveLink = (value: string) => {
    setActiveLink(value);
  };

  // // Handle link click to update active link
  // const handleLinkClick = (linkName: string) => {
  //   setActiveLink(linkName); // Update local state
  //   if (onLinkClick) {
  //     onLinkClick(linkName); // Call the parent callback
  //   }
  // };

  // Preload background image to prevent layout shifts
  useEffect(() => {
    setLinks(returnLinks(sectionType));
    setTitle(returnTitle(sectionType));

    // Fetch movies and update state
    fetchMovies(sectionType, setMovies, activeLink);

    // Preload background image
    const img = new Image();
    img.src = background;
  }, [sectionType]);

  //Temp Console logs
  console.log("Usestate in main", activeLink);

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
        <HStack w="100%" flexDirection={"column"}>
          <HStack spacing={4} mb={4} width="100%" >
            {title && (
              <Heading fontSize="1.5rem" fontWeight="500" color="black">
                {title}
              </Heading>
            )}

            {links.length > 0 && (
              <LinkSelector
                links={links}
                activeLink={activeLink}
                onLinkClick={(linkName: string) => updateActiveLink(linkName)} // Pass a valid function
                maxVisible={links.length}
                activeTextColor="linear-gradient(to right, #1ed5aa 0%, #c0fed0 100%)"
                inactiveTextColor="rgb(3, 37, 65)"
                borderColor="rgb(3, 37, 65)"
                activeBgColor="rgb(3, 37, 65)"
              />
            )}
          </HStack>
          <Cards
            customData={movies} // Pass the fetched movies as customData
            maxItems={10}
            // title={title}
            showLinkSelector={false}
            // links={links}
            // defaultTimeWindow={activeLink}
            // onLinkClick={updateActiveLink} // Pass the callback to update activeLink
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default movieSection;
