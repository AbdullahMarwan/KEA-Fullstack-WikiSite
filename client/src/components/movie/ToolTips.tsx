import React from "react";
import { Box, HStack, Text, Link } from "@chakra-ui/react";
import { IoBookmark } from "react-icons/io5";
import { FaList, FaHeart } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";

function ToolTips() {
  return (
    <HStack spacing={"20px"} display={"flex"} alignItems={"center"}>
      <Box
        background={"#022441"}
        h={"50px"}
        w={"50px"}
        borderRadius="50%"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Link>
          {" "}
          <FaList />
        </Link>
      </Box>

      <Box
        background={"#022441"}
        h={"50px"}
        w={"50px"}
        borderRadius="50%"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Link>
          {" "}
          <FaHeart />
        </Link>
      </Box>

      <Box
        background={"#022441"}
        h={"50px"}
        w={"50px"}
        borderRadius="50%"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Link>
          {" "}
          <IoBookmark />
        </Link>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <IoMdPlay />
        <Text fontWeight={700}>Play Trailer</Text>
      </Box>
    </HStack>
  );
}

export default ToolTips;
