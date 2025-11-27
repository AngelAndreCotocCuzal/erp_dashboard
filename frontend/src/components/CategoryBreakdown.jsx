import { useEffect, useState } from "react";
import api from "../services/api";

function CategoryBreakdown() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  // Formateador de dinero
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(amount || 0);
  };

  useEffect(() => {
    api
      .getSummaryByCategory()
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error cargando categorías:", error));
  }, []);

  if (loading)
    return <div className="text-center p-3">Cargando desglose...</div>;

  const categoryList = Object.entries(categories).sort(
    (a, b) => Math.abs(b[1]) - Math.abs(a[1])
  );

  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-header bg-white border-bottom-0 fw-bold">
        <i className="bi bi-pie-chart-fill me-2 text-primary"></i>
        Desglose por Categoría
      </div>
      <ul className="list-group list-group-flush">
        {categoryList.length === 0 ? (
          <li className="list-group-item text-muted">No hay datos aún.</li>
        ) : (
          categoryList.map(([name, amount]) => (
            <li
              key={name}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className="fw-medium">
                <i className="bi bi-tag me-2 text-muted"></i>
                {name}
              </span>
              <span
                className={`badge rounded-pill ${
                  amount >= 0
                    ? "bg-success bg-opacity-10 text-success"
                    : "bg-danger bg-opacity-10 text-danger"
                }`}
              >
                {formatMoney(amount)}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CategoryBreakdown;
