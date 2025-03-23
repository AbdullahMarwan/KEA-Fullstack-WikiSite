import { Grid, GridItem } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import SearchMovieSection from "../components/SearchMovieSection";
import TrendingMovies from "../components/TrendingMovies";
import LatestTrailers from "../components/LatestTrailers";
import PopularAtTheMoment from "../components/PopularAtTheMoment";

export const Homepage = () => {
  return (
    <Grid
      templateAreas={`"header"
                      "main"`}
      gridTemplateRows={"auto 1fr"}
      width="100%"
    >
      <GridItem area={"header"} bg="#032440">
        <SearchBar />
      </GridItem>

      <GridItem area={"main"}>
        <SearchMovieSection />
        <TrendingMovies />
        <LatestTrailers />
        <PopularAtTheMoment />
      </GridItem>
    </Grid>
  );
};
