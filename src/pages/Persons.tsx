import { Box, Grid, GridItem, Heading } from "@chakra-ui/react"
import PopularPersons from "../components/PopularPersons";

export const Persons = () => {
  return (
    <Grid justifyContent={"center"}>
      <GridItem area={"main"}>
        <Heading>Popular People</Heading>
        <PopularPersons />
      </GridItem>
    </Grid>
  );
};
