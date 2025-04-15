// src/App.tsx
import NavBar from "./components/Global/NavBar";
import Footer from "./components/Global/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Movies } from "./pages/Movies";
import { Persons } from "./pages/Persons";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Flex, Box } from "@chakra-ui/react";
import { SearchProvider } from "./context/SearchContext";
import GlobalSearchBar from "./components/Homepage/GlobalSearchBar";
import PersonSingle from "./pages/Person";
import MoviesSubPage from "./pages/MoviesSubPage";
import Movie from "./pages/Movie";
import ResetCSS from "./components/Global/ResetCSS";

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

function App() {
  return (
    <>
      <ResetCSS />
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/persons/:id" element={<PersonSingle />} />
            <Route path="/moviesSubPage" element={<MoviesSubPage />} />
          </Route>
        </Routes>
      </SearchProvider>
    </>
  );
}

export default App;
