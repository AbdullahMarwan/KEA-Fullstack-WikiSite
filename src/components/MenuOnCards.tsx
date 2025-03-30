import React from 'react';
import {
  HStack,
  Text,
  Box,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { FaEllipsisH, FaHeart, FaStar } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";

interface MenuOnCardsProps {
  movie: { id: number }; // Define the expected structure of the movie prop
  type: string; // Add type to distinguish between datasets
}

const MenuOnCards: React.FC<MenuOnCardsProps> = ({ movie, type }) => {
  return (
    <>
      <HStack
        position="absolute"
        top="10px"
        right="10px"
        width="2em"
        height="2em"
        backgroundColor="rgba(128, 128, 128, 0.7)"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        _hover={{
          backgroundColor: "#01b5e5",
        }}
        onClick={(e) => {
          e.stopPropagation();
          const menu = document.getElementById(`menu-${type}-${movie.id}`);
          if (menu) {
            const isMenuVisible = menu.style.display === "block";
            menu.style.display = isMenuVisible ? "none" : "block";
          }
        }}
      >
        <FaEllipsisH color="rgb(3, 37, 65)" />
      </HStack>

      {/* Dropdown menu */}
      <Box
        id={`menu-${type}-${movie.id}`} // Use type and movie.id for unique identification
        position="absolute"
        top="40px"
        right="10px"
        backgroundColor="white"
        borderRadius="8px"
        boxShadow="0 2px 10px rgba(0,0,0,0.2)"
        zIndex={10}
        display="none"
        width="200px"
      >
        <UnorderedList styleType="none" margin={0} padding={0}>
          <ListItem
            display="flex"
            alignItems="center"
            padding="10px 20px"
            color="black"
            cursor="pointer"
            _hover={{
              backgroundColor: "black",
              color: "white",
              svg: { color: "white" },
            }}
          >
            <Box
              boxSize={"1em"}
              fontSize={"1em"}
              color="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="transparent"
            >
              <FaHeart />
            </Box>
            <Text ml="10px" fontWeight="600">
              Favorite
            </Text>
          </ListItem>
          <ListItem
            display="flex"
            alignItems="center"
            padding="10px 20px"
            color="black"
            cursor="pointer"
            _hover={{
              backgroundColor: "black",
              color: "white",
              svg: { color: "white" },
            }}
          >
            <Box
              boxSize={"1em"}
              fontSize={"1em"}
              color="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="transparent"
            >
              <IoBookmark />
            </Box>
            <Text ml="10px" fontWeight="600">
              Bookmark
            </Text>
          </ListItem>
          <ListItem
            display="flex"
            alignItems="center"
            padding="10px 20px"
            color="black"
            cursor="pointer"
            _hover={{
              backgroundColor: "black",
              color: "white",
              svg: { color: "white" },
            }}
          >
            <Box
              boxSize={"1em"}
              fontSize={"1em"}
              color="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              backgroundColor="transparent"
            >
              <FaStar />
            </Box>
            <Text ml="10px" fontWeight="600">
              Rate
            </Text>
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};

export default MenuOnCards;