import { Box, Grid, GridItem, Heading } from "@chakra-ui/react"
import PersonDetails from "../components/PersonDetails.js";


export const PersonSingle = () => {
    return (
      <Grid justifyContent={"center"}>
        <GridItem area={"main"}>
          <Heading>Person</Heading>
          <PersonDetails />
        </GridItem>
      </Grid>
    );
  };
  