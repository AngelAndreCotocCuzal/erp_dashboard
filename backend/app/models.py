from pydantic import BaseModel
from typing import Optional

class Transaction(BaseModel):
    id: Optional[int] = None
    date: str
    description: str
    amount: float
    category: str
    