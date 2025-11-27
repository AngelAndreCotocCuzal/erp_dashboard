import React, { useEffect, useState } from "react";
import api from "../services/api";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    api
      .getTransactions()
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error conectando con el servidor");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="py-3">
      <h2 className="mb-4">Gestión Financiera</h2>

      <TransactionForm onTransactionAdded={fetchData} />

      <hr className="my-4" />

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </div>
  );
}

export default TransactionsPage;
