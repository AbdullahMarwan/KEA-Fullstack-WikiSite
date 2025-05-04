import { Grid, GridItem } from "@chakra-ui/react";
import SearchBar from "../components/Homepage/SearchBar";
import SearchMovieSection from "../components/Homepage/SearchMovieSection";
import TrendingMovies from "../components/Homepage/TrendingMovies";
import LatestTrailers from "../components/Homepage/LatestTrailers";
import FilmSection from "../components/Homepage/FilmSection";
import TvShows from "../components/Homepage/TvShows";
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
      <GridItem area={"header"} bg="#032440">
        <SearchBar />
      </GridItem>

      <GridItem area={"main"}>
        <SearchMovieSection />
        {/* <TrendingMovies /> */}
        <MovieSection sectionType="trending" />
        <LatestTrailers />
        {/* <FilmSection /> */}
        <MovieSection sectionType="popular" />
        <SignupSection />
        {/* <TvShows /> */}
        <MovieSection sectionType="tv-series" />
      </GridItem>
    </Grid>
  );
};
