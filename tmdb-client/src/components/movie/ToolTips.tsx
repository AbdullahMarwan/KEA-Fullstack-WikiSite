import React from "react";
import { Box, HStack, Text, Link, useToast } from "@chakra-ui/react";
import { IoBookmark } from "react-icons/io5";
import { FaList, FaHeart } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";
import axios from "axios";
import { useMovie } from "../../context/MovieContext";

function ToolTips() {
  const toast = useToast();
  const { movie } = useMovie(); // Get the current movie from context

  const handleAddToFavorites = async () => {
    try {
      // Get user ID from localStorage (reusing the pattern from favoriteList.tsx)
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        console.error("No user found in localStorage");
        toast({
          title: "Not logged in",
          description: "Please log in to add favorites",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const userData = JSON.parse(userStr);

      // Find the user ID based on the data structure
      let userId;
      if (userData.id) {
        userId = userData.id;
      } else if (userData.user_id) {
        userId = userData.user_id;
      } else if (userData.user && userData.user.user_id) {
        userId = userData.user.user_id;
      }

      if (!userId) {
        console.error("Could not find user ID in stored data:", userData);
        return;
      }

      console.log(`Adding content ${movie.id} to favorites for user ${userId}`);

      // Make API call to add to favorites
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/favorites`,
        {
          user_id: userId,
          content_id: movie.id,
        }
      );

      // Show success toast
      toast({
        title: "Added to favorites",
        description: "This movie has been added to your favorites",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);

      // Show error toast
      toast({
        title: "Error",
        description: "Failed to add to favorites. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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

      <Link cursor={"pointer"} onClick={handleAddToFavorites}>
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
