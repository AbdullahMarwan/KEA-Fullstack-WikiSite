import {
  HStack,
  Box,
  Text,
  useDisclosure,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const AddMovie = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const displayLinks = useBreakpointValue({ base: "none", md: "flex" });

  return (
    <HStack>
      <Box
        boxSize="24px"
        mr={"10px"}
        display={displayLinks}
        position={"relative"}
        onClick={(e) => {
          e.stopPropagation();
          isOpen ? onClose() : onOpen();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="white"
          cursor={"pointer"}
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
        {isOpen && (
          <HStack
            position="absolute"
            top="100%"
            left="50%"
            transform="translateX(-50%)"
            width="300px"
            mt="10px"
            padding="20px"
            background="white"
            borderRadius="md"
            boxShadow="0 2px 10px rgba(0,0,0,0.1)"
            zIndex={1000}
          >
            <Box>
              <Text>
                Kan du ikke finde en film eller TV-serie?{" "}
                <Link as={ReactRouterLink} to="/Login" color={"#01B5E5"}>
                  log ind
                </Link>{" "}
                og opret den.
              </Text>
            </Box>
          </HStack>
        )}
      </Box>
    </HStack>
  );
};

export default AddMovie;
