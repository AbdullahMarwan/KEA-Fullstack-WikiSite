import React from "react";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Flex,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const SignupForm = () => {
  return (
    <>
      <Heading fontSize={"1.5em"} fontWeight={"700"} mb={"15px"}>
        Tilmeld dig her
      </Heading>
      <Text>
        Opret en konto. Det er gratis og nemt. Udfyld formen nedenfor for at
        komme i gang. JavaScript er påkrævet for at fortsætte
      </Text>

      <FormControl isRequired mt={"15px"}>
        <FormLabel htmlFor="username" fontWeight={"400"}>
          Brugernavn
        </FormLabel>
        <Input
          id="username"
          placeholder="Indtast brugernavn"
          border="1px solid grey"
          _selected={{ border: "2px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
        />
        <FormLabel htmlFor="password" mt={4} fontWeight={"400"}>
          Adgangskode
        </FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="Indtast password"
          border="1px solid grey"
          _selected={{ border: "1px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
        />

        <FormLabel htmlFor="password" mt={4} fontWeight={"400"}>
          Godkend adgangskode
        </FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="Indtast password"
          border="1px solid grey"
          _selected={{ border: "1px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
        />
        <FormLabel htmlFor="password" mt={4} fontWeight={"400"}>
          E-mail
        </FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="Indtast password"
          border="1px solid grey"
          _selected={{ border: "1px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
        />
      </FormControl>

      {/* Box that changes alignment based on screen size */}
      <Flex
        mt={"15px"}
        alignItems={"center"}
        justifyContent={{ base: "center", md: "flex-start" }} // Centered below 768px (base)
        width="100%"
      >
        <Button
          fontWeight={"400"}
          backgroundColor={"#dee2e6"}
          color={"black"}
          _hover={{ backgroundColor: "#ced4da" }}
        >
          Tilmeld dig
        </Button>

        <Link
          ml={"15px"}
          as={ReactRouterLink}
          to="/Login"
          color={"rgba(1,180,228)"}
          _hover={{ textDecoration: "none" }}
        >
          Annullér
        </Link>
      </Flex>
    </>
  );
};

export default SignupForm;
