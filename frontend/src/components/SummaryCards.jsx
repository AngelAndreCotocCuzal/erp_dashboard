function SummaryCards({ summary }) {
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("es-GT", {
      style: "currency",
      currency: "GTQ",
    }).format(amount || 0);
  };

  return (
    <div className="row mb-4">
      <div className="col-md-4 mb-3">
        <div
          className="card border-success mb-3 h-100"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header bg-transparent border-success text-success">
            Total Ingresos
          </div>
          <div className="card-body text-success">
            <h5 className="card-title display-6 fw-bold">
              <i className="bi bi-graph-up-arrow me-2"></i>
              {formatMoney(summary.total_income)}
            </h5>
            <p className="card-text">Entradas registradas.</p>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div
          className="card border-warning mb-3 h-100"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header bg-transparent border-warning text-warning">
            Total Gastos
          </div>
          <div className="card-body text-warning">
            <h5 className="card-title display-6 fw-bold">
              <i className="bi bi-graph-down-arrow me-2"></i>
              {formatMoney(summary.total_expense)}
            </h5>
            <p className="card-text">Salidas registradas.</p>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div
          className="card border-primary mb-3 h-100"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header bg-transparent border-primary text-primary">
            Balance Neto
          </div>
          <div className="card-body text-primary">
            <h5 className="card-title display-6 fw-bold">
              <i className="bi bi-wallet2 me-2"></i>
              {formatMoney(summary.net_total)}
            </h5>
            <p className="card-text">Diferencia final.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;
