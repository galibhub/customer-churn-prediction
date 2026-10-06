import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <header className="site-navbar">
      <div className="site-navbar-inner">
        {/* Brand */}
        <Link to="/login" className="navbar-brand">
          <div className="navbar-brand-icon">C</div>

          <div className="navbar-brand-text">
            <span className="navbar-brand-name">
              ChurnAI
            </span>

            <span className="navbar-brand-caption">
              Customer Intelligence
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="navbar-nav">
          <Link
            to="/login"
            className={`navbar-link ${
              isLogin ? "active" : ""
            }`}
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className={`navbar-register-link ${
              isRegister ? "active" : ""
            }`}
          >
            Get started
            <span>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;