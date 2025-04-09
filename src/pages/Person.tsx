import { Box, Grid, GridItem, Heading } from "@chakra-ui/react"
import PersonDetails from "../components/Persons/PersonDetails.js";


export const PersonSingle = () => {
    return (
      <Grid justifyContent={"center"}>
        <GridItem area={"main"}
        marginBottom={100}
        marginTop={100}
        maxWidth={{ base: "80vw", lg: "90vw" }}        

        >
          <Heading> </Heading>
          <PersonDetails   
          />
        </GridItem>
      </Grid>
    );
  };
  
  export default PersonSingle;