import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { Movies } from "../pages/Movies";
import { Persons } from "../pages/Persons";
import { PersonSingle} from "../pages/person";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Define the route for the homepage */}
      <Route path="/" element={<Homepage />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="/Persons" element={<Persons />} />
      <Route path="/Persons/:id" element={<PersonSingle />} />
    </Routes>
  );
};
