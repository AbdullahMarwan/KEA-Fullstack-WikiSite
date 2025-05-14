import React, { useRef, useEffect } from "react";
import {
  Button,
  HStack,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useSearch } from "../../context/SearchContext";
import TrendingMoviesSearch from "./TrendingMoviesSearch";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchInputRef } = useSearch();
  const searchBarRef = useRef<HTMLDivElement>(null); // Ref for the search bar container

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the dropdown if the click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <HStack
      ref={searchBarRef} // Attach the ref to the container
      h={"50px"}
      bg={"white"}
      w={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
      boxShadow={"md"} // Add box shadow
    >
      <Box
        maxW={"1300px"}
        width={"100%"}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
        <FormControl as="form" width="100%" maxW={"1300px"} border={"none"}>
          <InputGroup height={"50px"}>
            <InputLeftElement
              height="100%" // Ensure it takes the full height of the input
              pointerEvents="none" // Prevent interaction with the element
            >
              <Button
                width={"1em"}
                height={"1em"}
                p={0}
                bg="transparent"
                _hover={{ bg: "transparent" }}
              >
                <Box
                  boxSize={"1.5em"}
                  fontSize={"1.5em"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  color="black"
                >
                  <IoSearchSharp />
                </Box>
              </Button>
            </InputLeftElement>
            <Input
              ref={searchInputRef} // Connect to the ref from context
              border={"none"}
              placeholder="Search for a movie, TV show, or person"
              fontSize={"1em"}
              bg="white"
              borderRadius="none"
              color="black"
              _placeholder={{ color: "gray.500" }} // Placeholder color
              focusBorderColor="transparent" // Remove border color on focus
              height={"100%"}
              p={"0px"}
              pl={"2.5em"} // Add padding to the left to avoid overlap with the button
              h="50px"
              w={"100%"}
              onClick={(e) => {
                e.stopPropagation();
                onOpen(); // Open the dropdown when clicking inside the input
              }}
            />
          </InputGroup>
        </FormControl>
      </Box>
      {isOpen && <TrendingMoviesSearch />}
    </HStack>
  );
};

export default SearchBar;
