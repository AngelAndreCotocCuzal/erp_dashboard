from fastapi import APIRouter, HTTPException
from typing import List
from ..models import Transaction
from ..db import transactions_db

trans = APIRouter(prefix="/transactions")

# TODO: GET /Transacciones 
@trans.get("/", response_model=List[Transaction])
def get_transactions():
    if transactions_db is None:
        raise HTTPException(status_code=404, detail="No transactions found")
    return transactions_db

# TODO: POST /Transacciones
@trans.post("/", response_model=Transaction)
def create_transaction(transaction: Transaction):
    new_id = 1
    if len(transactions_db) > 0:
        new_id = transactions_db[-1]["id"] + 1
    
    new_transaction_data = transaction.model_dump()
    new_transaction_data["id"] = new_id
    
    transactions_db.append(new_transaction_data)
    return new_transaction_data

# TODO: GET /transactions/summary
@trans.get("/summary")
def get_summary():
    if transactions_db is None:
        raise HTTPException(status_code=404, detail="No transactions found")

    total_income = 0.0
    total_expense = 0.0

    for t in transactions_db:
        if isinstance(t, dict):
            amount = t.get("amount")
        else:
            amount = getattr(t, "amount", None)

        if amount is None:
            continue

        try:
            amt = float(amount)
        except (TypeError, ValueError):
            continue

        if amt > 0:
            total_income += amt
        else:
            total_expense += amt

    net_total = total_income + total_expense

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "net_total": net_total
    }

# TODO: GET /transactions/summary_by_category
@trans.get("/summary_by_category")
def get_summary_by_category():
    category_totals = {}

    for t in transactions_db:
        category = t["category"]
        amount = t["amount"]

        if category in category_totals:
            category_totals[category] += amount
        else:
            category_totals[category] = amount

    return category_totals