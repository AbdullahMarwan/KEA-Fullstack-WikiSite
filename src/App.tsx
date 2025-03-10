import NavBar from "./components/NavBar";
import { Grid, GridItem, Tr } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import SearchMovieSection from "./components/SearchMovieSection";
import TrendingMovies from "./components/TrendingMovies";

function App() {
  return (
    <Grid
      templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
      gridTemplateColumns={"150px 1fr"}
      color="blackAlpha.700"
    >
      <GridItem area={"header"} bg="#032440">
        <NavBar />
        <SearchBar />
      </GridItem>
      <GridItem area={"main"}>
        <SearchMovieSection />
        <TrendingMovies />
      </GridItem>
      <GridItem area={"main"}></GridItem>
      <GridItem bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
