import { Grid, GridItem, Box, Image } from "@chakra-ui/react";
import SignupForm from "../components/Signup/SignupForm";
import SignupAside from "../components/Signup/SignupAside";

const Signup = () => {
  return (
    // Wrapper Box with padding
    <Box padding="20px">
      <Grid
        templateAreas={{
          base: `"header" 
                 "aside" 
                 "main"`, // Stack vertically on mobile
          md: `"header header" 
               "aside main"`, // Side by side on medium screens and up
        }}
        gridTemplateColumns={{
          base: "1fr", // Full width single column on mobile
          // Fixed width aside, flexible main on medium screens and up
        }}
        width="100%"
        maxWidth="1300px"
        margin="0 auto"
        columnGap={6} // Add gap only between columns (side-to-side)
      >
        <GridItem area={"aside"}>
        <SignupAside />
        </GridItem>

        <GridItem area={"main"}>

          <SignupForm />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Signup;
