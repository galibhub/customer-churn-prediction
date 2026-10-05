from app.schemas.prediction_schema import CustomerInput


def generate_recommendations(
    data: CustomerInput
) -> list[str]:

    recommendations = []

    if data.Contract == "Month-to-month":
        recommendations.append(
            "Offer a one-year or two-year contract "
            "with a suitable loyalty discount."
        )

    if data.tenure < 12:
        recommendations.append(
            "Provide an early-stage loyalty benefit "
            "to improve customer retention."
        )

    if data.MonthlyCharges > 80:
        recommendations.append(
            "Review the monthly plan and consider "
            "a lower-cost or bundled option."
        )

    if data.TechSupport == "No":
        recommendations.append(
            "Offer technical support or a support bundle."
        )

    if data.OnlineSecurity == "No":
        recommendations.append(
            "Consider offering an online security package "
            "or promotional trial."
        )

    if data.PaymentMethod == "Electronic check":
        recommendations.append(
            "Encourage automatic payment methods "
            "with a simple payment setup option."
        )

    if not recommendations:
        recommendations.append(
            "Continue regular loyalty and "
            "service-quality engagement."
        )

    return recommendations[:5]