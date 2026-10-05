from typing import Literal

from pydantic import BaseModel, Field


YesNo = Literal["Yes", "No"]


class CustomerInput(BaseModel):

    gender: Literal["Female", "Male"]

    SeniorCitizen: Literal[0, 1]

    Partner: YesNo

    Dependents: YesNo

    tenure: int = Field(
        ge=0,
        le=72
    )

    PhoneService: YesNo

    MultipleLines: Literal[
        "Yes",
        "No",
        "No phone service"
    ]

    InternetService: Literal[
        "DSL",
        "Fiber optic",
        "No"
    ]

    OnlineSecurity: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    OnlineBackup: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    DeviceProtection: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    TechSupport: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    StreamingTV: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    StreamingMovies: Literal[
        "Yes",
        "No",
        "No internet service"
    ]

    Contract: Literal[
        "Month-to-month",
        "One year",
        "Two year"
    ]

    PaperlessBilling: YesNo

    PaymentMethod: Literal[
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)"
    ]

    MonthlyCharges: float = Field(
        ge=0
    )

    TotalCharges: float = Field(
        ge=0
    )


class ShapFactor(BaseModel):
    feature: str
    impact: float
    direction: Literal[
        "increases churn",
        "decreases churn"
    ]


class PredictionResponse(BaseModel):
    prediction_id: str
    prediction: Literal[
        "Churn",
        "No Churn"
    ]
    churn_probability: float
    risk_level: Literal[
        "Low",
        "Medium",
        "High"
    ]
    top_factors: list[ShapFactor]
    recommendations: list[str]


class HistoryItem(BaseModel):
    id: str
    prediction: Literal[
        "Churn",
        "No Churn"
    ]
    churn_probability: float
    risk_level: Literal[
        "Low",
        "Medium",
        "High"
    ]
    top_factors: list[ShapFactor]
    recommendations: list[str]
    created_at: str