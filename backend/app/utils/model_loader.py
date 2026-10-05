from pathlib import Path

import joblib


MODEL_PATH = (
    Path(__file__).resolve().parents[2]
    / "models"
    / "customer_churn_final_model.pkl"
)

_model = None


def get_model():

    global _model

    if _model is None:

        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Model file not found: {MODEL_PATH}"
            )

        _model = joblib.load(MODEL_PATH)

    return _model