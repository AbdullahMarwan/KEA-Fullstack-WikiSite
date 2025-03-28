// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { Movies } from "../pages/Movies";
import { Persons } from "../pages/Persons";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import App from "../App";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/persons" element={<Persons />} />
      </Route>
    </Routes>
  );
};
