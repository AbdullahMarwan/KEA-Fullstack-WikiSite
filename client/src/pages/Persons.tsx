import { Box, Grid, GridItem, Heading } from "@chakra-ui/react"
import PopularPersons from "../components/Persons/PopularPersons";

export const Persons = () => {
  return (
    <Grid justifyContent={"center"} paddingLeft="25" paddingRight="25"> 
      <GridItem area={"main"}>
        <Heading>Popular People</Heading>
        <PopularPersons />
      </GridItem>
    </Grid>
  );
};
