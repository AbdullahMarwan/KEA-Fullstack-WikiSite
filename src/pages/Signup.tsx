import { Grid, GridItem } from "@chakra-ui/react";
import SignupForm from "../components/SignupForm";
import SignupAside from "../components/SignupAside";

const Signup = () => {
  return (
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
        md: "300px 1fr", // Fixed width aside, flexible main on medium screens and up
      }}
      width="100%"
      maxWidth="1300px"
      margin="0 auto"
      padding={"30px 40px"}
    >
      <GridItem area={"aside"}>
        <SignupAside />
      </GridItem>

      <GridItem area={"main"} ml={"25px"}>
        <SignupForm />
      </GridItem>
    </Grid>
  );
};

export default Signup;
