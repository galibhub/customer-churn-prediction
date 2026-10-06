import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-left">
          <div className="footer-logo">C</div>

          <div>
            <p className="footer-brand">
              ChurnAI
            </p>

            <p className="footer-tagline">
              Customer retention intelligence
            </p>
          </div>
        </div>

        <nav className="footer-nav">
          <Link to="/login">
            Sign in
          </Link>

          <Link to="/register">
            Create account
          </Link>
        </nav>

        <p className="footer-copy">
          © 2026 ChurnAI
        </p>
      </div>
    </footer>
  );
}

export default Footer;