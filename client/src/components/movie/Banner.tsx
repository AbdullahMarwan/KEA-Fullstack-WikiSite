import React from "react";
import {
  Text,
  HStack,
  Box,
  Flex,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import MovieDetails from "./MovieDetails";

const Banner = () => {
  return (
    // Wrapper Box with padding
    <Box padding="20px">
      <Grid
        templateAreas={{
          base: `"header" 
                   "aside" 
                   "main"`, // Stack vertically on mobile
          md: `"header header" 
                 "aside main"`, // Side by side on medium screens and up
        }}
        gridTemplateColumns={{
          base: "1fr", // Full width single column on mobile
          // Fixed width aside, flexible main on medium screens and up
        }}
        width="100%"
        maxWidth="1300px"
        margin="0 auto"
        columnGap={6} // Add gap only between columns (side-to-side)
      >
        <GridItem area={"aside"}></GridItem>
        <MovieDetails />
        <GridItem area={"main"}></GridItem>
      </Grid>
    </Box>
  );
};

export default Banner;
