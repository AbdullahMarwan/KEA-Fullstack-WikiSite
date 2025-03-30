import React from "react";
import { HStack } from "@chakra-ui/react";
import Cards from "./Cards";
import { fetchPopularMovies } from "../services/api";
import background from "../assets/trending-bg.svg";
import { useEffect } from "react";

const PopularAtTheMoment = () => {
  const [activeLink, setActiveLink] = React.useState("Vises nu");

  // Preload background image to prevent layout shifts
  useEffect(() => {
    const img = new Image();
    img.src = background;
  }, []);

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
            fetchFunction={fetchPopularMovies}
            maxItems={10}
            title="Film"
            showLinkSelector={true}
            links={[
              { name: "Vises nu", href: "#", value: "now_playing" },
              { name: "Populært", href: "#", value: "popular" },
              { name: "bedste anmeldelser", href: "#", value: "top_rated" },
              { name: "Kommende", href: "#", value: "upcoming" },
            ]}
            defaultTimeWindow="day"
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default PopularAtTheMoment;
