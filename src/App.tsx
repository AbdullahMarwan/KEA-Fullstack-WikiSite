// src/App.tsx
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Movies } from "./pages/Movies";
import { Persons } from "./pages/Persons";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Flex, Box } from "@chakra-ui/react";

// This is your layout component (inline)
const Layout = () => {
  return (
    <Flex direction="column" minHeight="100vh" height="100%">
      <Box bg="#032440" zIndex={9}>
        <NavBar />
      </Box>

      <Box display="flex" flexDirection="column" flex="1">
        <Outlet />
      </Box>

      <Footer />
    </Flex>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/persons" element={<Persons />} />
      </Route>
    </Routes>
  );
}

export default App;
