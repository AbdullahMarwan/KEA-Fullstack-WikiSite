import NavBar from "./components/NavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import SearchMovieSection from "./components/SearchMovieSection";

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
      <GridItem pl="2" area={"main"}>
        <SearchMovieSection />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
