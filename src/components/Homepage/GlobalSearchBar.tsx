// src/components/GlobalSearchBar.tsx
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useSearch } from "../../context/SearchContext";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";

const GlobalSearchBar = () => {
  const { isSearchVisible } = useSearch();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Don't render anything on homepage since it's already shown there
  if (isHomePage) return null;

  return (
    <AnimatePresence>
      {isSearchVisible && (
        <Box
          position="fixed"
          top="65px" // Adjust based on your navbar height
          left="0"
          width="100%"
          zIndex={5}
          bg="#032440"
          as={motion.div}
        >
          <SearchBar />
        </Box>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearchBar;
