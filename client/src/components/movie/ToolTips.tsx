import React from "react";
import { Box, HStack, Text, Link } from "@chakra-ui/react";
import { IoBookmark } from "react-icons/io5";
import { FaList, FaHeart } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";

function ToolTips() {
  return (
    <HStack spacing={"20px"} display={"flex"} alignItems={"center"}>
      <Link cursor={"pointer"}>
        <Box
          background={"#022441"}
          h={"50px"}
          w={"50px"}
          borderRadius="50%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
          _hover={{
            "& > div": {
              display: "block",
            },
          }}
        >
          <Box
            position={"absolute"}
            top={"100%"}
            left={"50%"}
            transform={"translateX(-50%)"}
            mt={3}
            width={"max-content"}
            backgroundColor={"#022441"}
            p={"5px 10px"}
            borderRadius={"5px"}
            display={"none"}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderWidth: "8px",
              borderStyle: "solid",
              borderColor: "transparent transparent #022441 transparent",
              width: 0,
              height: 0,
            }}
          >
            <Text fontSize={"1em"}>Add to list</Text>
          </Box>
          <FaList />
        </Box>
      </Link>

      <Link cursor={"pointer"}>
        <Box
          background={"#022441"}
          h={"50px"}
          w={"50px"}
          borderRadius="50%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
          _hover={{
            "& > div": {
              display: "block",
            },
          }}
        >
          <Box
            position={"absolute"}
            top={"100%"}
            left={"50%"}
            transform={"translateX(-50%)"}
            mt={3}
            width={"max-content"}
            backgroundColor={"#022441"}
            p={"5px 10px"}
            borderRadius={"5px"}
            display={"none"}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderWidth: "8px",
              borderStyle: "solid",
              borderColor: "transparent transparent #022441 transparent",
              width: 0,
              height: 0,
            }}
          >
            <Text fontSize={"1em"}>Mark as favorite</Text>
          </Box>
          <FaHeart />
        </Box>
      </Link>

      <Link cursor={"pointer"}>
        <Box
          background={"#022441"}
          h={"50px"}
          w={"50px"}
          borderRadius="50%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
          _hover={{
            "& > div": {
              display: "block",
            },
          }}
        >
          <Box
            position={"absolute"}
            top={"100%"}
            left={"50%"}
            transform={"translateX(-50%)"}
            mt={3}
            width={"max-content"}
            backgroundColor={"#022441"}
            p={"5px 10px"}
            borderRadius={"5px"}
            display={"none"}
            _before={{
              content: '""',
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderWidth: "8px",
              borderStyle: "solid",
              borderColor: "transparent transparent #022441 transparent",
              width: 0,
              height: 0,
            }}
          >
            <Text fontSize={"1em"}>Add to your watchlist</Text>
          </Box>
          <IoBookmark />
        </Box>
      </Link>

      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        _hover={{ color: "gray.300" }}
      >
        <IoMdPlay />
        <Link
          fontWeight={700}
          _hover={{ color: "gray.300", textDecoration: "none" }}
        >
          Play Trailer
        </Link>
      </Box>
    </HStack>
  );
}

export default ToolTips;
