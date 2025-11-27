import React, { useEffect, useState } from "react";
import api from "../services/api";
import SummaryCards from "../components/SummaryCards";
import CategoryBreakdown from "../components/CategoryBreakdown";

function DashboardPage() {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    net_total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("public");

  const URL_PUBLIC =
    "https://lookerstudio.google.com/embed/reporting/0B_U5RNpwhcE6QXg4SXFBVGUwMjg/page/6zXD";
  const URL_OFFICIAL =
    "https://lookerstudio.google.com/embed/reporting/0B5FF6JBKbLCSaW1VbDI2S3prYUE/page/6SXD";

  useEffect(() => {
    api
      .getSummary()
      .then((response) => {
        setSummary(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-3">
      <h2 className="mb-4">Dashboard Ejecutivo</h2>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <SummaryCards summary={summary} />
      )}

      <div className="row mt-4">
        <div className="col-lg-4 mb-4">
          <CategoryBreakdown />
        </div>

        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-dark text-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">Reporte BI</span>
                <span className="badge bg-secondary">Externo</span>
              </div>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "public"
                        ? "active text-dark fw-bold"
                        : "text-light"
                    }`}
                    onClick={() => setActiveTab("public")}
                  >
                    <i className="bi bi-eye me-2"></i>Demo Pública
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "official"
                        ? "active text-dark fw-bold"
                        : "text-light"
                    }`}
                    onClick={() => setActiveTab("official")}
                  >
                    <i className="bi bi-file-lock2 me-2"></i>Oficial (PDF)
                  </button>
                </li>
              </ul>
            </div>

            <div className="card-body p-0">
              {activeTab === "official" && (
                <div className="alert alert-warning m-0 rounded-0 border-0 text-center py-2 small">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Puede requerir permisos especiales de Google.
                </div>
              )}
              <div className="ratio ratio-4x3" style={{ maxHeight: "500px" }}>
                <iframe
                  src={activeTab === "public" ? URL_PUBLIC : URL_OFFICIAL}
                  allowFullScreen
                  style={{ border: 0 }}
                  title="Reporte Looker Studio"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
