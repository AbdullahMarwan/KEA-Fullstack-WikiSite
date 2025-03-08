import { HStack, Image, Text, Box, Button, Link } from "@chakra-ui/react";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import logo from "../assets/logo.svg";

const NavBar = () => {
  return (
    <HStack h="65px" margin="10px" w="100%" justifyContent="center">
      <HStack justifyContent="space-between" w="100%" maxWidth="1300px">
        <HStack spacing="24px">
          <Image src={logo} alt="logo" boxSize="150px" />

          <Link href="#" fontSize="1em" color="white" fontWeight="500">
            Film
          </Link>
          <Link href="#" fontSize="1em" color="white" fontWeight="500">
            TV-serier
          </Link>
          <Link href="#" fontSize="1em" color="white" fontWeight="500">
            Personer
          </Link>
          <Link href="#" fontSize="1em" color="white" fontWeight="500">
            Mere
          </Link>
        </HStack>

        <HStack spacing="24px">
          <Box boxSize="24px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="white"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
          </Box>
          <Button>DA</Button>
          <Link href="#" fontSize="1em" color="white" fontWeight="500">
            Log ind
          </Link>
          <Link href="#" fontSize="1em" color="white" fontWeight="500">
            Bliv medlem af TMDB
          </Link>
          <Box boxSize="24px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="rgb(1,181,229)"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </Box>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default NavBar;
