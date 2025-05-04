import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import Cards from "./Cards";
import background from "../../assets/trending-bg.svg";
import { useEffect } from "react";
import { returnLinks, returnTitle, fetchMovies} from "../../utils/movieSectionhelper";


interface MovieSectionProps {
  sectionType: "popular" | "tv-series" | "trending";
}

const movieSection: React.FC<MovieSectionProps> = ({ sectionType }) => {
  //   const [activeLink, setActiveLink] = React.useState("Vises nu");
  const [activeLink, setActiveLink] = useState<string>("Trending");
  const [movies, setMovies] = useState<any[]>([]); // State to store the movie array
  const [links, setLinks] = useState<any[]>([]); // Initialize with popularMoviesLinks
  const [title, setTitle] = useState<string>("Trending"); // Initialize with an Trending string

  const updateActiveLink = (value: string) => {
    
    setActiveLink(value);
  };

  // Preload background image to prevent layout shifts
  useEffect(() => {
    setLinks(returnLinks(sectionType))
    setTitle(returnTitle(sectionType));

    // Fetch movies and update state
    fetchMovies(sectionType, setMovies);

    // Preload background image
    const img = new Image();
    img.src = background;
  }, [sectionType]);

  //Temp Console logs
  console.log("Usestate in main", activeLink);
  //   console.log("Usestate in main", links);

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
        <HStack w="100%">
          <Cards
            customData={movies} // Pass the fetched movies as customData
            maxItems={10}
            title={title}
            showLinkSelector={true}
            links={links}
            defaultTimeWindow={activeLink}
            onLinkClick={updateActiveLink} // Pass the callback to update activeLink
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default movieSection;
