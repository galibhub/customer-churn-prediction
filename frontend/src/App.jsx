import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#f7f8fc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          padding: "48px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            background: "#111827",
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "800",
          }}
        >
          C
        </div>

        <p
          style={{
            margin: "0 0 8px",
            color: "#6366f1",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Dashboard
        </p>

        <h1
          style={{
            margin: "0 0 12px",
            color: "#111827",
            fontSize: "32px",
            letterSpacing: "-0.04em",
          }}
        >
          Customer Churn Prediction
        </h1>

        <p
          style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "14px",
            lineHeight: "1.7",
          }}
        >
          Your authenticated dashboard is ready.
          The prediction workspace will be added next.
        </p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Unknown Route */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;