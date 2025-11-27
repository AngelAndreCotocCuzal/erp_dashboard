from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import transactions

app = FastAPI(title="ERP Dashboard API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions.trans)

@app.get("/")
def root():
    return {"message": "Welcome to the ERP Dashboard API"}

