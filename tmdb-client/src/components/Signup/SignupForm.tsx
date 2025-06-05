import React, { useState } from "react";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }
      );

      toast({
        title: "Account created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description:
          error.response?.data?.message || "Could not create account",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading fontSize={"1.5em"} fontWeight={"700"} mb={"15px"}>
        Tilmeld dig her
      </Heading>
      <Text>
        Opret en konto. Det er gratis og nemt. Udfyld formen nedenfor for at
        komme i gang. JavaScript er påkrævet for at fortsætte
      </Text>

      <FormControl isRequired mt={"15px"} as="form" onSubmit={handleSignup}>
        <FormLabel htmlFor="firstname" fontWeight={"400"}>
          firstname
        </FormLabel>
        <Input
          id="firstName"
          placeholder="Enter first name"
          border="1px solid grey"
          _selected={{ border: "2px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <FormLabel htmlFor="lastname" fontWeight={"400"}>
          lastname
        </FormLabel>
        <Input
          id="lastName"
          placeholder="Enter last name"
          border="1px solid grey"
          _selected={{ border: "2px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
        />

        <FormLabel htmlFor="email" mt={4} fontWeight={"400"}>
          E-mail
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Indtast email"
          border="1px solid grey"
          _selected={{ border: "1px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormLabel htmlFor="confirmPassword" mt={4} fontWeight={"400"}>
          Godkend adgangskode
        </FormLabel>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Indtast password igen"
          border="1px solid grey"
          _selected={{ border: "1px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Flex
          mt={"15px"}
          alignItems={"center"}
          justifyContent={{ base: "center", md: "flex-start" }}
          width="100%"
        >
          <Button
            fontWeight={"400"}
            backgroundColor={"#dee2e6"}
            color={"black"}
            _hover={{ backgroundColor: "#ced4da" }}
            type="submit"
            isLoading={isLoading}
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
      </FormControl>
    </>
  );
};

export default SignupForm;
