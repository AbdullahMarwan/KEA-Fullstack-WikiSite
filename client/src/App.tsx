import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Movies } from "./pages/Movies";
import { Persons } from "./pages/Persons";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { SearchProvider } from "./context/SearchContext";
import PersonSingle from "./pages/Person";
import MoviesSubPage from "./pages/MoviesSubPage";
import Movie from "./pages/Movie";
import Layout from "./components/Global/Layout";

function App() {
  return (
    <>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/person/:id" element={<PersonSingle />} />
            <Route path="/moviesSubPage" element={<MoviesSubPage />} />
          </Route>
        </Routes>
      </SearchProvider>
    </>
  );
}

export default App;
