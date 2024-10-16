import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecetaList from "./Components/RecetaList";
import RecetaDetails from "./Components/RecetaDetails";
import AddReceta from "./Components/AddReceta";
import EditReceta from "./Components/EditReceta";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecetaList />} />
        <Route path="/details/:id" element={<RecetaDetails />} />
        <Route path="/agregar" element={<AddReceta />} />
        <Route path="/editar/:id" element={<EditReceta />} />
      </Routes>
    </Router>
  );
};

export default App;
