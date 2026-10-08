import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice.jsx";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .navbar-container {
          background: #ffffff;
          border-bottom: 1px solid #d9dce2;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .brand-logo {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -1px;
          color: #8f2632;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-link {
          padding: 8px 14px;
          border-radius: 8px;
          color: #292b35;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .nav-link:hover {
          color: #8f2632;
          background: #f8f9fb;
        }

        .nav-link.active {
          color: #8f2632;
          font-weight: 600;
          background: rgba(143, 38, 50, 0.06);
        }

        .btn-sell-nav {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          color: #8f2632;
          border: 2px solid #8f2632;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-sell-nav:hover {
          background: #8f2632;
          color: #ffffff;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 24px;
          color: #292b35;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .navbar-nav {
            display: none;
          }

          .navbar-nav.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 68px;
            left: 0;
            right: 0;
            background: #ffffff;
            border-bottom: 1px solid #d9dce2;
            padding: 16px 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            align-items: stretch;
            gap: 10px;
          }

          .btn-sell-nav {
            justify-content: center;
          }
        }
      `}</style>

      <header className="navbar-container">
        <div className="navbar-inner">
          <Link to="/products" className="navbar-brand">
            <span className="brand-logo">OLX</span>
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <nav className={`navbar-nav ${mobileMenuOpen ? "open" : ""}`}>
            <Link
              to="/products"
              className={`nav-link ${isActive("/products") ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>

            <Link
              to="/cart"
              className={`nav-link ${isActive("/cart") ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart
            </Link>

            <Link
              to="/sell"
              className="btn-sell-nav"
              onClick={() => setMobileMenuOpen(false)}
            >
              + SELL
            </Link>
            <button className="nav-link" onClick={() => { dispatch(logout()); navigate("/login"); }}>
              Log out
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
