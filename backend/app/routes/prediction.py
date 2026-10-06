from datetime import datetime, timezone

from fastapi import (
    APIRouter,
    Depends
)

from app.config.database import (
    predictions_collection
)

from app.routes.auth import (
    get_current_user
)

from app.schemas.prediction_schema import (
    CustomerInput,
    PredictionResponse
)

from app.services.prediction_service import (
    predict_customer
)


router = APIRouter(
    tags=["Prediction"]
)


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(
    data: CustomerInput,
    current_user=Depends(
        get_current_user
    )
):

    # Run ML prediction
    result = predict_customer(
        data
    )


    # Save prediction in MongoDB
    document = {

        "user_id":
            current_user["_id"],

        "input_data":
            data.model_dump(),

        "prediction":
            result["prediction"],

        "churn_probability":
            result[
                "churn_probability"
            ],

        "risk_level":
            result["risk_level"],

        "top_factors":
            result["top_factors"],

        "recommendations":
            result["recommendations"],

        "created_at":
            datetime.now(
                timezone.utc
            )
    }


    inserted = (
        predictions_collection
        .insert_one(document)
    )


    return {

        "prediction_id":
            str(
                inserted.inserted_id
            ),

        **result
    }