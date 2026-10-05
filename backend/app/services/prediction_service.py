import pandas as pd

from app.schemas.prediction_schema import CustomerInput

from app.utils.model_loader import get_model

from app.utils.recommendation import (
    generate_recommendations
)

from app.services.shap_service import (
    explain_prediction
)


FEATURE_COLUMNS = [

    "gender",
    "SeniorCitizen",
    "Partner",
    "Dependents",
    "tenure",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
    "MonthlyCharges",
    "TotalCharges"
]


def build_dataframe(
    data: CustomerInput
) -> pd.DataFrame:

    values = data.model_dump()

    return pd.DataFrame(
        [values],
        columns=FEATURE_COLUMNS
    )


def get_risk_level(
    probability: float
) -> str:

    if probability >= 0.70:
        return "High"

    if probability >= 0.40:
        return "Medium"

    return "Low"


def predict_customer(
    data: CustomerInput
) -> dict:

    model = get_model()

    customer_df = build_dataframe(data)

    # Prediction
    prediction_value = int(
        model.predict(customer_df)[0]
    )

    # Churn probability
    probability = float(
        model.predict_proba(customer_df)[0][1]
    )

    # Preprocessor বের করা
    preprocessor = (
        model.named_steps["preprocessor"]
    )

    # SHAP-এর জন্য transformed data
    transformed = preprocessor.transform(
        customer_df
    )

    # SHAP explanation
    top_factors = explain_prediction(
        transformed
    )

    # Recommendations
    recommendations = generate_recommendations(
        data
    )

    return {

        "prediction":
            "Churn"
            if prediction_value == 1
            else "No Churn",

        "churn_probability":
            round(probability, 4),

        "risk_level":
            get_risk_level(probability),

        "top_factors":
            top_factors,

        "recommendations":
            recommendations
    }