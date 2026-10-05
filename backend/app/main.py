import os

from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.config.database import (
    check_database_connection
)

from app.routes import (
    auth,
    prediction,
    history
)


app = FastAPI(

    title="Customer Churn Prediction API",

    description=(
        "AI-powered customer churn "
        "prediction and retention API"
    ),

    version="1.0.0"
)


# React frontend-এর জন্য CORS
origins = [

    origin.strip()

    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173"
    ).split(",")

    if origin.strip()
]


app.add_middleware(

    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=False,

    allow_methods=["*"],

    allow_headers=["*"]
)


# Routes
app.include_router(
    auth.router
)

app.include_router(
    prediction.router
)

app.include_router(
    history.router
)


@app.get("/")
def root():

    return {
        "message":
            "Customer Churn Prediction API is running"
    }


@app.get("/health")
def health():

    return {

        "status": "ok",

        "database":
            "connected"
            if check_database_connection()
            else "disconnected"
    }