import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import heroImage from "../assets/hero.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = Array.isArray(data?.detail)
          ? data.detail
              .map((item) => item.msg)
              .join(", ")
          : data?.detail || "Registration failed.";

        throw new Error(errorMessage);
      }

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* =====================================
          TOP NAVBAR
      ====================================== */}

      <Navbar />

      {/* =====================================
          MAIN AUTH CONTENT
      ====================================== */}

      <main className="auth-main">
        <div className="auth-shell">

          {/* =====================================
              LEFT — REGISTER FORM
          ====================================== */}

          <section className="auth-form-side">
            <div className="auth-form-wrapper">

              {/* Brand inside form area */}

              <Link
                to="/login"
                className="auth-brand"
              >
                <div className="auth-brand-icon">
                  C
                </div>

                <div>
                  <div className="auth-brand-name">
                    ChurnAI
                  </div>

                  <div className="auth-brand-caption">
                    Customer Intelligence
                  </div>
                </div>
              </Link>

              {/* Heading */}

              <div className="auth-heading">
                <p className="auth-eyebrow">
                  Get started
                </p>

                <h1>
                  Create your account
                </h1>

                <p>
                  Build smarter retention strategies
                  with AI-powered customer churn
                  intelligence.
                </p>
              </div>

              {/* Error */}

              {error && (
                <div className="auth-error">
                  <span className="auth-error-icon">
                    !
                  </span>

                  <span>{error}</span>
                </div>
              )}

              {/* Success */}

              {success && (
                <div className="auth-success">
                  <span className="auth-success-icon">
                    ✓
                  </span>

                  <span>{success}</span>
                </div>
              )}

              {/* Register Form */}

              <form
                className="auth-form"
                onSubmit={handleSubmit}
              >

                {/* Full Name */}

                <div className="field-group">
                  <label htmlFor="name">
                    Full name
                  </label>

                  <div className="input-wrapper">
                    <span
                      className="input-icon"
                      aria-hidden="true"
                    >
                      ◉
                    </span>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* Email */}

                <div className="field-group">
                  <label htmlFor="email">
                    Email address
                  </label>

                  <div className="input-wrapper">
                    <span
                      className="input-icon"
                      aria-hidden="true"
                    >
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

                {/* Password */}

                <div className="field-group">
                  <label htmlFor="password">
                    Password
                  </label>

                  <div className="input-wrapper">
                    <span
                      className="input-icon"
                      aria-hidden="true"
                    >
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
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(
                          (previous) =>
                            !previous
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}

                <div className="field-group">
                  <label htmlFor="confirmPassword">
                    Confirm password
                  </label>

                  <div className="input-wrapper">
                    <span
                      className="input-icon"
                      aria-hidden="true"
                    >
                      ●
                    </span>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        formData.confirmPassword
                      }
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) =>
                            !previous
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>
                  </div>
                </div>

                {/* Terms */}

                <div className="remember-row">
                  <label className="remember-label">
                    <input
                      type="checkbox"
                      required
                    />

                    <span>
                      I agree to the terms and
                      privacy policy
                    </span>
                  </label>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  className="auth-submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="button-spinner" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <span className="button-arrow">
                        →
                      </span>
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}

              <div className="auth-divider">
                <span>
                  Already have an account?
                </span>
              </div>

              <p className="auth-switch">
                <Link to="/login">
                  Sign in to your account
                </Link>
              </p>

            </div>
          </section>

          {/* =====================================
              RIGHT — VISUAL
          ====================================== */}

          <section className="auth-visual-side">
            <div className="visual-overlay" />

            <img
              src={heroImage}
              alt="Customer analytics"
              className="auth-hero-image"
            />

            <div className="visual-content">

              <div className="visual-badge">
                <span className="live-dot" />
                Built for smarter retention
              </div>

              <h2>
                Turn customer data into
                <span>
                  {" "}
                  better decisions.
                </span>
              </h2>

              <p>
                ChurnAI combines machine learning
                and explainable AI to help teams
                understand customer risk and act
                before customers leave.
              </p>

              <div className="visual-features">

                <div className="visual-feature">
                  <div className="feature-icon">
                    ◈
                  </div>

                  <div>
                    <strong>
                      Predict customer risk
                    </strong>

                    <span>
                      Detect customers who are
                      likely to churn
                    </span>
                  </div>
                </div>

                <div className="visual-feature">
                  <div className="feature-icon">
                    ✦
                  </div>

                  <div>
                    <strong>
                      Explain every prediction
                    </strong>

                    <span>
                      See which factors influence
                      churn risk
                    </span>
                  </div>
                </div>

                <div className="visual-feature">
                  <div className="feature-icon">
                    ✓
                  </div>

                  <div>
                    <strong>
                      Take meaningful action
                    </strong>

                    <span>
                      Get retention recommendations
                      for each customer
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Model Card */}

            <div className="visual-bottom-card">

              <div>
                <span className="mini-label">
                  AI prediction
                </span>

                <strong>
                  Explainable churn intelligence
                </strong>
              </div>

              <div className="mini-score">
                <span>
                  Model AUC
                </span>

                <strong>
                  84.6%
                </strong>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* =====================================
          FOOTER
      ====================================== */}

      <Footer />
    </div>
  );
}

export default Register;