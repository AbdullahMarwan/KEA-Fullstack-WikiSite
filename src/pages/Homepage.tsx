import { Grid, GridItem } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import SearchMovieSection from "../components/SearchMovieSection";
import TrendingMovies from "../components/TrendingMovies";
import LatestTrailers from "../components/LatestTrailers";

export const Homepage = () => {
  return (
    <Grid>
      <GridItem area={"header"} bg="#032440">
        <SearchBar />
      </GridItem>

      <GridItem area={"main"}>
        <SearchMovieSection />
        <TrendingMovies />
        <LatestTrailers />
      </GridItem>
    </Grid>
  );
};
