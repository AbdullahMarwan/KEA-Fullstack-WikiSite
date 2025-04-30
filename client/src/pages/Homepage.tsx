import { Grid, GridItem } from "@chakra-ui/react";
import SearchBar from "../components/Homepage/SearchBar";
import SearchMovieSection from "../components/Homepage/SearchMovieSection";
import TrendingMovies from "../components/Homepage/TrendingMovies";
import LatestTrailers from "../components/Homepage/LatestTrailers";
import FilmSection from "../components/Homepage/FilmSection";
import TvShows from "../components/Homepage/TvShows";
import SignupSection from "../components/Signup/SignupSection";

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
        {/* <MovieSection /> */}
        <SearchMovieSection />
        <TrendingMovies />
        <LatestTrailers />
        <FilmSection />
        <SignupSection />
        <TvShows />
      </GridItem>
    </Grid>
  );
};
