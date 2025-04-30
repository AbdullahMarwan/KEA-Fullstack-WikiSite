import {
  HStack,
  Image,
  Box,
  Button,
  Link,
  useBreakpointValue,
  UnorderedList,
  ListItem,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import BurgerMenu from "./BurgerMenu"; // Import the BurgerMenu component
import { Link as ReactRouterLink } from "react-router-dom";
import LanguageContainer from "../Homepage/LanguageContainer";
import { useSearch } from "../../context/SearchContext";
import { IoSearchSharp } from "react-icons/io5";
import logomobile from "../../assets/moviedb - logo vertical.svg";

const NavBar = () => {
  const { focusSearchInput } = useSearch();
  const displayLinks = useBreakpointValue({ base: "none", md: "flex" });
  const displayIcons = useBreakpointValue({ base: "flex", md: "none" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      h={"65px"}
      className="navBar"
      justifyContent="center"
      padding="20px"
    >
      <HStack justifyContent="space-between" w="100%" maxWidth="1300px">
        <Box
          boxSize="1.5em"
          display={displayIcons}
          onClick={onOpen}
          cursor="pointer"
        >
          <svg
            aria-label="burger menu"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="white"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </Box>
        <HStack justifyContent="center">
          ;
          <Link as={ReactRouterLink} to="/" width={"150px"}>
            <Image
              src={useBreakpointValue({ base: logomobile, md: logo })}
              alt="logo"
              maxHeight={useBreakpointValue({ base: "45px", md: "150px" })} // Adjust the size for base and md
              m={0}
            />
          </Link>
          <UnorderedList
            display={displayLinks}
            styleType="none"
            m={0}
            p={0}
            sx={{
              "& > li > a": {
                fontSize: "1em",
                color: "white",
                fontWeight: "600",
                px: "10px",
              },
            }}
          >
            <ListItem>
              <Menu>
                <MenuButton
                  as={Link}
                  _hover={{ textDecoration: "none", color: "gray.300" }}
                  color="white"
                  fontWeight="600"
                >
                  Film
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={ReactRouterLink}
                    to="/moviesSubPage?category=popular"
                  >
                    Popular
                  </MenuItem>
                  <MenuItem
                    as={ReactRouterLink}
                    to="/moviesSubPage?category=now-playing"
                  >
                    Now Playing
                  </MenuItem>
                  <MenuItem
                    as={ReactRouterLink}
                    to="/moviesSubPage?category=upcoming"
                  >
                    Upcoming
                  </MenuItem>
                  <MenuItem
                    as={ReactRouterLink}
                    to="/moviesSubPage?category=top-rated"
                  >
                    Top Rated
                  </MenuItem>
                </MenuList>
              </Menu>
            </ListItem>
            <ListItem>
              <Link
                as={ReactRouterLink}
                to="/"
                width={"150px"}
                _hover={{ textDecoration: "none" }}
              >
                TV-serier
              </Link>
            </ListItem>
            <ListItem>
              <Link
                as={ReactRouterLink}
                to="/persons"
                width={"150px"}
                _hover={{ textDecoration: "none" }}
              >
                Personer
              </Link>
            </ListItem>
          </UnorderedList>
        </HStack>

        <HStack height={"2em"} display={"flex"}>
          <UnorderedList
            display={displayLinks}
            styleType="none"
            m={0}
            p={0}
            sx={{
              "& > li > a": {
                fontSize: "1em",
                color: "white",
                fontWeight: "600",
                px: "10px",
              },
            }}
          >
            <ListItem>
              <Link
                as={ReactRouterLink}
                to="/Login"
                width={"150px"}
                fontWeight={"600"}
                _hover={{ textDecoration: "none" }}
              >
                Log ind
              </Link>
            </ListItem>
            <ListItem>
              <Link
                as={ReactRouterLink}
                to="/Signup"
                width={"150px"}
                _hover={{ textDecoration: "none" }}
              >
                Bliv medlem af TMDB
              </Link>
            </ListItem>
          </UnorderedList>

          <Box boxSize="1.5em" display={displayIcons} mr={"10px"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="white"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
          </Box>
          <Box
            boxSize="1.5em" // Increase the box size to make the icon bigger
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={focusSearchInput}
            cursor="pointer"
            color="rgb(1,181,229)" // Set the color of the icon
            fontSize="1.5em" // Adjust the font size to scale the icon
            className="search-icon" // Add this class
          >
            <IoSearchSharp />
          </Box>
        </HStack>
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          mt={"65px"}
          height={`calc(100vh - {"65px"})`}
          bg="rgba(3, 37, 65, 0.8)"
          backdropFilter="blur(10px)" // Add blur effect to the background
        >
          <DrawerBody>
            <Box bg="transparent" p={4} borderRadius="md">
              <BurgerMenu /> {/* Use the BurgerMenu component */}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default NavBar;
