import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddReceta.css";

const AddReceta = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    preparation: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="add-receta-container">
        <h1>Agregar Nueva Receta</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
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
              id="description"
              name="description"
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
              id="type"
              name="type"
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
              id="preparation"
              name="preparation"
              placeholder="Preparación"
              value={formData.preparation}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default AddReceta;
