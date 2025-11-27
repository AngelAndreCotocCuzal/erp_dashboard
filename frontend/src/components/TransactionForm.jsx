import React, { useState } from "react";
import api from "../services/api";

function TransactionForm({ onTransactionAdded }) {
  const initialState = {
    date: "",
    description: "",
    amount: "",
    category: "Ventas",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      await api.createTransaction(payload);

      setFormData(initialState);

      if (onTransactionAdded) {
        onTransactionAdded();
      }
    } catch (error) {
      alert("Error al guardar la transacción");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">Nueva Transacción</div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Ej: Venta de servicios"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Monto</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              placeholder="0.00"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <div className="form-text text-muted">
              Use negativo para gastos (-).
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Categoría</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Ventas">Ventas</option>
              <option value="Salarios">Salarios</option>
              <option value="Marketing">Marketing</option>
              <option value="Operaciones">Operaciones</option>
              <option value="Infraestructura">Infraestructura</option>
            </select>
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">
              <i className="bi bi-plus-circle me-1"></i> Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
