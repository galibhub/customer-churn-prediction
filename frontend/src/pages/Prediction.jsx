import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Prediction.css";

const initialFormData = {
  gender: "Female",
  SeniorCitizen: 0,
  Partner: "Yes",
  Dependents: "No",
  tenure: 3,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "Fiber optic",
  OnlineSecurity: "No",
  OnlineBackup: "No",
  DeviceProtection: "No",
  TechSupport: "No",
  StreamingTV: "Yes",
  StreamingMovies: "No",
  Contract: "Month-to-month",
  PaperlessBilling: "Yes",
  PaymentMethod: "Electronic check",
  MonthlyCharges: 85,
  TotalCharges: 255,
};

function Prediction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));

    setError("");
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem(
      "access_token"
    );

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem(
          "access_token"
        );

        localStorage.removeItem("user");

        navigate("/login");

        return;
      }

      if (!response.ok) {
        const errorMessage = Array.isArray(
          data?.detail
        )
          ? data.detail
              .map((item) => item.msg)
              .join(", ")
          : data?.detail ||
            "Prediction failed.";

        throw new Error(errorMessage);
      }

      setResult(data);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      setError(
        err.message ||
          "Unable to generate prediction."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatProbability = (value) => {
    return `${(
      Number(value) * 100
    ).toFixed(1)}%`;
  };

  const getRiskClass = (risk) => {
    if (risk === "High") {
      return "prediction-risk-high";
    }

    if (risk === "Medium") {
      return "prediction-risk-medium";
    }

    return "prediction-risk-low";
  };

  const getProbabilityWidth = (value) => {
    return {
      width: `${Math.min(
        100,
        Math.max(
          0,
          Number(value) * 100
        )
      )}%`,
    };
  };

  return (
    <div className="prediction-page">
      <Navbar />

      <main className="prediction-main">
        <div className="prediction-container">

          {/* =====================================
              HEADER
          ====================================== */}

          <section className="prediction-header">
            <div>
              <p className="prediction-eyebrow">
                AI prediction engine
              </p>

              <h1>
                Analyze a customer
              </h1>

              <p>
                Enter customer information to
                predict churn risk and understand
                the factors behind the prediction.
              </p>
            </div>

            <button
              type="button"
              className="prediction-back-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              ← Dashboard
            </button>
          </section>

          {/* =====================================
              ERROR
          ====================================== */}

          {error && (
            <div className="prediction-error">
              <div className="prediction-error-icon">
                !
              </div>

              <div>
                <strong>
                  Prediction failed
                </strong>

                <p>{error}</p>
              </div>
            </div>
          )}

          {/* =====================================
              FORM + RESULT
          ====================================== */}

          <div
            className={`prediction-layout ${
              result
                ? "prediction-with-result"
                : ""
            }`}
          >

            {/* =================================
                CUSTOMER FORM
            ================================= */}

            <section className="prediction-form-card">

              <div className="prediction-card-header">
                <div>
                  <span className="prediction-card-number">
                    01
                  </span>

                  <div>
                    <h2>
                      Customer information
                    </h2>

                    <p>
                      Provide the customer's
                      current service details.
                    </p>
                  </div>
                </div>
              </div>

              <form
                className="prediction-form"
                onSubmit={handleSubmit}
              >

                {/* ---------------------------------
                    Personal Information
                ---------------------------------- */}

                <div className="form-section">
                  <div className="form-section-title">
                    Personal information
                  </div>

                  <div className="form-grid">

                    <div className="prediction-field">
                      <label htmlFor="gender">
                        Gender
                      </label>

                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="Female">
                          Female
                        </option>

                        <option value="Male">
                          Male
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="SeniorCitizen">
                        Senior citizen
                      </label>

                      <select
                        id="SeniorCitizen"
                        name="SeniorCitizen"
                        value={
                          formData.SeniorCitizen
                        }
                        onChange={handleChange}
                      >
                        <option value={0}>
                          No
                        </option>

                        <option value={1}>
                          Yes
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="Partner">
                        Partner
                      </label>

                      <select
                        id="Partner"
                        name="Partner"
                        value={formData.Partner}
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="Dependents">
                        Dependents
                      </label>

                      <select
                        id="Dependents"
                        name="Dependents"
                        value={
                          formData.Dependents
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* ---------------------------------
                    Account Information
                ---------------------------------- */}

                <div className="form-section">
                  <div className="form-section-title">
                    Account information
                  </div>

                  <div className="form-grid">

                    <div className="prediction-field">
                      <label htmlFor="tenure">
                        Tenure (months)
                      </label>

                      <input
                        id="tenure"
                        name="tenure"
                        type="number"
                        min="0"
                        max="72"
                        value={formData.tenure}
                        onChange={handleChange}
                      />

                      <span className="field-helper">
                        0–72 months
                      </span>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="Contract">
                        Contract
                      </label>

                      <select
                        id="Contract"
                        name="Contract"
                        value={formData.Contract}
                        onChange={handleChange}
                      >
                        <option value="Month-to-month">
                          Month-to-month
                        </option>

                        <option value="One year">
                          One year
                        </option>

                        <option value="Two year">
                          Two year
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="PaperlessBilling">
                        Paperless billing
                      </label>

                      <select
                        id="PaperlessBilling"
                        name="PaperlessBilling"
                        value={
                          formData.PaperlessBilling
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="PaymentMethod">
                        Payment method
                      </label>

                      <select
                        id="PaymentMethod"
                        name="PaymentMethod"
                        value={
                          formData.PaymentMethod
                        }
                        onChange={handleChange}
                      >
                        <option value="Electronic check">
                          Electronic check
                        </option>

                        <option value="Mailed check">
                          Mailed check
                        </option>

                        <option value="Bank transfer (automatic)">
                          Bank transfer (automatic)
                        </option>

                        <option value="Credit card (automatic)">
                          Credit card (automatic)
                        </option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* ---------------------------------
                    Phone / Internet
                ---------------------------------- */}

                <div className="form-section">
                  <div className="form-section-title">
                    Phone & internet
                  </div>

                  <div className="form-grid">

                    <div className="prediction-field">
                      <label htmlFor="PhoneService">
                        Phone service
                      </label>

                      <select
                        id="PhoneService"
                        name="PhoneService"
                        value={
                          formData.PhoneService
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="MultipleLines">
                        Multiple lines
                      </label>

                      <select
                        id="MultipleLines"
                        name="MultipleLines"
                        value={
                          formData.MultipleLines
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>

                        <option value="No phone service">
                          No phone service
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="InternetService">
                        Internet service
                      </label>

                      <select
                        id="InternetService"
                        name="InternetService"
                        value={
                          formData.InternetService
                        }
                        onChange={handleChange}
                      >
                        <option value="DSL">
                          DSL
                        </option>

                        <option value="Fiber optic">
                          Fiber optic
                        </option>

                        <option value="No">
                          No
                        </option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* ---------------------------------
                    Additional Services
                ---------------------------------- */}

                <div className="form-section">
                  <div className="form-section-title">
                    Additional services
                  </div>

                  <div className="form-grid">

                    <div className="prediction-field">
                      <label htmlFor="OnlineSecurity">
                        Online security
                      </label>

                      <select
                        id="OnlineSecurity"
                        name="OnlineSecurity"
                        value={
                          formData.OnlineSecurity
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>

                        <option value="No internet service">
                          No internet service
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="OnlineBackup">
                        Online backup
                      </label>

                      <select
                        id="OnlineBackup"
                        name="OnlineBackup"
                        value={
                          formData.OnlineBackup
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>

                        <option value="No internet service">
                          No internet service
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="DeviceProtection">
                        Device protection
                      </label>

                      <select
                        id="DeviceProtection"
                        name="DeviceProtection"
                        value={
                          formData.DeviceProtection
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>

                        <option value="No internet service">
                          No internet service
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="TechSupport">
                        Tech support
                      </label>

                      <select
                        id="TechSupport"
                        name="TechSupport"
                        value={
                          formData.TechSupport
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>

                        <option value="No internet service">
                          No internet service
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="StreamingTV">
                        Streaming TV
                      </label>

                      <select
                        id="StreamingTV"
                        name="StreamingTV"
                        value={
                          formData.StreamingTV
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>

                        <option value="No internet service">
                          No internet service
                        </option>
                      </select>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="StreamingMovies">
                        Streaming movies
                      </label>

                      <select
                        id="StreamingMovies"
                        name="StreamingMovies"
                        value={
                          formData.StreamingMovies
                        }
                        onChange={handleChange}
                      >
                        <option value="Yes">
                          Yes
                        </option>

                        <option value="No">
                          No
                        </option>

                        <option value="No internet service">
                          No internet service
                        </option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* ---------------------------------
                    Charges
                ---------------------------------- */}

                <div className="form-section">
                  <div className="form-section-title">
                    Billing information
                  </div>

                  <div className="form-grid">

                    <div className="prediction-field">
                      <label htmlFor="MonthlyCharges">
                        Monthly charges
                      </label>

                      <div className="currency-input">
                        <span>
                          $
                        </span>

                        <input
                          id="MonthlyCharges"
                          name="MonthlyCharges"
                          type="number"
                          min="0"
                          step="0.01"
                          value={
                            formData.MonthlyCharges
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="prediction-field">
                      <label htmlFor="TotalCharges">
                        Total charges
                      </label>

                      <div className="currency-input">
                        <span>
                          $
                        </span>

                        <input
                          id="TotalCharges"
                          name="TotalCharges"
                          type="number"
                          min="0"
                          step="0.01"
                          value={
                            formData.TotalCharges
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* ---------------------------------
                    Actions
                ---------------------------------- */}

                <div className="prediction-form-actions">

                  <button
                    type="button"
                    className="prediction-reset-btn"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset form
                  </button>

                  <button
                    type="submit"
                    className="prediction-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="prediction-spinner" />
                        Analyzing customer...
                      </>
                    ) : (
                      <>
                        Predict churn
                        <span>→</span>
                      </>
                    )}
                  </button>

                </div>

              </form>
            </section>

            {/* =================================
                RESULT
            ================================= */}

            {result && (
              <section className="prediction-result-card">

                <div className="result-card-top">
                  <div>
                    <span className="prediction-card-number">
                      02
                    </span>

                    <div>
                      <h2>
                        Prediction result
                      </h2>

                      <p>
                        AI-generated customer risk
                        assessment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main result */}

                <div
                  className={`prediction-result-main ${
                    result.prediction === "Churn"
                      ? "result-churn"
                      : "result-safe"
                  }`}
                >
                  <div className="result-status-icon">
                    {result.prediction ===
                    "Churn"
                      ? "!"
                      : "✓"}
                  </div>

                  <div>
                    <span>
                      Prediction
                    </span>

                    <strong>
                      {result.prediction}
                    </strong>
                  </div>

                  <span
                    className={`result-risk-badge ${getRiskClass(
                      result.risk_level
                    )}`}
                  >
                    {result.risk_level} risk
                  </span>
                </div>

                {/* Probability */}

                <div className="probability-section">

                  <div className="probability-header">
                    <span>
                      Churn probability
                    </span>

                    <strong>
                      {formatProbability(
                        result.churn_probability
                      )}
                    </strong>
                  </div>

                  <div className="probability-track">
                    <div
                      className={`probability-fill ${
                        result.prediction ===
                        "Churn"
                          ? "probability-danger"
                          : "probability-safe"
                      }`}
                      style={getProbabilityWidth(
                        result.churn_probability
                      )}
                    />
                  </div>

                  <p>
                    The model estimates this customer's
                    probability of churn.
                  </p>

                </div>

                {/* SHAP */}

                <div className="result-section">

                  <div className="result-section-heading">
                    <div className="result-section-icon">
                      ✦
                    </div>

                    <div>
                      <h3>
                        Why this prediction?
                      </h3>

                      <p>
                        Top factors identified by
                        explainable AI.
                      </p>
                    </div>
                  </div>

                  <div className="shap-list">
                    {result.top_factors?.map(
                      (factor, index) => (
                        <div
                          className="shap-item"
                          key={`${factor.feature}-${index}`}
                        >
                          <div className="shap-rank">
                            {index + 1}
                          </div>

                          <div className="shap-content">
                            <div className="shap-name">
                              {factor.feature}
                            </div>

                            <div className="shap-direction">
                              <span
                                className={
                                  factor.direction ===
                                  "increases churn"
                                    ? "shap-up"
                                    : "shap-down"
                                }
                              >
                                {factor.direction ===
                                "increases churn"
                                  ? "↑"
                                  : "↓"}
                              </span>

                              {factor.direction}
                            </div>
                          </div>

                          <strong
                            className={
                              factor.impact > 0
                                ? "shap-positive"
                                : "shap-negative"
                            }
                          >
                            {factor.impact > 0
                              ? "+"
                              : ""}
                            {Number(
                              factor.impact
                            ).toFixed(4)}
                          </strong>
                        </div>
                      )
                    )}
                  </div>

                </div>

                {/* Recommendations */}

                <div className="result-section">

                  <div className="result-section-heading">
                    <div className="result-section-icon">
                      ✓
                    </div>

                    <div>
                      <h3>
                        Recommended actions
                      </h3>

                      <p>
                        Suggested retention strategies
                        for this customer.
                      </p>
                    </div>
                  </div>

                  <div className="recommendation-list">
                    {result.recommendations?.map(
                      (recommendation, index) => (
                        <div
                          className="recommendation-item"
                          key={`${recommendation}-${index}`}
                        >
                          <span>
                            ✓
                          </span>

                          <p>
                            {recommendation}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                </div>

                {/* Prediction ID */}

                <div className="prediction-id">
                  <span>
                    Prediction ID
                  </span>

                  <code>
                    {result.prediction_id}
                  </code>
                </div>

              </section>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Prediction;