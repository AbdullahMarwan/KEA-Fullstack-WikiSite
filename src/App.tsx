import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { AppRoutes } from "./routes/AppRoutes";
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

      <Box display="flex" flexDirection="column">
        <AppRoutes />
      </Box>

      <Footer />
    </Flex>
  );
}

export default App;
