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


# Create FastAPI app
app = FastAPI(

    title="Customer Churn Prediction API",

    description=(
        "AI-powered customer churn "
        "prediction and retention system."
    ),

    version="1.0.0"
)


# React frontend URL
origins = [

    origin.strip()

    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173"
    ).split(",")

    if origin.strip()
]


# CORS middleware
app.add_middleware(

    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=False,

    allow_methods=["*"],

    allow_headers=["*"]
)


# Register routers
app.include_router(
    auth.router
)

app.include_router(
    prediction.router
)

app.include_router(
    history.router
)


# Root endpoint
@app.get("/")
def root():

    return {

        "message":
            "Customer Churn Prediction API is running"
    }


# Health endpoint
@app.get("/health")
def health():

    return {

        "status":
            "ok",

        "database":
            (
                "connected"
                if check_database_connection()
                else "disconnected"
            )
    }