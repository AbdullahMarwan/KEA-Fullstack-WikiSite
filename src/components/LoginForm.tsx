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
  textDecoration,
} from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <>
      <Heading fontSize={"1.5em"} fontWeight={"500"} mb={"15px"}>
        Log ind til din konto
      </Heading>
      <Text>
        In order to use the editing and rating capabilities of TMDB, as well as
        get personal recommendations you will need to login to your account. If
        you do not have an account, registering for an account is free and
        simple. <Link color={"rgba(1,180,228)"}>Click here</Link> to get
        started.
      </Text>
      <Text mt={"15px"}>
        If you signed up but didn't get your verification email,{" "}
        <Link color={"rgba(1,180,228)"}>Click here</Link> to have it resent.
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
          Log ind
        </Button>
        <Link
          color={"rgba(1,180,228)"}
          ml={"15px"}
          _hover={{ textDecoration: "none" }}
        >
          Nulstil adgangskode
        </Link>
      </Flex>
    </>
  );
};

export default LoginForm;
