import React from "react";
import { Button, HStack, Input } from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <HStack h={"50px"} bg={"white"} gap={"0px"} w={"100%"}>
      <Button h={"100%"} pl={"20px"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#000101"
          width={"1em"}
          height={"1em"}
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
      </Button>

      <Input
        placeholder="Søg"
        fontSize={"1em"}
        bg="white"
        borderRadius="none"
        color="black"
        _placeholder={{ color: "gray.500" }} // Placeholder color
        focusBorderColor="transparent" // Remove border color on focus
        height={"100%"}
        p={"0px"}
        w={"100%"}
      />
    </HStack>
  );
};

export default SearchBar;
