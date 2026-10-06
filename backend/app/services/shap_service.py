import numpy as np
import shap

from app.utils.model_loader import get_model


def clean_feature_name(name: str) -> str:

    # Remove ColumnTransformer prefix
    name = name.split(
        "__",
        1
    )[-1]


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

            value = name[
                len(prefix):
            ]

            return f"{feature}: {value}"


    return name.replace(
        "_",
        " "
    )


def explain_prediction(
    X_transformed,
    top_n: int = 5
) -> list[dict]:

    # Load final pipeline
    pipeline = get_model()


    # Get final ML model
    final_model = pipeline.named_steps[
        "model"
    ]


    # Get preprocessor
    preprocessor = pipeline.named_steps[
        "preprocessor"
    ]


    # Get transformed feature names
    feature_names = (
        preprocessor
        .get_feature_names_out()
    )


    # Convert sparse data to dense
    if hasattr(
        X_transformed,
        "toarray"
    ):
        X_dense = X_transformed.toarray()
    else:
        X_dense = np.asarray(
            X_transformed
        )


    # SHAP explainer
    explainer = shap.TreeExplainer(
        final_model
    )


    shap_values = explainer.shap_values(
        X_dense
    )


    values = np.asarray(
        shap_values
    )


    # Handle possible SHAP output formats
    if isinstance(
        shap_values,
        list
    ):

        values = np.asarray(
            shap_values[
                1
                if len(shap_values) > 1
                else 0
            ]
        )


    if values.ndim == 3:

        values = values[
            0,
            :,
            1
        ]

    elif values.ndim == 2:

        values = values[0]


    # Get most important features
    top_indices = np.argsort(
        np.abs(values)
    )[::-1][:top_n]


    factors = []


    for index in top_indices:

        impact = float(
            values[index]
        )


        factors.append({

            "feature":
                clean_feature_name(
                    feature_names[index]
                ),

            "impact":
                round(
                    impact,
                    4
                ),

            "direction":
                (
                    "increases churn"
                    if impact > 0
                    else "decreases churn"
                )
        })


    return factors