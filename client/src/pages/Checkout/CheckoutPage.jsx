import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../slices/cartSlice.jsx";
import { checkoutFailed, checkoutStarted, checkoutSucceeded } from "../../slices/checkoutSlice.jsx";
import api from "../../api/api.js";

function CheckoutPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const items = useSelector((state) => state.cart);
  const checkout = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    phone: "+1 555-0192",
    address: "742 Evergreen Terrace, Springfield",
  });

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    dispatch(checkoutStarted());
    try {
      await api.post("/checkout", { productIds: items.map((item) => item._id) });
      dispatch(checkoutSucceeded());
      dispatch(clearCart());
      setOrderPlaced(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      const message = error.response?.data?.message || "Checkout failed";
      dispatch(checkoutFailed(message));
      toast.error(message);
    }
  };

  return (
    <>
      <style>{`
        .checkout-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .checkout-header {
          margin: 0;
          color: #292b35;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .checkout-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: flex-start;
        }

        .checkout-card {
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          padding: 28px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .checkout-card h2 {
          margin: 0;
          font-size: 20px;
          color: #292b35;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field label {
          font-size: 14px;
          font-weight: 600;
          color: #292b35;
        }

        .form-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 15px;
          border: 1px solid #d5d8df;
          border-radius: 8px;
          background: #ffffff;
          color: #292b35;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-field input:focus {
          border-color: #8f2632;
          box-shadow: 0 0 0 3px rgba(143, 38, 50, 0.1);
        }

        .summary-item-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-bottom: 1px solid #edf0f5;
          padding-bottom: 16px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #292b35;
        }

        .summary-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 700;
          color: #292b35;
        }

        .btn-place-order {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 8px;
          background: #8f2632;
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .btn-place-order:hover {
          background: #761f29;
        }

        /* Success State */
        .success-card {
          background: #ffffff;
          border: 1px solid #d9dce2;
          border-radius: 9px;
          padding: 48px 24px;
          text-align: center;
          max-width: 540px;
          margin: 20px auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #f0fdf4;
          color: #15803d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: bold;
        }

        .success-card h2 {
          margin: 0;
          font-size: 26px;
          color: #292b35;
        }

        .success-card p {
          color: #989ba6;
          margin: 0;
          font-size: 15px;
        }

        .btn-back {
          display: inline-block;
          margin-top: 8px;
          padding: 12px 24px;
          background: #8f2632;
          color: #ffffff;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="checkout-page">
        <h1 className="checkout-header">Order Checkout</h1>

        {orderPlaced ? (
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>
              Thank you for your purchase. We have received your order details and
              the seller has been notified.
            </p>
            <div style={{ fontSize: "14px", color: "#5e6270" }}>
              Total Paid: <strong>${total.toLocaleString()}</strong>
            </div>
            <Link to="/products" className="btn-back">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout-layout">
            {/* Delivery Form */}
            <form className="checkout-card" onSubmit={handlePlaceOrder}>
              <h2>Shipping Address</h2>

              <div className="form-field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-field">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              {checkout.error && <p>{checkout.error}</p>}
              <button type="submit" className="btn-place-order" disabled={checkout.status === "loading" || !items.length}>
                {checkout.status === "loading" ? "Processing..." : "Place Order"}
              </button>
            </form>

            {/* Order Summary */}
            <div className="checkout-card">
              <h2>Order Summary</h2>

              <div className="summary-item-list">
                {items.map((item) => (
                  <div key={item._id} className="summary-item">
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                    <strong>${item.price.toLocaleString()}</strong>
                  </div>
                ))}
              </div>

              <div className="summary-total-row">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;
