import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getTransactions() {
    return apiClient.get("/transactions");
  },

  createTransaction(data) {
    return apiClient.post("/transactions", data);
  },

  getSummary() {
    return apiClient.get("/transactions/summary");
  },

  getSummaryByCategory() {
    return apiClient.get("/transactions/summary_by_category");
  },
};
