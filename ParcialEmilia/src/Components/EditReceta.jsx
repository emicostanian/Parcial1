import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditReceta.css";

const EditReceta = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceta = async () => {
      const response = await fetch(`http://localhost:3000/dishes/${id}`);
      const data = await response.json();
      setFormData(data);
    };
    fetchReceta();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/dishes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    navigate(`/details/${id}`);
  };

  if (!formData) return <div>Cargando...</div>;

  return (
    <div className="container">
      <div className="edit-receta-container">
        <h1>Editar Receta</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Tipo</label>
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Tipo"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="preparation">Preparación</label>
            <input
              type="text"
              name="preparation"
              id="preparation"
              placeholder="Preparación"
              value={formData.preparation}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditReceta;
