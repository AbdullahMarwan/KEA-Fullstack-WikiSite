import React from "react";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { Movies } from "../pages/Movies";
import { Persons } from "../pages/Persons";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Define the route for the homepage */}
      <Route path="/" element={<Homepage />} />
      <Route path="/Movies" element={<Movies />} />
      <Route path="/Persons" element={<Persons />} />
    </Routes>
  );
};
