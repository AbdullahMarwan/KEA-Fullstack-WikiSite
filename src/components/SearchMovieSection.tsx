import React from "react";
import { Input, Button, HStack } from "@chakra-ui/react";

import searchMovieImage from "../assets/images/search-img.jpg";

const SearchMovieSection = () => {
  return (
    <section
      style={{
        width: "100%",
        height: "35vh",
        backgroundImage: `linear-gradient(rgba(3, 36, 64, 0.7), rgba(3, 36, 64, 0.7)), url(${searchMovieImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "20px",
        flexDirection: "column",
      }}
    >
      <HStack
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        w={"100%"}
      >
        <h2
          style={{
            fontSize: "3em",
            color: "white",
            fontWeight: "700",
            textAlign: "left",
          }}
        >
          Velkommen.
        </h2>
        <h3
          style={{
            fontSize: "2em",
            color: "white",
            fontWeight: "500",
            lineHeight: "1",
          }}
        >
          {" "}
          Millioner af film, TV-serier og personer at opdage. Udforsk nu.
        </h3>
      </HStack>
      <HStack
        width={"100%"}
        justifyContent="center"
        bg="white"
        height={"50px"}
        borderRadius={"50px"}
        padding={0} // Remove default padding
      >
        <Input
          placeholder="Søg..."
          color={"grey"}
          _placeholder={{ color: "gray.500" }} // Placeholder color
          height={"100%"}
          borderRadius={"50px"}
        />
        <Button
          bgGradient="linear(to-r, rgba(30, 213, 169, 1), rgba(1, 180, 228, 1))"
          color="white"
          height={"100%"}
          width={"100px"}
          fontWeight={"400"}
          borderRadius={"50px"}
        >
          Søg
        </Button>
      </HStack>
    </section>
  );
};

export default SearchMovieSection;
