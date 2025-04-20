import React from "react";
import { Text, HStack, Box, Flex, Heading } from "@chakra-ui/react";
import { TiArrowSortedDown } from "react-icons/ti";

function SecondaryNav() {
  return (
    <>
      <HStack
        h={"50px"}
        background="white"
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        spacing={"20px"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Text fontSize={"1.15em"} fontWeight={"400"} pr={"5px"}>
            Oversigt
          </Text>
          <TiArrowSortedDown />
        </Box>{" "}
        <Box display={"flex"} alignItems={"center"}>
          <Text fontSize={"1.15em"} fontWeight={"400"} pr={"5px"}>
            Media
          </Text>
          <TiArrowSortedDown />
        </Box>{" "}
        <Box display={"flex"} alignItems={"center"}>
          <Text fontSize={"1.15em"} fontWeight={"400"} pr={"5px"}>
            Fandom
          </Text>
          <TiArrowSortedDown />
        </Box>{" "}
        <Box display={"flex"} alignItems={"center"}>
          <Text fontSize={"1.15em"} fontWeight={"400"} pr={"5px"}>
            Del
          </Text>
          <TiArrowSortedDown />
        </Box>
        s
      </HStack>
    </>
  );
}

export default SecondaryNav;
