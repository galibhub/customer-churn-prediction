from app.schemas.prediction_schema import CustomerInput


def generate_recommendations(
    data: CustomerInput
) -> list[str]:

    recommendations = []


    # Contract
    if data.Contract == "Month-to-month":
        recommendations.append(
            "Offer a one-year or two-year contract "
            "with a suitable loyalty discount."
        )


    # Tenure
    if data.tenure < 12:
        recommendations.append(
            "Provide an early-stage loyalty benefit "
            "to improve customer retention."
        )


    # Monthly charges
    if data.MonthlyCharges > 80:
        recommendations.append(
            "Review the customer's monthly plan and "
            "consider a lower-cost or bundled option."
        )


    # Tech support
    if data.TechSupport == "No":
        recommendations.append(
            "Offer technical support or a support bundle."
        )


    # Online security
    if data.OnlineSecurity == "No":
        recommendations.append(
            "Offer an online security package or "
            "a promotional trial."
        )


    # Payment method
    if data.PaymentMethod == "Electronic check":
        recommendations.append(
            "Encourage automatic payment methods "
            "with a simple payment setup."
        )


    # Default recommendation
    if not recommendations:
        recommendations.append(
            "Continue regular loyalty and "
            "service-quality engagement."
        )


    return recommendations[:5]