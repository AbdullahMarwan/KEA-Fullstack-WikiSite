import NavBar from "./components/NavBar";
import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateColumns={"150px 1fr"}
      color="blackAlpha.700"
    >
      <GridItem pl="2" area={"header"} bg="#032440">
        <NavBar />
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        Nav
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
