function TransactionList({ transactions }) {
  return (
    <div className="card">
      <div className="card-header"></div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th className="text-end">Monto</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-3"></td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.id}>
                    <td>{t.date}</td>
                    <td>{t.description}</td>
                    <td>
                      <span className="badge bg-secondary">{t.category}</span>
                    </td>
                    <td
                      className={`text-end fw-bold ${
                        t.amount >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {t.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionList;
