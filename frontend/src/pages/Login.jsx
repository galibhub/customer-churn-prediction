import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail || "Invalid email or password."
        );
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        {/* --------------------------------
            Left Side
        -------------------------------- */}
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            <Link to="/login" className="auth-brand">
              <div className="auth-brand-icon">C</div>

              <div>
                <div className="auth-brand-name">
                  ChurnAI
                </div>

                <div className="auth-brand-caption">
                  Customer Intelligence
                </div>
              </div>
            </Link>

            <div className="auth-heading">
              <p className="auth-eyebrow">
                Welcome back
              </p>

              <h1>Sign in to your account</h1>

              <p>
                Predict customer churn, understand the
                reasons behind it, and take action faster.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                <span className="auth-error-icon">!</span>

                <span>{error}</span>
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="field-group">
                <label htmlFor="email">
                  Email address
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">
                    @
                  </span>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field-group">
                <div className="field-label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-button"
                    onClick={() =>
                      setError(
                        "Password reset will be available soon."
                      )
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="input-wrapper">
                  <span className="input-icon">
                    ●
                  </span>

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              <div className="remember-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    name="remember"
                  />

                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span className="button-arrow">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>Secure access to your workspace</span>
            </div>

            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register">
                Create an account
              </Link>
            </p>

            <p className="auth-footer">
              © 2026 ChurnAI. Customer retention
              intelligence.
            </p>
          </div>
        </div>

        {/* --------------------------------
            Right Side
        -------------------------------- */}
        <div className="auth-visual-side">
          <div className="visual-overlay" />

          <img
            src={heroImage}
            alt="Customer analytics"
            className="auth-hero-image"
          />

          <div className="visual-content">
            <div className="visual-badge">
              <span className="live-dot" />
              AI-powered analytics
            </div>

            <h2>
              Know who is likely to leave
              <span> before they do.</span>
            </h2>

            <p>
              Turn customer data into actionable
              retention insights with machine
              learning and explainable AI.
            </p>

            <div className="visual-features">
              <div className="visual-feature">
                <div className="feature-icon">
                  ↗
                </div>

                <div>
                  <strong>Churn prediction</strong>
                  <span>
                    Identify high-risk customers early
                  </span>
                </div>
              </div>

              <div className="visual-feature">
                <div className="feature-icon">
                  ✦
                </div>

                <div>
                  <strong>Explainable AI</strong>
                  <span>
                    Understand what drives each prediction
                  </span>
                </div>
              </div>

              <div className="visual-feature">
                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <strong>Actionable insights</strong>
                  <span>
                    Get practical retention recommendations
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="visual-bottom-card">
            <div>
              <span className="mini-label">
                Prediction engine
              </span>

              <strong>Gradient Boosting</strong>
            </div>

            <div className="mini-score">
              <span>Model AUC</span>
              <strong>84.6%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;