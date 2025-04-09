import { HStack, Box, Heading, Text, Button } from "@chakra-ui/react";
import bg from "../../assets/images/signup-bg.webp";
import { Link as ReactRouterLink } from "react-router-dom";

const SignupSection = () => {
  return (
    <HStack
      mt={"50px"}
      w={"100%"}
      backgroundColor={"black"}
      h={"35vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      background={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bg}), linear-gradient(to top right, rgba(25, 35, 53, 0.9), rgba(173, 71, 221, 0.4))`}
      backgroundBlendMode={"overlay"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      p={"20px"}
    >
      <Box
        maxW={"1300px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={"20px"}
      >
        <Heading color={"white"}>Bliv medlem i dag</Heading>
        <Text color={"white"}>
          Get access to maintain your own{" "}
          <Text as="span" opacity={"0.7"}>
            {" "}
            custom personal lists, track what you've seen{" "}
          </Text>{" "}
          and search and filter for{" "}
          <Text as="span" opacity={"0.7"}>
            {" "}
            what to watch{" "}
          </Text>{" "}
          next—regardless if it's in theatres, on TV or available on popular
          streaming services like Disney Plus, Netflix, Amazon Prime Video,
          Hayu, and Viaplay.
        </Text>
        <Button
          as={ReactRouterLink}
          to="/signup"
          background={"rgb(3,36,64)"}
          color={"white"}
          _hover={{
            background: "rgb(3,36,64)",
            color: "white",
          }}
        >
          Tilmeld dig
        </Button>
      </Box>
    </HStack>
  );
};

export default SignupSection;
