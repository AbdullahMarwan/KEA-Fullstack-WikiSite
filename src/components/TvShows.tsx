import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import Cards from "./Cards";
import { fetchTvShows, fetchPopularTvSeries } from "../services/api";

const TvShows = () => {
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
            fetchFunction={fetchPopularTvSeries}
            maxItems={10}
            title="Tv Shows"
            showLinkSelector={true}
            links={[
              { name: "Populært", href: "#", value: "popular" },
              { name: "sendes i dag", href: "#", value: "airing_today" },
              { name: "Bedste anmeldelser", href: "#", value: "top_rated" },
            ]}
            defaultTimeWindow="Popular"
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default TvShows;
