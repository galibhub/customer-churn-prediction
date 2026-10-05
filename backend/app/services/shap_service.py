import numpy as np
import shap

from app.utils.model_loader import get_model


def _clean_feature_name(name: str) -> str:

    name = name.split("__", 1)[-1]

    known_features = [
        "gender",
        "Partner",
        "Dependents",
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
        "PaymentMethod"
    ]

    for feature in known_features:

        prefix = feature + "_"

        if name.startswith(prefix):
            return f"{feature}: {name[len(prefix):]}"

    return name.replace("_", " ")


def explain_prediction(
    X_transformed,
    top_n: int = 5
) -> list[dict]:

    model = get_model()

    final_model = model.named_steps["model"]

    preprocessor = model.named_steps["preprocessor"]

    feature_names = (
        preprocessor.get_feature_names_out()
    )

    # Sparse matrix হলে dense করা
    if hasattr(X_transformed, "toarray"):
        X_dense = X_transformed.toarray()
    else:
        X_dense = np.asarray(X_transformed)

    explainer = shap.TreeExplainer(final_model)

    shap_values = explainer.shap_values(
        X_dense
    )

    values = np.asarray(shap_values)

    # Different SHAP output formats handle করা
    if isinstance(shap_values, list):

        values = np.asarray(
            shap_values[
                1 if len(shap_values) > 1 else 0
            ]
        )

    if values.ndim == 3:
        values = values[0, :, 1]

    elif values.ndim == 2:
        values = values[0]

    # সবচেয়ে important features
    order = np.argsort(
        np.abs(values)
    )[::-1][:top_n]

    factors = []

    for index in order:

        impact = float(values[index])

        factors.append({
            "feature": _clean_feature_name(
                feature_names[index]
            ),
            "impact": round(impact, 4),
            "direction":
                "increases churn"
                if impact > 0
                else "decreases churn"
        })

    return factors