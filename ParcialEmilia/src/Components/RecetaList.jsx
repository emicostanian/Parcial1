import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RecetaList.css";

const RecetaList = () => {
  const [recetas, setRecetas] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("todos");
  const [darkMode, setDarkMode] = useState(false); 
  const tipos = ["todos", "italiana", "mexicana", "vegana", "ensalada", "japonesa", "mediterranea", "india", "americana"]; 

  useEffect(() => {
    const fetchRecetas = async () => {
      const response = await fetch("http://localhost:3000/dishes");
      const data = await response.json();
      setRecetas(data);
    };
    fetchRecetas();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/dishes/${id}`, {
      method: "DELETE",
    });
    setRecetas(recetas.filter((receta) => receta.id !== id));
  };

  const handleFilterChange = (e) => {
    setTipoSeleccionado(e.target.value);
  };

  const filteredRecetas = tipoSeleccionado === "todos" 
    ? recetas 
    : recetas.filter(receta => receta.type === tipoSeleccionado);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`receta-list-container ${darkMode ? "dark" : "light"}`}>
      <h1 className="main-title">Recetas Disponibles</h1>
      <div className="header">
        <Link to="/agregar" className="add-receta-btn">Agregar Nueva Receta</Link>
        <select onChange={handleFilterChange} value={tipoSeleccionado}>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </option>
          ))}
        </select>
        <button onClick={toggleDarkMode}>Cambiar Tema</button> {/* cambiar oscuro/claro */}
      </div>
      <div className="receta-list">
        {filteredRecetas.map((receta) => (
          <div className={`receta-card ${darkMode ? "dark" : ""}`} key={receta.id}>
            <h2 className="receta-title">{receta.name}</h2>
            <p>Tipo: {receta.type}</p>
            <Link to={`/details/${receta.id}`} className="details-btn">Ver detalles</Link>
            <button className="delete-btn" onClick={() => handleDelete(receta.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecetaList;
