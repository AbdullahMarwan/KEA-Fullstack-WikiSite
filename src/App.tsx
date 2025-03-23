// src/App.tsx
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

function App() {
  return (
    <Flex
      direction="column"
      minHeight="100vh" // Ensure full viewport height
      height="100%" // This is important for nested flex containers
    >
      <Box bg="#032440">
        <NavBar />
      </Box>

      <Box display="flex" flexDirection="column" flex="1">
        <Outlet />
      </Box>

      <Footer />
    </Flex>
  );
}

export default App;
