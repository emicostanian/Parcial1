import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/RecetaDetails.css";

const RecetaDetails = () => {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);

  useEffect(() => {
    const fetchReceta = async () => {
      const response = await fetch(`http://localhost:3000/dishes/${id}`);
      const data = await response.json();
      setReceta(data);
    };
    fetchReceta();
  }, [id]);

  if (!receta) return <div>Cargando...</div>;

  return (
    <div className="receta-details-container">
      <h1>{receta.name}</h1>
      <p className="left-aligned">Tipo: {receta.type}</p>
      <p className="left-aligned">Descripción: {receta.description}</p>
      <p className="left-aligned">Preparación: {receta.preparation}</p>
      <Link to="/" className="back-btn">Volver a la lista</Link>
      <Link to={`/editar/${receta.id}`} className="back-btn">Editar receta</Link>
    </div>
  );
};

export default RecetaDetails;
