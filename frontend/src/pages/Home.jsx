import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import heroImage from "../assets/hero.png";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main>
        {/* =========================================
            HERO
        ========================================== */}

        <section className="home-hero">
          <div className="home-container">
            <div className="home-hero-grid">

              {/* Left */}

              <div className="home-hero-content">

                <div className="home-badge">
                  <span className="home-badge-dot" />
                  AI-powered customer intelligence
                </div>

                <h1>
                  Predict churn.
                  <br />
                  <span>Retain customers.</span>
                </h1>

                <p className="home-hero-description">
                  Identify customers who are likely to
                  churn, understand why they are at risk,
                  and get actionable retention
                  recommendations with machine learning
                  and explainable AI.
                </p>

                <div className="home-hero-actions">

                  <Link
                    to="/register"
                    className="home-primary-btn"
                  >
                    Start predicting
                    <span>→</span>
                  </Link>

                  <Link
                    to="/login"
                    className="home-secondary-btn"
                  >
                    Sign in
                  </Link>

                </div>

                <div className="home-hero-meta">

                  <div className="home-meta-item">
                    <strong>84.6%</strong>
                    <span>Model AUC</span>
                  </div>

                  <div className="home-meta-divider" />

                  <div className="home-meta-item">
                    <strong>SHAP</strong>
                    <span>Explainable AI</span>
                  </div>

                  <div className="home-meta-divider" />

                  <div className="home-meta-item">
                    <strong>24/7</strong>
                    <span>Prediction access</span>
                  </div>

                </div>
              </div>

              {/* Right */}

              <div className="home-hero-visual">

                <div className="hero-glow" />

                <div className="hero-image-card">

                  <img
                    src={heroImage}
                    alt="Customer analytics dashboard"
                  />

                  <div className="hero-image-overlay" />

                  {/* Prediction card */}

                  <div className="hero-floating-card hero-prediction-card">

                    <div className="hero-card-top">
                      <div className="hero-card-icon">
                        !
                      </div>

                      <div>
                        <span>
                          Churn probability
                        </span>

                        <strong>
                          86.7%
                        </strong>
                      </div>
                    </div>

                    <div className="hero-progress">
                      <div
                        className="hero-progress-fill"
                        style={{
                          width: "86.7%",
                        }}
                      />
                    </div>

                    <div className="hero-risk-row">
                      <span>
                        Customer risk
                      </span>

                      <b>
                        High
                      </b>
                    </div>

                  </div>

                  {/* SHAP card */}

                  <div className="hero-floating-card hero-shap-card">

                    <div className="hero-shap-header">
                      <span className="hero-shap-icon">
                        ✦
                      </span>

                      <div>
                        <strong>
                          Why this prediction?
                        </strong>

                        <span>
                          Top AI factors
                        </span>
                      </div>
                    </div>

                    <div className="hero-shap-item">
                      <span>
                        Contract
                      </span>

                      <div className="hero-shap-bar">
                        <div
                          style={{
                            width: "92%",
                          }}
                        />
                      </div>

                      <b>
                        +0.612
                      </b>
                    </div>

                    <div className="hero-shap-item">
                      <span>
                        Tenure
                      </span>

                      <div className="hero-shap-bar">
                        <div
                          style={{
                            width: "70%",
                          }}
                        />
                      </div>

                      <b>
                        +0.440
                      </b>
                    </div>

                    <div className="hero-shap-item">
                      <span>
                        Security
                      </span>

                      <div className="hero-shap-bar">
                        <div
                          style={{
                            width: "44%",
                          }}
                        />
                      </div>

                      <b>
                        +0.199
                      </b>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================
            TRUST STRIP
        ========================================== */}

        <section className="home-trust">
          <div className="home-container">

            <p>
              Built around machine learning,
              explainability, and actionable retention
              intelligence.
            </p>

            <div className="home-trust-items">

              <span>
                Machine Learning
              </span>

              <span>
                Gradient Boosting
              </span>

              <span>
                SHAP Explainability
              </span>

              <span>
                Customer Retention
              </span>

            </div>

          </div>
        </section>

        {/* =========================================
            FEATURES
        ========================================== */}

        <section className="home-section">

          <div className="home-container">

            <div className="home-section-heading">

              <div>
                <p className="home-section-eyebrow">
                  What ChurnAI does
                </p>

                <h2>
                  From prediction to
                  <span> action.</span>
                </h2>
              </div>

              <p>
                ChurnAI doesn't stop at identifying
                churn. It helps you understand the
                prediction and decide what to do next.
              </p>

            </div>

            <div className="home-feature-grid">

              <div className="home-feature-card">

                <div className="home-feature-icon">
                  ↗
                </div>

                <span className="home-feature-number">
                  01
                </span>

                <h3>
                  Churn prediction
                </h3>

                <p>
                  Analyze customer information and
                  estimate the probability that a
                  customer will churn.
                </p>

                <div className="home-feature-link">
                  Predict risk
                  <span>→</span>
                </div>

              </div>

              <div className="home-feature-card">

                <div className="home-feature-icon purple">
                  ✦
                </div>

                <span className="home-feature-number">
                  02
                </span>

                <h3>
                  Explainable AI
                </h3>

                <p>
                  Understand which customer attributes
                  influenced the model's prediction using
                  SHAP-based explanations.
                </p>

                <div className="home-feature-link">
                  Understand why
                  <span>→</span>
                </div>

              </div>

              <div className="home-feature-card">

                <div className="home-feature-icon green">
                  ✓
                </div>

                <span className="home-feature-number">
                  03
                </span>

                <h3>
                  Retention recommendations
                </h3>

                <p>
                  Get practical suggestions designed
                  to help reduce customer churn and
                  improve retention.
                </p>

                <div className="home-feature-link">
                  Take action
                  <span>→</span>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================
            HOW IT WORKS
        ========================================== */}

        <section className="home-section home-how-section">

          <div className="home-container">

            <div className="home-section-heading centered">

              <div>
                <p className="home-section-eyebrow">
                  How it works
                </p>

                <h2>
                  Three steps to
                  <span> smarter retention.</span>
                </h2>
              </div>

              <p>
                A simple workflow powered by your
                trained machine learning model.
              </p>

            </div>

            <div className="home-steps">

              <div className="home-step">

                <div className="home-step-number">
                  01
                </div>

                <div className="home-step-line" />

                <h3>
                  Enter customer data
                </h3>

                <p>
                  Provide the customer's service,
                  account, billing, and demographic
                  information.
                </p>

              </div>

              <div className="home-step">

                <div className="home-step-number">
                  02
                </div>

                <div className="home-step-line" />

                <h3>
                  Run AI prediction
                </h3>

                <p>
                  The trained Gradient Boosting model
                  calculates churn probability and risk.
                </p>

              </div>

              <div className="home-step">

                <div className="home-step-number">
                  03
                </div>

                <h3>
                  Understand & act
                </h3>

                <p>
                  Review SHAP factors and receive
                  recommendations for customer
                  retention.
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================
            EXPLAINABILITY SECTION
        ========================================== */}

        <section className="home-explain-section">

          <div className="home-container">

            <div className="home-explain-grid">

              <div className="home-explain-content">

                <p className="home-section-eyebrow">
                  Explainable AI
                </p>

                <h2>
                  Don't just know
                  <span> the prediction.</span>
                  <br />
                  Know the reason.
                </h2>

                <p>
                  Every churn prediction can be
                  accompanied by feature-level
                  explanations. SHAP helps reveal which
                  factors push a prediction toward churn
                  or away from it.
                </p>

                <div className="home-explain-list">

                  <div>
                    <span>
                      01
                    </span>

                    <div>
                      <strong>
                        Identify key drivers
                      </strong>

                      <p>
                        See the most influential
                        customer attributes.
                      </p>
                    </div>
                  </div>

                  <div>
                    <span>
                      02
                    </span>

                    <div>
                      <strong>
                        Understand direction
                      </strong>

                      <p>
                        Know whether a factor increases
                        or decreases churn risk.
                      </p>
                    </div>
                  </div>

                  <div>
                    <span>
                      03
                    </span>

                    <div>
                      <strong>
                        Make informed decisions
                      </strong>

                      <p>
                        Use explanations to guide
                        retention strategies.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              <div className="home-explain-card">

                <div className="explain-card-header">
                  <div>
                    <span>
                      Model explanation
                    </span>

                    <strong>
                      Churn risk drivers
                    </strong>
                  </div>

                  <div className="explain-ai-badge">
                    SHAP
                  </div>
                </div>

                <div className="explain-chart">

                  <div className="explain-row">
                    <div className="explain-row-label">
                      <span>
                        Contract
                      </span>

                      <small>
                        Month-to-month
                      </small>
                    </div>

                    <div className="explain-row-bar">
                      <div
                        className="explain-positive-bar"
                        style={{
                          width: "92%",
                        }}
                      />
                    </div>

                    <strong>
                      +0.612
                    </strong>
                  </div>

                  <div className="explain-row">
                    <div className="explain-row-label">
                      <span>
                        Tenure
                      </span>

                      <small>
                        Short tenure
                      </small>
                    </div>

                    <div className="explain-row-bar">
                      <div
                        className="explain-positive-bar"
                        style={{
                          width: "72%",
                        }}
                      />
                    </div>

                    <strong>
                      +0.440
                    </strong>
                  </div>

                  <div className="explain-row">
                    <div className="explain-row-label">
                      <span>
                        Online Security
                      </span>

                      <small>
                        No
                      </small>
                    </div>

                    <div className="explain-row-bar">
                      <div
                        className="explain-positive-bar"
                        style={{
                          width: "42%",
                        }}
                      />
                    </div>

                    <strong>
                      +0.199
                    </strong>
                  </div>

                  <div className="explain-row">
                    <div className="explain-row-label">
                      <span>
                        Internet
                      </span>

                      <small>
                        Fiber optic
                      </small>
                    </div>

                    <div className="explain-row-bar">
                      <div
                        className="explain-positive-bar"
                        style={{
                          width: "39%",
                        }}
                      />
                    </div>

                    <strong>
                      +0.187
                    </strong>
                  </div>

                  <div className="explain-row">
                    <div className="explain-row-label">
                      <span>
                        Payment
                      </span>

                      <small>
                        Electronic check
                      </small>
                    </div>

                    <div className="explain-row-bar">
                      <div
                        className="explain-positive-bar"
                        style={{
                          width: "37%",
                        }}
                      />
                    </div>

                    <strong>
                      +0.184
                    </strong>
                  </div>

                </div>

                <div className="explain-card-footer">
                  <span>
                    Positive values increase predicted
                    churn risk.
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            PERFORMANCE
        ========================================== */}

        <section className="home-section">

          <div className="home-container">

            <div className="home-performance">

              <div className="home-performance-heading">

                <p className="home-section-eyebrow">
                  Model performance
                </p>

                <h2>
                  Built with a model optimized for
                  <span> churn detection.</span>
                </h2>

                <p>
                  The final model was selected by
                  comparing multiple machine learning
                  approaches and prioritizing churn
                  detection performance.
                </p>

              </div>

              <div className="home-performance-grid">

                <div className="performance-card featured">

                  <span>
                    ROC-AUC
                  </span>

                  <strong>
                    84.6%
                  </strong>

                  <p>
                    Final tuned + balanced Gradient
                    Boosting model
                  </p>

                </div>

                <div className="performance-card">

                  <span>
                    F1 Score
                  </span>

                  <strong>
                    63.5%
                  </strong>

                  <p>
                    Balanced performance for churn
                    detection
                  </p>

                </div>

                <div className="performance-card">

                  <span>
                    Recall
                  </span>

                  <strong>
                    80.7%
                  </strong>

                  <p>
                    Strong focus on identifying
                    potential churners
                  </p>

                </div>

                <div className="performance-card">

                  <span>
                    Risk levels
                  </span>

                  <strong>
                    3
                  </strong>

                  <p>
                    Low, Medium, and High risk
                    classification
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            CTA
        ========================================== */}

        <section className="home-cta-section">

          <div className="home-container">

            <div className="home-cta">

              <div>

                <p className="home-section-eyebrow">
                  Ready to begin?
                </p>

                <h2>
                  Know your customers
                  <span> before they leave.</span>
                </h2>

                <p>
                  Start analyzing customer churn risk
                  with ChurnAI.
                </p>

              </div>

              <div className="home-cta-actions">

                <Link
                  to="/register"
                  className="home-cta-primary"
                >
                  Create an account
                  <span>→</span>
                </Link>

                <Link
                  to="/login"
                  className="home-cta-secondary"
                >
                  Sign in
                </Link>

              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Home;