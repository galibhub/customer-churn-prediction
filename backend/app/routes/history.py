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


router = APIRouter(
    prefix="/history",
    tags=["Prediction History"]
)


@router.get("")
def get_history(
    current_user=Depends(get_current_user)
):

    documents = (
        predictions_collection
        .find({
            "user_id": current_user["_id"]
        })
        .sort(
            "created_at",
            -1
        )
        .limit(50)
    )

    history = []

    for document in documents:

        history.append({

            "id":
                str(document["_id"]),

            "prediction":
                document["prediction"],

            "churn_probability":
                document["churn_probability"],

            "risk_level":
                document["risk_level"],

            "top_factors":
                document["top_factors"],

            "recommendations":
                document["recommendations"],

            "created_at":
                document["created_at"].isoformat()
        })

    return {
        "count": len(history),
        "items": history
    }