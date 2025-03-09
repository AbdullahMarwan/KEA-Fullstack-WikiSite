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
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import BurgerMenu from "./BurgerMenu"; // Import the BurgerMenu component

const NavBar = () => {
  const displayLinks = useBreakpointValue({ base: "none", md: "flex" });
  const displayIcons = useBreakpointValue({ base: "flex", md: "none" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headerSize = "65px";

  return (
    <HStack h={headerSize} padding="20px" justifyContent="center">
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
        <HStack width={"40%"} justifyContent="center">
          <Image src={logo} alt="logo" maxWidth="150px" />

          <UnorderedList
            display={displayLinks}
            styleType="none"
            m={0}
            p={0}
            sx={{
              "& > li > a": {
                fontSize: "1em",
                color: "white",
                fontWeight: "500",
                px: "10px",
              },
            }}
          >
            <ListItem>
              <Link href="#">Film</Link>
            </ListItem>
            <ListItem>
              <Link href="#">TV-serier</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Personer</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Mere</Link>
            </ListItem>
          </UnorderedList>
        </HStack>

        <HStack height={"2em"} display={"flex"}>
          <Box boxSize="24px" mr={"10px"} display={displayLinks}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="white"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
          </Box>

          <UnorderedList
            display={displayLinks}
            styleType="none"
            m={0}
            p={0}
            sx={{
              "& > li > a": {
                fontSize: "1em",
                color: "white",
                fontWeight: "500",
                px: "10px",
              },
            }}
          >
            <ListItem>
              <Button
                border="1px solid white"
                bg="transparent"
                padding="0px"
                h="100%"
                px="10px"
                p={"5px"}
              >
                DA
              </Button>
            </ListItem>
            <ListItem>
              <Link href="#">Log ind</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Bliv medlem af TMDB</Link>
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
          <Box boxSize="1.5em">
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

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          mt={headerSize}
          height={`calc(100vh - ${headerSize})`}
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
