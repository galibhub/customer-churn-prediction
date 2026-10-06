import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    name: "User",
    email: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          name: parsedUser?.name || "User",
          email: parsedUser?.email || "",
        });
      } catch {
        setUser({
          name: "User",
          email: "",
        });
      }
    }

    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/history",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data?.detail || "Unable to load prediction history."
        );
      }

      setHistory(data?.items || []);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while loading your history."
      );
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const total = history.length;

    const churnCount = history.filter(
      (item) => item.prediction === "Churn"
    ).length;

    const highRiskCount = history.filter(
      (item) => item.risk_level === "High"
    ).length;

    const averageProbability =
      total > 0
        ? history.reduce(
            (sum, item) =>
              sum + Number(item.churn_probability || 0),
            0
          ) / total
        : 0;

    return {
      total,
      churnCount,
      highRiskCount,
      averageProbability,
    };
  }, [history]);

  const formatProbability = (value) => {
    return `${(Number(value) * 100).toFixed(1)}%`;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Unknown date";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getRiskClass = (risk) => {
    if (risk === "High") {
      return "risk-high";
    }

    if (risk === "Medium") {
      return "risk-medium";
    }

    return "risk-low";
  };

  const getPredictionClass = (prediction) => {
    return prediction === "Churn"
      ? "prediction-churn"
      : "prediction-safe";
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");

    try {
      if (token) {
        await fetch(
          "http://127.0.0.1:8000/auth/logout",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch {
      // Continue local logout even if API request fails.
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      navigate("/login");
    }
  };

  const handleRefresh = () => {
    fetchHistory();
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-container">

          {/* ======================================
              HERO
          ======================================= */}

          <section className="dashboard-hero">
            <div>
              <p className="dashboard-eyebrow">
                Customer intelligence
              </p>

              <h1 className="dashboard-title">
                Welcome back,{" "}
                <span>{user.name}</span>
              </h1>

              <p className="dashboard-description">
                Monitor customer churn risk, review
                previous predictions, and identify
                customers who may need attention.
              </p>
            </div>

            <div className="dashboard-hero-actions">
              <button
                type="button"
                className="dashboard-refresh-btn"
                onClick={handleRefresh}
                disabled={loading}
              >
                <span>
                  ↻
                </span>

                Refresh
              </button>

              <button
                type="button"
                className="dashboard-primary-btn"
                onClick={() => navigate("/predict")}
              >
                <span>
                  +
                </span>

                New prediction
              </button>
            </div>
          </section>

          {/* ======================================
              ERROR
          ======================================= */}

          {error && (
            <div className="dashboard-error">
              <span className="dashboard-error-icon">
                !
              </span>

              <div>
                <strong>
                  Unable to load dashboard data
                </strong>

                <p>{error}</p>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
              >
                Try again
              </button>
            </div>
          )}

          {/* ======================================
              STATS
          ======================================= */}

          <section className="dashboard-stats">

            <div className="dashboard-stat-card">
              <div className="stat-top">
                <div className="stat-icon stat-icon-dark">
                  #
                </div>

                <span className="stat-chip">
                  History
                </span>
              </div>

              <p className="stat-label">
                Total predictions
              </p>

              <h2 className="stat-value">
                {loading ? "—" : stats.total}
              </h2>

              <p className="stat-helper">
                Predictions analyzed by your account
              </p>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-top">
                <div className="stat-icon stat-icon-danger">
                  !
                </div>

                <span className="stat-chip stat-chip-danger">
                  Risk
                </span>
              </div>

              <p className="stat-label">
                High-risk customers
              </p>

              <h2 className="stat-value">
                {loading ? "—" : stats.highRiskCount}
              </h2>

              <p className="stat-helper">
                Customers classified as high risk
              </p>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-top">
                <div className="stat-icon stat-icon-purple">
                  ↗
                </div>

                <span className="stat-chip stat-chip-purple">
                  Churn
                </span>
              </div>

              <p className="stat-label">
                Churn detected
              </p>

              <h2 className="stat-value">
                {loading ? "—" : stats.churnCount}
              </h2>

              <p className="stat-helper">
                Predictions currently marked as churn
              </p>
            </div>

            <div className="dashboard-stat-card">
              <div className="stat-top">
                <div className="stat-icon stat-icon-blue">
                  %
                </div>

                <span className="stat-chip stat-chip-blue">
                  Average
                </span>
              </div>

              <p className="stat-label">
                Average churn probability
              </p>

              <h2 className="stat-value">
                {loading
                  ? "—"
                  : formatProbability(
                      stats.averageProbability
                    )}
              </h2>

              <p className="stat-helper">
                Across your prediction history
              </p>
            </div>

          </section>

          {/* ======================================
              QUICK ACTION
          ======================================= */}

          <section className="dashboard-action-panel">

            <div className="action-panel-content">
              <div className="action-panel-icon">
                ✦
              </div>

              <div>
                <p className="action-panel-eyebrow">
                  AI prediction engine
                </p>

                <h2>
                  Analyze a new customer
                </h2>

                <p>
                  Enter customer information and get
                  churn probability, risk level, SHAP
                  factors, and retention recommendations.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="dashboard-primary-btn"
              onClick={() => navigate("/predict")}
            >
              Start prediction
              <span>→</span>
            </button>

          </section>

          {/* ======================================
              RECENT PREDICTIONS
          ======================================= */}

          <section className="dashboard-history-section">

            <div className="history-section-header">
              <div>
                <p className="dashboard-eyebrow">
                  Prediction history
                </p>

                <h2>
                  Recent predictions
                </h2>

                <p>
                  Review the latest customer risk
                  assessments from your account.
                </p>
              </div>

              <button
                type="button"
                className="history-view-all"
                onClick={() =>
                  navigate("/history")
                }
              >
                View all
                <span>→</span>
              </button>
            </div>

            <div className="history-table-card">

              {loading ? (
                <div className="history-loading">
                  <div className="history-loader" />

                  <p>
                    Loading prediction history...
                  </p>
                </div>
              ) : history.length === 0 ? (
                <div className="history-empty">
                  <div className="history-empty-icon">
                    ◇
                  </div>

                  <h3>
                    No predictions yet
                  </h3>

                  <p>
                    Your customer prediction history
                    will appear here.
                  </p>

                  <button
                    type="button"
                    className="dashboard-primary-btn"
                    onClick={() =>
                      navigate("/predict")
                    }
                  >
                    Create your first prediction
                    <span>→</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="history-table-header">
                    <div>
                      Customer result
                    </div>

                    <div>
                      Probability
                    </div>

                    <div>
                      Risk
                    </div>

                    <div>
                      Created
                    </div>
                  </div>

                  <div className="history-list">
                    {history
                      .slice(0, 5)
                      .map((item) => (
                        <div
                          className="history-row"
                          key={item.id}
                        >
                          <div className="history-result">
                            <div
                              className={`history-result-icon ${
                                getPredictionClass(
                                  item.prediction
                                )
                              }`}
                            >
                              {item.prediction ===
                              "Churn"
                                ? "!"
                                : "✓"}
                            </div>

                            <div>
                              <strong>
                                {item.prediction}
                              </strong>

                              <span>
                                Prediction ID:{" "}
                                {item.id.slice(-8)}
                              </span>
                            </div>
                          </div>

                          <div className="history-probability">
                            <strong>
                              {formatProbability(
                                item.churn_probability
                              )}
                            </strong>
                          </div>

                          <div>
                            <span
                              className={`risk-badge ${getRiskClass(
                                item.risk_level
                              )}`}
                            >
                              {item.risk_level}
                            </span>
                          </div>

                          <div className="history-date">
                            {formatDate(
                              item.created_at
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}

            </div>
          </section>

          {/* ======================================
              INSIGHT CARD
          ======================================= */}

          <section className="dashboard-insight-grid">

            <div className="dashboard-insight-card">
              <div className="insight-card-icon">
                ✦
              </div>

              <div>
                <p>
                  Explainable AI
                </p>

                <h3>
                  Understand why customers may churn
                </h3>

                <span>
                  Every prediction includes SHAP-based
                  factors that explain the model output.
                </span>
              </div>
            </div>

            <div className="dashboard-insight-card">
              <div className="insight-card-icon">
                ✓
              </div>

              <div>
                <p>
                  Retention actions
                </p>

                <h3>
                  Turn predictions into actions
                </h3>

                <span>
                  Receive practical recommendations
                  based on customer risk factors.
                </span>
              </div>
            </div>

          </section>

          {/* ======================================
              ACCOUNT INFO
          ======================================= */}

          <section className="dashboard-account-card">

            <div className="account-avatar">
              {user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}
            </div>

            <div className="account-info">
              <p>
                Signed in as
              </p>

              <strong>
                {user.name}
              </strong>

              <span>
                {user.email}
              </span>
            </div>

            <button
              type="button"
              className="dashboard-logout-btn"
              onClick={handleLogout}
            >
              Log out
            </button>

          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;