import { Grid, GridItem } from "@chakra-ui/react";
import SearchBar from "../components/Homepage/SearchBar";
import SearchMovieSection from "../components/Homepage/SearchMovieSection";
import LatestTrailers from "../components/Homepage/LatestTrailers";
import SignupSection from "../components/Signup/SignupSection";
import MovieSection from "../components/Homepage/MovieSection";

export const Homepage = () => {
  return (
    <Grid
      templateAreas={`"header"
                      "main"`}
      gridTemplateRows={"auto 1fr"}
      width="100%"
    >
      <GridItem 
      area={"header"} bg="#032440">
        <SearchBar />
      </GridItem>

      <GridItem 
      area={"main"}
      // display={"none"} // Uncomment and adjust as needed
      max-width={"100vw  "} // Uncomment and adjust as needed
      overflow={"hidden"}
      >
        <SearchMovieSection />
        <MovieSection sectionType="trending" />
        <LatestTrailers />
        <MovieSection sectionType="popular" />
        <SignupSection />
        <MovieSection sectionType="tv-series" />
      </GridItem>
    </Grid>
  );
};
