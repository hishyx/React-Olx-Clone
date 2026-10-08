import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <style>{`
        .footer-container {
          background: #ffffff;
          border-top: 1px solid #d9dce2;
          padding: 48px 20px 24px;
          margin-top: auto;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
        }

        .footer-brand h3 {
          font-size: 24px;
          font-weight: 800;
          color: #8f2632;
          letter-spacing: -1px;
          margin: 0 0 12px;
        }

        .footer-brand p {
          color: #989ba6;
          font-size: 14px;
          line-height: 1.6;
          max-width: 320px;
          margin: 0;
        }

        .footer-col h4 {
          font-size: 15px;
          font-weight: 700;
          color: #292b35;
          margin: 0 0 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-col a {
          color: #5e6270;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-col a:hover {
          color: #8f2632;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 40px auto 0;
          padding-top: 24px;
          border-top: 1px solid #edf0f5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: #989ba6;
        }

        @media (max-width: 800px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 500px) {
          .footer-inner {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>

      <footer className="footer-container">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>OLX Market</h3>
            <p>
              Your trusted community marketplace for buying and selling electronics,
              vehicles, mobile phones, furniture, and more.
            </p>
          </div>

          <div className="footer-col">
            <h4>Popular Categories</h4>
            <ul>
              <li><Link to="/products">Mobile Phones</Link></li>
              <li><Link to="/products">Cars & Vehicles</Link></li>
              <li><Link to="/products">Electronics & Laptops</Link></li>
              <li><Link to="/products">Furniture & Home</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/products">Browse Listings</Link></li>
              <li><Link to="/sell">Post an Ad</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/login">Create Account</Link></li>
              <li><a href="#help">Help & Support</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} OLX Clone Inc. All rights reserved.</span>
          <span>Designed with reference to Login Page visual design system.</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;

