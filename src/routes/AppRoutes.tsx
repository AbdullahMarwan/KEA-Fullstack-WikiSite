import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { Movies } from "../pages/Movies";
import { Persons } from "../pages/Persons";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="/Persons" element={<Persons />} />
    </Routes>
  );
};
