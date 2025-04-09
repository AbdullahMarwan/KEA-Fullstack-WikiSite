// src/components/Layout.tsx
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex direction="column" minHeight="100vh" height="100%">
      <Box bg="#032440">
        <NavBar />
      </Box>

      <Box display="flex" flexDirection="column" flex="1">
        <Outlet />
      </Box>

      <Footer />
    </Flex>
  );
};

export default Layout;
