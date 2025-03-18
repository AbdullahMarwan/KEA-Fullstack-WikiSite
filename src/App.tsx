import NavBar from "./components/NavBar";
import { AppRoutes } from "./routes/AppRoutes";
import { Grid, GridItem } from "@chakra-ui/react";

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
      </GridItem>
      <GridItem area={"main"}>
        <AppRoutes />
      </GridItem>
      <GridItem bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
