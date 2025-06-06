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
import { useState } from "react";
import axios from "axios"; // Change this line - import axios directly

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(
        "Making login request to:",
        `${import.meta.env.VITE_API_URL}/api/users/login`
      );

      // Replace authApi with direct axios call
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      // Store the formatted object as a JSON string
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.user.user_id, // Store user_id as id
          ...response.data.user, // Include all other user data
        })
      );

      // Notify other parts of the app about the login state change
      window.dispatchEvent(new Event('loginStateChange'));

      // Navigate to user page with first name in URL
      navigate(`/user/${response.data.user.first_name.toLowerCase()}`);

      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
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
      <Heading fontSize={"1.5em"} fontWeight={"500"} mb={"15px"}>
        Log ind til din konto
      </Heading>
      <Text>
        In order to use the editing and rating capabilities of TMDB, as well as
        get personal recommendations you will need to login to your account. If
        you do not have an account, registering for an account is free and
        simple.{" "}
        <Link
          as={ReactRouterLink}
          to="/Signup"
          width={"150px"}
          color={"rgba(1,180,228)"}
        >
          Click here
        </Link>{" "}
        to get started.
      </Text>
      <Text mt={"15px"}>
        If you signed up but didn't get your verification email,{" "}
        <Link color={"rgba(1,180,228)"}>Click here</Link> to have it resent.
      </Text>
      <FormControl isRequired mt={"15px"} as="form" onSubmit={handleLogin}>
        <FormLabel htmlFor="email" fontWeight={"400"}>
          Email
        </FormLabel>
        <Input
          id="email"
          type="email" // Change input type to email
          placeholder="Indtast email"
          border="1px solid grey"
          _selected={{ border: "2px solid rgba(1,180,228)" }}
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
          _selected={{ border: "2px solid rgba(1,180,228)" }}
          _hover={{ border: "1px solid grey" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Box that changes alignment based on screen size */}
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
      </FormControl>
    </>
  );
};

export default LoginForm;
