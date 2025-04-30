// src/components/Layout.tsx
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import GlobalSearchBar from "../Homepage/GlobalSearchBar";


const Layout = () => {
  return (
    <Flex direction="column" minHeight="100vh" height="100%">
      <Box bg="#032440" zIndex={9} position="sticky" top={0}>
        <NavBar />
      </Box>

      {/* Global search bar that appears when search icon is clicked */}
      <GlobalSearchBar />

      <Box display="flex" flexDirection="column" flex="1">
        <Outlet />
      </Box>

      <Footer />
    </Flex>
  );
};

export default Layout;
